import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
const client = new OpenAI();

async function makeRequest(req: string): Promise<string> {
    const response = await client.responses.create({
        model: "gpt-5.2",
        input: req
    });
    return response.output_text;
}