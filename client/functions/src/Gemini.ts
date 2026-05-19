import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generates personalized study tips based on the most recent week of study sessions.
 */
export async function generateStudyTips(recentSessions: any[]): Promise<string> {
  const geminiApiKey = process.env.GEMINI_KEY;

  if (!geminiApiKey) {
    throw new Error("GEMINI_KEY environment variable is not set.");
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  if (!recentSessions || recentSessions.length === 0) {
    return "No recent study sessions found to generate tips.";
  }

  const prompt = `
Here are my recent study sessions in JSON. Analyze and generate personalized study tips.
CRITICAL INSTRUCTIONS:
1. Provide ONLY a list of bullet points with your tips (no intro or outro text).
2. Keep it to EXACTLY 2-3 short, punchy bullet points.
3. Use markdown formatting and be encouraging.

Sessions JSON:
${JSON.stringify(recentSessions, null, 2)}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "No tips generated.";
  } catch (error: any) {
    console.error("Error generating tips from Gemini:", JSON.stringify(error, null, 2));
    
    const isQuotaError = 
      error.status === 429 || 
      (error.message && (
        error.message.includes("RESOURCE_EXHAUSTED") || 
        error.message.toLowerCase().includes("quota") || 
        error.message.includes("429")
      ));

    if (isQuotaError) {
      throw new Error("Gemini Resource Exhausted: Daily AI credits or quota limit reached.");
    }

    if (error.status === 401 || (error.message && error.message.includes("API key"))) {
      throw new Error(`Gemini Authentication failed: ${error.message}. Please verify your API key.`);
    }
    
    throw new Error("Failed to get response from Gemini due to an internal error: " + (error.message || "Unknown error"));
  }
}
