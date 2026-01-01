import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY missing");
    }

    const { message } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(message);
    const response = result.response.text();

    return res.status(200).json({ response });

  } catch (err) {
    console.error("SERVER CRASH:", err);
    return res.status(500).json({
      error: err.message
    });
  }
}
