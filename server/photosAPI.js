const axios = require('axios');

const unsplashKey = 'e55oXytbs_alFhnsLyYp-H9v6LyUabOwm8k64s3nX14';

const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

async function getRandomImage(city) {
    try {
        const response = await axios.get(unsplashApiUrl, {
            params: {
                client_id: unsplashKey,
                query: city, 
            },
        });
        const imageUrl = response.data.urls.regular;
        return imageUrl;
    } catch (error) {
        console.error('Error fetching random image:', error);
        throw error;
    }
}

module.exports = { getRandomImage };
