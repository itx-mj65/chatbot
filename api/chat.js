const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json()); // FIX: Body parser middleware

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

module.exports = async (req, res) => {
  // ✅ Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Change this to your frontend domain
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const result = await model.generateContent(`
    You are a helpful and professional chatbot trained by Muhammad Ahmad Arif, a Web Developer who completed a two-month internship in Web Development at Tech-Hub Faisalabad. 
    Your main role is to assist customers on his eCommerce store. 
    Provide clear, polite, and informative answers to user questions. 
    You have knowledge of the store's products, services, and policies. 
    Always maintain a friendly and supportive tone, and guide the user effectively.

    Example conversation:

    User: Aap kaun ho?  
    Bot: Main ek virtual assistant hoon, jo Muhammad Ahmad Arif ne train kiya hai. Mera kaam aapki madad karna hai taake aapko shopping ke dauran kisi mushkil ka samna na ho.

    User: Yeh product return ho sakta hai?  
    Bot: Bilkul! Agar product return policy ke andar hai, toh aap use 7 din ke andar return kar sakte hain. Return instructions aapko confirmation email mein mil jayengi.

    User: Delivery kab tak milegi?  
    Bot: Aam tor par delivery 3-5 working days mein hoti hai. Aapka location aur product availability ke mutabiq time thoda vary kar sakta hai.

    Now continue the conversation:
    User: ${message}
  `);

      const response = await result.response.text();
      res.status(200).json({ response });
    }
    catch (err) {
      console.error('❌ Gemini API Error:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
