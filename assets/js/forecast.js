var cityInput = document.getElementById("formInput");
var button = document.getElementById("button");

function getForecast(city) {
    console.log(city);
    var geocoding = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6257fbb45c08f20e1cc17462b2450f53";

    var cities = JSON.parse(localStorage.getItem("cities")) || [];

    if(!cities.includes(city)){
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    displayLocal();
    
    
    
    fetch(geocoding)
    .then(function (response) {
        return response.json();
    })
    
    .then(function (data) {
        console.log(data);

        var currentDate = new Date();
        
        // Display weather information for the next 5 dates
        for (var i = 1; i <= 5; i++) {
            var forecastData = data.list[i];
            var forecastDate = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000)); // Add i days to current date
            var formattedDate = forecastDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            var cardIndex = i + 1; // Adjusted index for card IDs

            var nameElement = document.getElementById("name" + cardIndex);
            var tempElement = document.getElementById("temp" + cardIndex);
            var windElement = document.getElementById("wind" + cardIndex);
            var humidityElement = document.getElementById("humidity" + cardIndex);

            nameElement.innerHTML = formattedDate;
            tempElement.innerHTML = "Temp: " + forecastData.main.temp + "°F";
            windElement.innerHTML = "Wind: " + forecastData.wind.speed + " MPH";
            humidityElement.innerHTML = "Humidity: " + forecastData.main.humidity + "%";
        }

    })
    .catch(function(error) {
        console.log(error);
    });
}
function displayLocal(){
    document.querySelector("#lsOut").innerHTML = "";
    var cities = JSON.parse(localStorage.getItem("cities"));
    if(cities){
        for(i = 0; i < cities.length; i++){
            var cityButton = document.createElement("button");
            cityButton.textContent = cities[i];
            document.querySelector("#lsOut").append(cityButton);
        }
    }
}

displayLocal();

button.addEventListener("click", function(){
    var city = cityInput.value;
    getForecast(city);
});

document.querySelector("#lsOut").addEventListener("click", function(e){
    var city = e.target.textContent
    if(e.target.tagName === "BUTTON"){
        getForecast(city);
    }
});


