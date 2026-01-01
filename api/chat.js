import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // ✅ CORS (Allow all for simplicity)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"" });

    const result = await model.generateContent(`
You are a smart assistant trained by Ahmad Arif, developer of Gadget Bazar.

Keep replies short, clear, and polite.
Avoid special characters.
Use simple language.

Store: Gadget Bazar
Category: Electronics

User: ${message}
`);

    // ✅ Correct Gemini response handling
    const response = result.response.text();

    return res.status(200).json({ response });

  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}
