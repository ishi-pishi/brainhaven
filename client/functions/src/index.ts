import { onCall, HttpsError } from "firebase-functions/v2/https";
import { generateStudyTips } from "./Gemini";

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
    
    const isQuotaError = 
      error.message?.includes("Resource Exhausted") ||
      error.message?.includes("RESOURCE_EXHAUSTED") ||
      error.message?.toLowerCase().includes("quota") ||
      error.message?.includes("429");

    if (isQuotaError) {
      throw new HttpsError("resource-exhausted", error.message || "AI credits or daily quota has been run out.");
    }

    throw new HttpsError("internal", "Failed to generate tips: " + error.message);
  }
});