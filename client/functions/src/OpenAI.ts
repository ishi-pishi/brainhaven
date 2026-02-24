import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { myStudySessions } from "@dataconnect/generated";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// Generates study tips based on most recent week of sessions
export async function getStudyTips(): Promise<string> {
  const { data } = await myStudySessions(); // will throw
  const nRecent = 7;
  const recentSessions = data.studySessions.slice(0, nRecent);

  const prompt = `
      Here are my recent study sessions in JSON format. Focusing mainly on reflections but
      also incorporating other information, analyze these
      to create personalized study tips.

      ${JSON.stringify(recentSessions, null, 2)}
  `;

  const response = await client.responses.create({
      model: "gpt-5.2",
      input: prompt
  });
  return response.output_text;
}
