import { onCall, HttpsError } from "firebase-functions/v2/https";
import { generateStudyTips } from "./OpenAI";

/**
 * Callable endpoint for retrieving generated study tips (renamed to trigger fresh IAM).
 */
export const getAIInsights = onCall({ 
  cors: true, 
  invoker: "public",
  region: "us-central1"
}, async (request) => {
  try {
    const sessions = request.data.sessions || [];
    const tips = await generateStudyTips(sessions);
    return { tips };
  } catch (error: any) {
    console.error("AI Tips Error:", error);
    throw new HttpsError("internal", "Failed to generate tips: " + error.message);
  }
});