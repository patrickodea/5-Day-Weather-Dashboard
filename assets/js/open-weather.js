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

    fetch(geocoding)
    .then(function (response) {
        return response.json();
    })
    
    .then(function (data) {
        console.log(data)
        
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;

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
    })
    .catch(function(error) {
        console.log(error);
    });
}



button.addEventListener("click", getApi);