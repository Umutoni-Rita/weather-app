document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'f1dfb30b5bff47f3b83134538230105';
    const searchButton = document.getElementById('searchButton');
    const locationInput = document.getElementById('locationInput');
    const weatherContainer = document.getElementById('weatherContainer');

    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location.trim() !== '') {
            getWeather(location);
        }
    });

    async function getWeather(location) {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.error) {
                weatherContainer.innerHTML = `<p class="error-message">${data.error.message}</p>`;
            } else {
                const weatherInfo = `
                    <h2>${data.location.name}, ${data.location.country}</h2>
                    <div class="weather-info">
                        <p class="temperature">Temperature: ${data.current.temp_c}°C</p>
                        <p class="condition">Condition: ${data.current.condition.text}</p>
                        <p class="humidity">Humidity: ${data.current.humidity}%</p>
                        <p class="wind">Wind: ${data.current.wind_kph} km/h</p>
                    </div>
                `;
                weatherContainer.innerHTML = weatherInfo;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
});
