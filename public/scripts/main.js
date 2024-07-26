document.addEventListener('DOMContentLoaded', function () {
    let map = null;
    async function fetchData(city) {
        try {
            const response = await fetch('/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city: city }),
            });
            if (!response.ok) {
                throw new Error('Unable to fetch data. Please try again later.');
            }
            const data = await response.json();
            updateUI(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred. Please try again later.');
        }
    }
    function updateUI(data) {
        document.getElementById('map-section').classList.remove('hidden');
        document.getElementById('background-section').classList.remove('hidden');
        document.getElementById('news-section').classList.remove('hidden');
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <p>Temperature: ${data.weather.temperature} &deg;C</p>
            <p>Description: ${data.weather.description}</p>
            <p>Feels Like: ${data.weather.feelsLike} &deg;C</p>
            <p>Humidity: ${data.weather.humidity}%</p>
            <p>Pressure: ${data.weather.pressure} hPa</p>
            <p>Wind Speed: ${data.weather.windSpeed} m/s</p>
        `;
        if (!map) {
            map = L.map('map').setView([data.geolocation.lat, data.geolocation.lon], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([data.geolocation.lat, data.geolocation.lon]).addTo(map)
                .bindPopup('Your coordinates').openPopup();
        } else {
            map.setView([data.geolocation.lat, data.geolocation.lon], 13);
        }
        const backgroundSection = document.getElementById('background-section');
        backgroundSection.style.backgroundImage = `url('${data.backgroundImage}')`;
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = data.news.map(article => `<li>${article.title}</li>`).join('');
       
    }
    const form = document.getElementById('weatherForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const cityInput = document.getElementById('city');
        const city = cityInput.value.trim();

        if (city) {
            fetchData(city);
        } else {
            alert('Please enter a city name.');
        }
    });
});
