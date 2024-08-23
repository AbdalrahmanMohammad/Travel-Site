var path = require('path');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))

// Variables for url and api key
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKey = `${process.env.apiKey}`;

console.log(__dirname);



app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// function to analyze the url
async function analyzeSentiment(url) {
    try {
        const response = await axios.post(baseURL, null, {
            params: {
                key: apiKey,
                url: url,
                lang: 'en'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
}

// POST route to analyze sentiment
app.post('/analyze', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const result = await analyzeSentiment(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


