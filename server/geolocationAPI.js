const axios = require('axios');
const maplibregl = require('maplibre-gl');

const locationIQKey = 'pk.27823ed59bbeb88681116ad7c49145d3';

const locationIQApiUrl = 'https://us1.locationiq.com/v1/search.php';

async function getLocation(cityName) {
    try {
        const response = await axios.get(locationIQApiUrl, {
            params: {
                key: locationIQKey,
                q: cityName,
                format: 'json',
            },
        });
        const location = {
            lat: response.data[0].lat,
            lon: response.data[0].lon,
        };
        return location;
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        throw error;
    }
}

module.exports = { getLocation };
