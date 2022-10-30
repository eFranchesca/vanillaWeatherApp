function displayTemperature(response) {
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Fort Lauderdale&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);