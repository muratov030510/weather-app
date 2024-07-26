const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const weatherAPI = require('./server/weatherAPI');
const geolocationAPI = require('./server/geolocationAPI');
const extraAPI1 = require('./server/photosAPI');
const extraAPI2 = require('./server/newsAPI');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/weather', async (req, res) => {
    try {
        const cityName = req.body.city;
        const geolocation = await geolocationAPI.getLocation(cityName);
        const weatherData = await weatherAPI.getWeatherData(geolocation.lat, geolocation.lon);
        const backgroundImageUrl = await extraAPI1.getRandomImage(cityName);
        const newsData = await extraAPI2.getTopHeadlines(weatherData.countryCode);

        res.json({
            weather: weatherData,
            geolocation: geolocation,
            backgroundImage: backgroundImageUrl,
            news: newsData,
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/extraAPI1', async (req, res) => {
    try {
        const imageUrl = await extraAPI1.getRandomImage();
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error fetching data from extraAPI1:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/extraAPI2', async (req, res) => {
    try {
        const dataFromAPI2 = await extraAPI2.getData();
        res.json({ dataFromAPI2 });
    } catch (error) {
        console.error('Error fetching data from extraAPI2:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
