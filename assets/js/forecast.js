var cityInput = document.getElementById("formInput");
var button = document.getElementById("button");

function getForecast() {
    var city = cityInput.value;
    var geocoding = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6257fbb45c08f20e1cc17462b2450f53";

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
            var cardName = "card" + cardIndex;

            var nameElement = document.getElementById("name" + cardIndex);
            var tempElement = document.getElementById("temp" + cardIndex);
            var windElement = document.getElementById("wind" + cardIndex);
            var humidityElement = document.getElementById("humidity" + cardIndex);

            nameElement.innerHTML = city + " (" + formattedDate + ")";
            tempElement.innerHTML = "Temp: " + forecastData.main.temp + "°F";
            windElement.innerHTML = "Wind: " + forecastData.wind.speed + " MPH";
            humidityElement.innerHTML = "Humidity: " + forecastData.main.humidity + "%";
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}

button.addEventListener("click", getForecast);


