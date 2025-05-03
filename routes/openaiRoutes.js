const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware'); // If you want to protect the route

// OpenAI Book Search Endpoint
router.post('/search-book', protect, async (req, res) => {
  try {
    const { bookName, authorName } = req.body;
    
    // Static prompt with dynamic fields
    const prompt = `Provide summary of the book "${bookName}" by author "${authorName}" in json format. The summary should be of atleast 2000 words and divide the summary into sections. the section 1 and secton 2 and so on should also be used in json format`;
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    
    // Extract and parse the JSON content
    const content = response.data.choices[0].message.content;
    const jsonResponse = JSON.parse(content);
    
    res.json(jsonResponse);
    
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch book information',
      details: error.response?.data || error.message 
    });
  }
});

module.exports = router;