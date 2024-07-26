const axios = require('axios');

const newsApiKey = 'aaceac7866c1431dad83b462eaad0206';

const newsApiUrl = 'https://newsapi.org/v2/top-headlines';

async function getTopHeadlines(countryCode) {
    try {
        const response = await axios.get(newsApiUrl, {
            params: {
                apiKey: newsApiKey,
                country: countryCode,
            },
        });
        const articles = response.data.articles;
        return articles;
    } catch (error) {
        console.error('Error fetching top headlines from News API:', error);
        throw error;
    }
}

module.exports = { getTopHeadlines };
