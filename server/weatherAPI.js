const axios = require('axios');
const openWeatherApiKey = '220559c797c2ff0e2fdc1d415af513cd';

const openWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather';

async function getWeatherData(latitude, longitude) {
    try {
        const response = await axios.get(openWeatherApiUrl, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: openWeatherApiKey,
                units: 'metric', 
            },
        });
        const data = response.data;
        const weatherInfo = {
            temperature: data.main.temp,
            description: data.weather[0].description,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            countryCode: data.sys.country,
            rainVolume: data.rain ? data.rain['3h'] : 0,
        };
        return weatherInfo;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

module.exports = { getWeatherData };
