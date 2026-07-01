#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline/promises');
const { stdin, stdout } = require('process');

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

function writeEnvValue(filePaths, key, value) {
  for (const filePath of filePaths) {
    const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    const lines = existing.split(/\r?\n/);
    const normalizedLines = lines.filter((line) => line.trim() !== '');
    const keyPattern = new RegExp(`^${key}=`);
    let updated = false;

    const nextLines = normalizedLines.map((line) => {
      if (keyPattern.test(line)) {
        updated = true;
        return `${key}=${value}`;
      }
      return line;
    });

    if (!updated) {
      nextLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(filePath, `${nextLines.join('\n')}\n`);
  }
}

async function promptForMissingValues() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  const prompts = [
    {
      filePaths: [clientEnvFile, functionsEnvFile],
      key: 'OPENAI_API_KEY',
      label: 'OpenAI API key',
      helpText: 'Used by the app and Cloud Functions. Checked in client/.env and client/functions/.env.',
      writeTargets: [clientEnvFile, functionsEnvFile],
    },
    {
      filePaths: [clientEnvFile],
      key: 'VITE_FIREBASE_API_KEY',
      label: 'Firebase web API key',
      helpText: 'Used to connect the frontend to Firebase. Checked in client/.env.',
      writeTargets: [clientEnvFile],
    },
  ];

  const missing = prompts.filter(({ filePaths, key }) => !readEnvValue(filePaths, key));

  if (missing.length === 0) {
    rl.close();
    return;
  }

  console.log('Some environment values are missing. You can enter them now or press Enter to skip.');

  for (const prompt of missing) {
    const currentValue = readEnvValue(prompt.filePaths, prompt.key);
    if (currentValue) {
      console.log(`Using existing value for ${prompt.key} from the current environment or the checked .env files.`);
      continue;
    }

    const answer = await rl.question(`${prompt.label} (${prompt.key}) - ${prompt.helpText} [press Enter to skip]: `);
    const trimmed = answer.trim();
    if (trimmed && !/^(skip|s)$/i.test(trimmed)) {
      writeEnvValue(prompt.writeTargets, prompt.key, trimmed);
      const destinations = prompt.writeTargets.map((target) => path.relative(rootDir, target)).join(', ');
      console.log(`Saved ${prompt.key} to ${destinations}.`);
    } else {
      console.log(`Skipped ${prompt.key}. Some features may not work until you add it later.`);
    }
  }

  rl.close();
}

async function main() {
  await ensureFile(clientEnvFile, 'OPENAI_API_KEY=\nVITE_FIREBASE_API_KEY=\n');
  await ensureFile(functionsEnvFile, 'OPENAI_API_KEY=\n');
  await promptForMissingValues();

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
