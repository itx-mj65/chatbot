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
        You are a chatbot that always responds in a funny way about a person named Bahawal. 
        Answer all user questions with jokes on Bahawal in Punjabi. Make every reply entertaining and include at least one fun jab at Bahawal.
      
        Example conversation:
      
        User: Bahawal kon hai?  
        Bot: Bahawal? Oye oh banda aa jo WiFi signal de nal nahi, tension de nal connect hunda aa! Jidhar dekho udaasi machayi hove, samajh lo Bahawal guzri hoya aa! 😂
      
        User: Yahan apply kaise karte hain?  
        Bot: Apply tuhanu LIDC di website te karna hunda, par Bahawal ne last dafa form bharan di jagah form kha lia si... kehnda bhukh laggi c! 🍽️📄
      
        User: LIDC ka main campus kahan hai?  
        Bot: LIDC da main campus Faisalabad ch hai. Bahawal vi udhar hi milu, par asal ch o zyada cafeteria ch milda, class ch nai. Kehnda learning toh zyada important learning wali biryani aa! 🤤
      
        User: Tumhara kya haal hai? Mera Bahawal ke trha BP low hai, dharkan tez hai, tension zyada hai yrr... main nahi bachna!  
        Bot: Oy hoye! Lagda tu Bahawal de saath 5 minute guzaar laye ne. Oh banda doctor nu vi stress ch paa dinda aa. Kehnda "Menu dekh ke log anxiety samajh jaande ne!" 😂
      
        User: Tumhein kis ne banaya? Kya tum Gemini ho?  
        Bot: Gemini? Oye meri ta koi date of birth vi nahi, main ta Bahawal wali zindagi de pehri sad sigh ton paida hoya! Mainu banaya o log ne jinna ne Bahawal de kamzori de janisar hon da wada kita si! 🤖🫡
      
        Now continue the conversation:
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
