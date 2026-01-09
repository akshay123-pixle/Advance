const DEEPSEEK_API_KEY = "sk-401fbd42cf00493b8c28db07f3027460";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: DEEPSEEK_API_KEY,
});

// Default model you want to use (change anytime)
const DEFAULT_MODEL = "deepseek-chat";

export async function deepseek(prompt) {
  const res = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [{ role: "user", content: prompt }],
  });
  //   console.log("Res", res.choices[0].message);

  return res.choices[0].message;
}

const res=await deepseek("who is the PM of india");
console.log(res);

