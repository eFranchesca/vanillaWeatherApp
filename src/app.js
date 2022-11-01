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
  "Thursday",
  "Friday",
  "Saturday",
 ];
 let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayTemperature(response) {
  console.log(response.data);
 let temperatureElement = document.querySelector("#temperature");  
 let cityElement = document.querySelector("#city");
 let descriptionElement = document.querySelector("#description");
 let windElement = document.querySelector("#wind");
 let dateElement = document.querySelector("#time");

 temperatureElement.innerHTML = Math.round(response.data.main.temp);
 descriptionElement.innerHTML = response.data.weather[0].description;
 windElement.innerHTML = Math.round(response.data.wind.speed);
 dateElement = formatDate(response.data.dt * 1000);
 
}

let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Fort Lauderdale&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);