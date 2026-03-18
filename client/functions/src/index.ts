import { onCall, HttpsError } from "firebase-functions/v2/https";
import { generateStudyTips } from "./OpenAI";

// index.ts (top)
console.log("STARTUP: module load BEGIN", { envPORT: process.env.PORT, nodeEnv: process.env.NODE_ENV });

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT_EXCEPTION:", err && err.stack ? err.stack : err);
});
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED_REJECTION:", err);
});

/**
 * Callable endpoint for retrieving generated study tips.
 */
export const getStudyTipsFn = onCall({ cors: true, invoker: "public" }, async (request) => {
  try {
    const sessions = request.data.sessions || [];
    const tips = await generateStudyTips(sessions);
    return { tips };
  } catch (error) {
    console.error(error);
    throw new HttpsError("internal", "Failed to generate study tips");
  }
});