const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { message } = req.body;
        
        try {
            // Define the prompt for the chatbot
            const result = await model.generateContent(`
                You are a chatbot for LIDC Institute. Answer all questions politely and only in context of courses offered by LIDC.

                User: ${message}
            `);

            // Extract the response text from the model
            const response = await result.response.text();

            // Send the response back to the client
            res.status(200).json({ response });
        } catch (err) {
            console.error('❌ Gemini API Error:', err);
            res.status(500).json({ error: err.message });
        }
    } else {
        // Handle non-POST requests
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
