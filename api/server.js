import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(message);
    const response = await result.response.text();

    res.status(200).json({ response });
  } catch (err) {
    console.error('❌ Gemini API Error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
