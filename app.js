import { animateInt } from "./animation.js";

//API
const apiKey = "b790b03735c3448c9a2a8215bccaa62e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//DOM elements
const panel = document.querySelector(".panel");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

const cityEl = document.querySelector(".city");
const tempEl =  document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");

const error = document.querySelector(".error");
const weather = document.querySelector(".weather");


const weatherIcons = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Rain: "images/rain.png",
    Snow: "images/snow.png"
}

//API call
async function fetchWeather(city){
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if(!response.ok){
        return null;
    }
    return await response.json();
}

//Rendering/Updating UI
function renderUI(data){
    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].main;

    changeCity(cityEl, data.name);
    animateInt(parseInt(tempEl.textContent), temp, 800, value =>{
        tempEl.textContent = value + "°C"
    })
    animateInt(parseInt(humidityEl.textContent), data.main.humidity, 800, value =>{
        humidityEl.textContent = value+ "%"
    })
    animateInt(parseInt(windEl.textContent), data.wind.speed, 800, value =>{
        windEl.textContent = value+ "km/h"
    })
    changeWeatherIcon(weatherIcon, weatherIcons[condition]);

    if (condition === "Rain") {
        changeBackgroundGradient(panel, "135deg", "#3a7bd5", "#000428");
    }
        else if (condition === "Snow") {
        changeBackgroundGradient(panel, "135deg", "#e0eafc", "#cfdef3");
    }
    else if (temp > 30) {
        changeBackgroundGradient(panel, "135deg", "#ff512f", "#f09819");
    }
    else if (temp > 20) {
        changeBackgroundGradient(panel, "135deg", "#00feba", "#3520bd");
    }
    else {
        changeBackgroundGradient(panel, "135deg", "#1e3c72", "#2a5298");
    }
}

//Animations
function expandPanel(){
    panel.style.height = panel.scrollHeight + "px";
}

function changeWeatherIcon(img, newSrc) {
    const currentSrc = new URL(img.src).pathname;

    if (currentSrc.endsWith(newSrc)) return;

    img.style.opacity = 0;

    setTimeout(() => {
        img.src = newSrc;
        img.style.opacity = 1;
    }, 300);
}
function changeCity(city, newCity){
    const currentCity = city.textContent;

    if(currentCity.endsWith(newCity)) return;

    city.style.opacity = 0;

    setTimeout(()=>{
        city.textContent = newCity;
        city.style.opacity = 1;
    }, 300)
}
function changeBackgroundGradient(element, deg, col1, col2){
        element.style.setProperty("--angle", deg);
        element.style.setProperty("--col1", col1);
        element.style.setProperty("--col2", col2);
}

//sending API data to render function
async function  checkWeather(city) {
    city = city.trim();

    if(!city){
        panel.style.height = "130px";
        return;
    };

    const data = await fetchWeather(city);

    if(!data)return;

    renderUI(data);

    requestAnimationFrame(() =>{
        expandPanel();
    });
}

//Events 
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
searchBox.addEventListener("keydown", (event) => {
    if(event.key === "Enter")
        checkWeather(searchBox.value);
})