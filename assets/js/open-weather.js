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

        var lat = response.data.city.coord.lat;
        var lon = response.data.city.coord.lon;

    fetch ("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6257fbb45c08f20e1cc17462b2450f53");  
    .then(function (weatherResponse) {
        return weatherResponse.json();
    })
    .then(function (weatherData) {
        console.log(weatherData);

        nameWeather.textContent = weatherData.name;
        temp.textContent = weatherData.main.temp;
        wind.textContent = weatherData.wind.speed;
        humidity.textContent = weatherData.main.humidity;
    })
    .catch(function(error) {
        console.log(error);
    });
});
}


button.addEventListener("click", getApi);