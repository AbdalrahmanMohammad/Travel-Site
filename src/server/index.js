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
const geanamesBaseURL = `http://api.geonames.org/searchJSON?maxRows=1&username=${process.env.geonamesKey}`;//&&q=gaza
const weatherbitBaseURL = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${process.env.weatherbitKey}`;//lat=32.06675&lon=35.31662
const pixabayBaseURL = `https://pixabay.com/api/?key=${process.env.pixabayKey}&image_type=photo`;//&q=gaza

console.log(__dirname);



app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// function to get city's coordinates
async function getCoordinates(city) {
    try {
        const response = await axios.post(geanamesBaseURL, null, {
            params: {
                q: city
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
// function to get the wheater forecast
async function getForecast(lat,lon) {
    try {
        const response = await axios.post(weatherbitBaseURL, null, {
            params: {
                lat: lat,
                lon:lon
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
// function to get a photo of the place
async function getPhoto(city) {
    try {
        const response = await axios.post(pixabayBaseURL, null, {
            params: {
                q:city
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

// POST route to get coordinates
app.post('/coordinates', async (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const result = await getCoordinates(city);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// POST route to get photo
app.post('/photo', async (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const result = await getPhoto(city);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// POST route to get forecast
app.post('/forecast', async (req, res) => {
    const { lat } = req.body;
    const { lon } = req.body;

    if (!lat||!lon) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const result = await getForecast(lat,lon);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


