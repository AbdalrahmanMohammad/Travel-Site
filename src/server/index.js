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
const geonamesBaseURL = `http://api.geonames.org/searchJSON?maxRows=1&username=${process.env.geonamesKey}`;
const weatherbitBaseURL = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${process.env.weatherbitKey}`;
const pixabayBaseURL = `https://pixabay.com/api/?key=${process.env.pixabayKey}&image_type=photo`;

console.log(__dirname);



app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// function to get city's coordinates
async function getCoordinates(city) {
    try {
        const response = await axios.post(geonamesBaseURL, null, {
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
async function getForecast(lat, lon) {
    try {
        const response = await axios.post(weatherbitBaseURL, null, {
            params: {
                lat: lat,
                lon: lon
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

// // POST route to get coordinates
// app.post('/coordinates', async (req, res) => {
//     const { city } = req.body;

//     if (!city) {
//         return res.status(400).json({ error: 'Text is required' });
//     }

//     try {
//         const result = await getCoordinates(city);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
// // POST route to get photo
// app.post('/photo', async (req, res) => {
//     const { city } = req.body;

//     if (!city) {
//         return res.status(400).json({ error: 'Text is required' });
//     }

//     try {
//         const result = await getPhoto(city);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
// // POST route to get forecast
// app.post('/forecast', async (req, res) => {
//     const { lat } = req.body;
//     const { lon } = req.body;

//     if (!lat || !lon) {
//         return res.status(400).json({ error: 'Text is required' });
//     }

//     try {
//         const result = await getForecast(lat, lon);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// route to get all info
app.post('/getAll', async (req, res) => {
    const { date, city } = req.body;// date is in this format yyyy-mm-dd to match weatherbit's response

    if (!date || !city) {
        return res.status(400).json({ error: 'Text is required' });
    }

    resp = {};// the response that will return to client

    try {

        /////////////////////////////// get the coordinates
        const coordinates = await getCoordinates(city);

        let lat = -1, lon = -1, country = -1;// if the city is not found in the API then the values are -1
        if (coordinates.geonames.length > 0) {//if the city is found we get the values
            lat = coordinates.geonames[0].lat;
            lon = coordinates.geonames[0].lng;
            country = coordinates.geonames[0].countryName;
        }

        resp.lat = lat;
        resp.lon = lon;
        resp.country = country;
        ///////////////////////////////

        ////////////////////////////// get the photo
        const photo = await getPhoto(city);

        let ph = -1;// if the city is not found in the API then the values are -1
        if (photo.hits.length > 0) {//if the city is found we get the values
            ph = photo.hits[0].largeImageURL;
        }
        resp.photo = ph;
        ///////////////////////////////

        ////////////////////////////// get the forecast
        let forec = {};// if i got no coordinates of the place i return empty object
        if (lat != -1) {
            const forecast = await getForecast(lat, lon);
            if (forecast.data.length > 0) {//if the city is found we get the values
                for(let i=0;i<forecast.data.length;i++)// look for the date the user sent
                {
                    if(forecast.data[i].datetime==date)
                    {
                        forec.max=forecast.data[i].max_temp;
                        forec.min=forecast.data[i].min_temp;
                        forec.desc=forecast.data[i].weather.description;
                        break;
                    }
                }
            }
        }
        resp.forecast = forec;
        ///////////////////////////////

        res.json(resp);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


