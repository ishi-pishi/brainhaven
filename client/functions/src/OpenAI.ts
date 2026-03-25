import OpenAI from "openai";

/**
 * Generates personalized study tips based on the most recent week of study sessions.
 */
export async function generateStudyTips(recentSessions: any[]): Promise<string> {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set.");
  }

  const client = new OpenAI({
    apiKey: openaiApiKey,
  });

  if (!recentSessions || recentSessions.length === 0) {
    return "No recent study sessions found to generate tips.";
  }

  const prompt = `
Here are my recent study sessions in JSON. Analyze and generate personalized study tips.
CRITICAL INSTRUCTIONS:
1. Provide a VERY SHORT, punchy response (max 3-4 sentences total).
2. Use markdown formatting (bullet points, bold text) to highlight EXACTLY 1-2 key insights or suggestions.
3. Be encouraging and concise.

Sessions JSON:
${JSON.stringify(recentSessions, null, 2)}
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content || "No tips generated.";
  } catch (error: any) {
    console.error("Error generating tips from OpenAI:", JSON.stringify(error, null, 2));
    if (error.status === 401) {
      throw new Error(`OpenAI Authentication failed (401): ${error.message}. Please verify your API key and billing status.`);
    }
    throw new Error("Failed to get response from OpenAI due to an internal error.");
  }
}
