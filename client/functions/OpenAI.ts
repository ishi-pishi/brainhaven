import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
const client = new OpenAI();

// Generates study tips based on most recent week of sessions
export async function getStudyTips(): Promise<string>{
    throw new  Error("Not implemented")
    // const allSessions = await getSessions(); // will throw
    // const nRecent = 7;
    // const recentSessions = allSessions.slice(0, nRecent);

    // const prompt = `
    //     Here are my recent study sessions in JSON format. Focusing mainly on reflections but
    //     also incorporating other information, analyze these
    //     to create personalized study tips.

    //     ${JSON.stringify(recentSessions, null, 2)}
    // `;

    // const response = await client.responses.create({
    //     model: "gpt-5.2",
    //     input: prompt
    // });
    // return response.output_text;
}

