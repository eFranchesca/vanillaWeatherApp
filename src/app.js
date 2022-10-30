function displayTemperature(response) {
  console.log(response.data);
 let temperatureElement = document.querySelector("#temperature");  
 let cityElement = document.querySelector("#city");
 let descriptionElement = document.querySelector("#description");
 let windElement = document.querySelector("#wind");
 
 temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
 windElement.innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Fort Lauderdale&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);