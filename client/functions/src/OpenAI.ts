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
Here are my recent study sessions in JSON. Analyze and generate personalized study tips:

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
  } catch (error) {
    console.error("Error generating tips from OpenAI:", error);
    throw new Error("Failed to get response from OpenAI due to an internal error.");
  }
}
