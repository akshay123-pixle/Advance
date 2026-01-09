import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" })); // allow frontend to call
app.use(express.json()); // parse JSON body
// console.log("process.env.DEEPSEEK_API_KEY",process.env.DEEPSEEK_API_KEY);

const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// POST /api/deepseek
// app.post("/api/deepseek", async (req, res) => {
//   const { prompt } = req.body;
//   if (!prompt) return res.status(400).json({ error: "Prompt is required" });

//   try {
//     const response = await client.chat.completions.create({
//       model: "deepseek-chat",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const text = response?.choices?.[0]?.message?.content || "No response";
//     // console.log(text);

//     res.json({ text });
//   } catch (err) {
//     console.error("DeepSeek API error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });
app.post("/api/deepseek", async (req, res) => {
  const { tag } = req.body;
  if (!tag) return res.status(400).json({ error: "Tag is required" });

  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an XML expert. Suggest XML tags based on input.",
        },
        {
          role: "user",
          content:
            ` i type ${tag}You are an expert XML assistant. Your task is to provide smart XML tag suggestions for an editor.

Rules:
1. Only return **valid XML tags** (no extra text).
2. Return the response strictly as a **JSON array of strings**. Example: ["<title>", "<body>", "<note>"]
3. Suggest up to 5 possible tags based on the **partial tag** the user typed.
4. The user may type anything inside the ` <
            ` character, e.g., "<ti" or "<bo".
5. Each suggestion should be a complete opening tag (like "<title>"), so the editor can automatically insert "<title></title>" when selected.
6. Never include explanations, just JSON.

Example:
- User typed: "ti"
- Response: ["<title>", "<time>", "<timeline>"]

- User typed: "bo"
- Response: ["<body>", "<book>", "<bonus>"]

Now, the user typed: "{partial_tag}"
Return up to 5 suggestions in a JSON array.`,
        },
      ],
    });

    const text = response?.choices?.[0]?.message?.content || "[]";
    res.json({ suggestions: JSON.parse(text) });
  } catch (err) {
    console.error("DeepSeek API error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
