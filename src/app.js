function formatDate(timestamp) {
 let date = new Date(timestamp);
 let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
 let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

 let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Satday",
 ];
 let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
  console.log(displayForecast);
}

function displayForecast(response) {

 let forecastElement = document.querySelector("#forecast");

 let days = ["Sat", "Sun", "Mon", "Tues", "Wed"];

 let forecastHTML = `<div class="row">`;
 days.forEach(function (day) {
 forecastHTML = 
  forecastHTML + 
  `
    <div class="col-2">
      <span class="weather-forecast-day">${day}</span>
        <span>
        <img
        id="daily-icon"
        src="http://openweathermap.org/img/wn/02d@2x.png"
        alt=""
        width="30"
      /span>
      <span class="weather-forecast-temps">
        <span class="weather-forecast-temp-high">85°</span>
        <span class="weather-forecast-temp-low">/ 77°</span>
      </span>
    </div>
  `;
  });

 forecastHTML = forecastHTML + `</div>`;
 forecastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
console.log(coordinates);
}

function displayTemperature(response) {
 let cityElement = document.querySelector("#city");
 let dateElement = document.querySelector("#date");
 let temperatureElement = document.querySelector("#temperature");  
 let descriptionElement = document.querySelector("#description");
 let iconElement = document.querySelector("#icon");
 let feelsLikeElement = document.querySelector("#feelsLike");
 let windElement = document.querySelector("#wind"); 

 cityElement.innerHTML = response.data.name;
 dateElement.innerHTML = formatDate(response.data.dt * 1000);
 temperatureElement.innerHTML = Math.round(response.data.main.temp);
 descriptionElement.innerHTML = response.data.weather[0].description;
 feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
 windElement.innerHTML = Math.round(response.data.wind.speed);
 iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description); 

  getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
  axios.get(apiUrl).then(displayTemperature);
}

 function handleSubmit(event) {
  event.preventDefault();
  cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
 }

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Fort Lauderdale");
