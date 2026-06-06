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
    return await response.json();
}

//Rendering/Updating UI
function renderUI(data){
    cityEl.textContent = data.name;
    tempEl.textContent = Math.round(data.main.temp)+ "°C";
    humidityEl.textContent = data.main.humidity+ " %";
    windEl.textContent = data.wind.speed+ " km/h";

    weatherIcon.src = weatherIcons[data.weather[0].main];
}

function expandPanel(){
    panel.style.height = panel.scrollHeight + "px";
}

async function  checkWeather(city) {
    city = city.trim();

    if(!city){
        panel.style.height = "130px";
        return
    };

    const data = await fetchWeather(city);

    renderUI(data);

    requestAnimationFrame(() => {
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

//