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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
 
  let forecastHTML = `<div class="row">`;

 forecast.forEach(function (forecastDay, index) {
  if (index < 5) {
    forecastHTML = 
    forecastHTML + 
   `<div class="col-2 weather-forecast-day">
        <span class="weather-class-date">${formatDay(forecastDay.dt)}</span>
        <span>
        <img
        src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        width="30"
        id="daily-icon"
      /span>

      <div>
       <span class="weather-forecast-temps">
         <span class="weather-forecast-temp-high">${Math.round(forecastDay.temp.max)}°/</span>
         <span class="weather-forecast-temp-low"> ${Math.round(forecastDay.temp.min)}°</span>
       </span>
      </div>
   </div>
   `;
   }
  });

 forecastHTML = forecastHTML + `</div>`;
 forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
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
  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
 }

 function searchCurrentPosition(position) {
  let apiKey = "03681td6f2obc7b09ad4ba80345b8b9f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Fort Lauderdale");
