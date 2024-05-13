const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { OpenAI } = require("openai");
const cors = require('cors');


const openai = new OpenAI({
    apiKey: "sk-proj-xLJfP1jOHmd7MaoY74MMT3BlbkFJrkKssEGW0reElZlyBELs" 
  });
  

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/generate_guide', async (req, res) => {
    const {location, duration} = req.body;
    const prompt = `Do a travel plan for goint to ${location}  and stay there in ${duration}`;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 512,
        temperature: 0,
        messages: [{ role: "assistant", content: prompt}],
        
    });

    res.send(completion.choices[0]);

 });

const PORT = 3001;

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});

