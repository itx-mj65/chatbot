const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize the GoogleGenerativeAI instance with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// IMPORTANT: Confirm the correct model name in the Google Generative AI docs. 
// You may need to update the model name if "models/gemini-pro" is not available.
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Define the route for the chat functionality
app.post('/chat', async (req, res) => {
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
        res.json({ response });
    } catch (err) {
        // Log the error and send a 500 status with the error message
        console.error('❌ Gemini API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
});
