const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const weatherDetails = document.getElementById('weatherDetails');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        getWeatherData(location);
    } else {
        alert('Please enter a valid city or zip code');
    }
});

async function getWeatherData(location) {
    const url = 'https://weather-api138.p.rapidapi.com/weather?city_name=Fergana';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'aca997a74amsh70db6f054e4aebdp1a3be6jsn692312a7089b',
            'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

function displayWeatherData(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherDetails.innerHTML = `
        <h2>Current Weather Details for ${name}</h2>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Weather:</strong> ${description}</p>
    `;
}
