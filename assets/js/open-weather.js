var cityInput = document.getElementById("formInput");
var button = document.getElementById("button");
var output = document.getElementById("outputApi");
var nameWeather = document.getElementById("name");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");

function getApi(){
    var city = cityInput.value;
    var geocoding= "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6257fbb45c08f20e1cc17462b2450f53";
    var lat, lon;

    fetch(geocoding)
    .then(function (response) {
        return response.json();
    })
    
    .then(function (data) {
        console.log(data)
        
        lat = data.city.coord.lat;
        lon = data.city.coord.lon;

        var weatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6257fbb45c08f20e1cc17462b2450f53";
        return fetch (weatherApi);
    })      
    .then(function (weatherResponse) {
        return weatherResponse.json();
    })
    .then(function (weatherData) {
        console.log(weatherData);

        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString("en-US",{
            month: "long",
            day: "numeric",
            year: "numeric",
        });

        nameWeather.innerHTML = weatherData.name + "  (" + formattedDate + ")";
        temp.innerHTML = "Temp: " + weatherData.main.temp + "°F";
        wind.innerHTML = "Wind: " + weatherData.wind.speed + " MPH";
        humidity.innerHTML = "Humidity: " + weatherData.main.humidity + "%";
    

    var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=6257fbb45c08f20e1cc17462b2450f53";
    return fetch(forecastApi);
    })
    .then(function (forecastResponse) {
        return forecastResponse.json();
    })
    .then(function (forecastData) {
        console.log(forecastData);

        var forecastOutput = document.getElementById("forecastOutput");
        forecastOutput.innerHTML= "";
        

        for (var i = 0; i < 5; i++) {
            var item = forecastData.list[i];

            var forecastDate = new Date(item.dt * 1000);
            var formattedDate = forecastDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            var forecastTemp = item.main.temp;
            var forecastWind = item.wind.speed;
            var forecastHumidity = item.main.humidity;

            var column = document.createElement("div");
            column.className = "forecast-column";
            column.innerHTML = `
                <div class="forecast-date">${formattedDate}</div>
                <div class="forecast-temp">Temperature: ${forecastTemp}</div>
                <div class="forecast-wind">Wind Speed: ${forecastWind}</div>
                <div class="forecast-humidity">Humidity: ${forecastHumidity}</div>
            `;

            forecastOutput.appendChild(column);
        };
    })    
    .catch(function(error) {
        console.log(error);
    });
}



button.addEventListener("click", getApi);