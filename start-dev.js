#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const clientDir = path.join(rootDir, 'client');
const functionsDir = path.join(clientDir, 'functions');
const clientEnvFile = path.join(clientDir, '.env');
const functionsEnvFile = path.join(functionsDir, '.env');

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

async function ensureFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created ${path.relative(rootDir, filePath)}`);
  }
}

function readEnvValue(filePaths, key) {
  const processValue = process.env[key];
  if (processValue && String(processValue).trim()) {
    return String(processValue).trim();
  }

  for (const filePath of filePaths) {
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) {
        continue;
      }

      const currentKey = trimmed.slice(0, separatorIndex).trim();
      if (currentKey !== key) {
        continue;
      }

      return trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    }
  }

  return '';
}

function warnAboutMissingEnv() {
  const missing = [];

  if (!readEnvValue([clientEnvFile], 'OPENAI_API_KEY')) {
    missing.push({ file: path.relative(rootDir, clientEnvFile), key: 'OPENAI_API_KEY' });
  }

  if (!readEnvValue([clientEnvFile], 'VITE_FIREBASE_API_KEY')) {
    missing.push({ file: path.relative(rootDir, clientEnvFile), key: 'VITE_FIREBASE_API_KEY' });
  }

  if (!readEnvValue([functionsEnvFile], 'OPENAI_API_KEY')) {
    missing.push({ file: path.relative(rootDir, functionsEnvFile), key: 'OPENAI_API_KEY' });
  }

  if (missing.length > 0) {
    console.log('Environment values are not set yet. Add them to the following files:');
    for (const item of missing) {
      console.log(`- ${item.file}: ${item.key}`);
    }
    console.log('Example:');
    console.log(`- ${path.relative(rootDir, clientEnvFile)} -> OPENAI_API_KEY=... and VITE_FIREBASE_API_KEY=...`);
    console.log(`- ${path.relative(rootDir, functionsEnvFile)} -> OPENAI_API_KEY=...`);
  }
}

async function main() {
  await ensureFile(clientEnvFile, 'OPENAI_API_KEY=\nVITE_FIREBASE_API_KEY=\n');
  await ensureFile(functionsEnvFile, 'OPENAI_API_KEY=\n');
  warnAboutMissingEnv();

  if (!fs.existsSync(path.join(clientDir, 'node_modules'))) {
    console.log('Installing client dependencies...');
    await run('npm', ['install'], { cwd: clientDir });
  }

  if (!fs.existsSync(path.join(functionsDir, 'node_modules'))) {
    console.log('Installing functions dependencies...');
    await run('npm', ['install'], { cwd: functionsDir });
  }

  console.log('Generating Firebase Data Connect SDK...');
  try {
    await run('npx', ['firebase', 'dataconnect:sdk:generate'], { cwd: clientDir });
    console.log('Firebase Data Connect SDK generation completed.');
  } catch (error) {
    console.warn('Firebase Data Connect SDK generation did not complete. Continuing to start the app...');
    console.warn(error.message);
  }

  console.log('Starting Vite dev server...');
  await run('npm', ['run', 'dev'], { cwd: clientDir });
}

main().catch((error) => {
  console.error('\nStartup failed:');
  console.error(error.message);
  process.exit(1);
});
