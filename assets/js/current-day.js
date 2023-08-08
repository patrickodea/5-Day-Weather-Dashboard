var cityInput = document.getElementById("formInput");
var button = document.getElementById("button");
var nameWeather = document.getElementById("name");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");

//api call
function getApi(){
    var city = cityInput.value;
    var geocoding= "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6257fbb45c08f20e1cc17462b2450f53";
    var lat, lon;

    var cityAll = [];

    if(localStorage.getItem("city") === null){
        
        localStorage.setItem("city", JSON.stringify(cityAll)); //stringify
    }
    else {
        
        cityAll = JSON.parse(localStorage.getItem("city")); //parse
    }

    localStorage.setItem("city", city);


//fetching geocoding api
    fetch(geocoding)
    .then(function (response) {
        return response.json();
    })
    
    .then(function (data) {
        console.log(data)

        //getting the lat and lon values for data display
        lat = data.city.coord.lat;
        lon = data.city.coord.lon;

        //current day data
        var weatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6257fbb45c08f20e1cc17462b2450f53";
        return fetch (weatherApi);
    })      
    .then(function (weatherResponse) {
        return weatherResponse.json();
    })

    //function used to display data for current day
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