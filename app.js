const apiKey = "b790b03735c3448c9a2a8215bccaa62e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");
const weather = document.querySelector(".weather");


function weatherIconImg(weather){
    switch(weather){
        case "Clouds":
            return("images/clouds.png");
        case "Clear":
            return("images/clear.png");
        case "Drizzle":
            return("images/drizzle.png");
        case "Mist":
            return("images/mist.png");
        case "Rain":
            return("images/rain.png");
        case "Snow":
            return("images/snow.png");
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
searchBox.addEventListener("keydown", (event) => {
    if(event.key === "Enter")
        checkWeather(searchBox.value);
})

async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    if ((response.status == 404||(response.status == 400))){
        error.style.display = "block";
        weather.style.display = "none";
    }
    else{
        error.style.display = "none";
        weather.style.display = "block";
    }

    let data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp)+ "°C";
    document.querySelector(".humidity").textContent = data.main.humidity+ " %";
    document.querySelector(".wind").textContent = data.wind.speed+ " km/h";

    weatherIcon.src = weatherIconImg(data.weather[0].main)
    weather.style.display = "block";
}

