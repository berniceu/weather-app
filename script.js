const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchButton');
const weatherImage = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');


const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');


async function getWeatherData(city) {
    const apiKey = '3da18371deb2c9f0301798c201bba481';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await fetch(`${url}`).then (response => response.json());

    if(weatherData.cod === `404`) {
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} °C`;
    description.innerHTML = `${weatherData.weather[0].description}`;

    humidity.innerHTML = `${weatherData.main.humidity} %`;
    windSpeed.innerHTML = `${weatherData.wind.speed} km/h`;

    switch(weatherData.weather[0].main){
        case 'Clouds':
            weatherImage.src = "images/cloud.png";
            break;
        case 'Sun' :
            weatherImage.src = "images/sun.png";
            break;
        case 'Snow':
            weatherImage.src = "images/snow.png";
            break;
        case 'Rain' :
            weatherImage.src = "images/rain.png";
            break;
    }
    
    
}

searchBtn.addEventListener('click', () =>{
    getWeatherData(inputBox.value);
})