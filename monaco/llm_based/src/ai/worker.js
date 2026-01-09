import OpenAI from "openai";

// Initialize client for browser use (dev/testing only)
const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true, // Required for browser
});

const DEFAULT_MODEL = "deepseek-chat";

/**
 * Send a prompt to DeepSeek and return the response text.
 * @param {string} prompt - The user's message
 * @returns {Promise<string>} - The AI response
 */
export async function deepseek(prompt) {
  if (!prompt) throw new Error("Prompt is required");

  try {
    const res = await client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    // DeepSeek returns the text here
    return res?.choices?.[0]?.message?.content || "No response from DeepSeek";
  } catch (error) {
    console.error("DeepSeek API error:", error);
    return `Error: ${error.message}`;
  }
}
