var ApiKey = "6257fbb45c08f20e1cc17462b2450f53";
var cityInput = document.getElementById("formInput");
var button = document.getElementById("button");
var output = document.getElementById("outputApi");

function getApi(){
    var city = cityInput.value;
    var geocoding= "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + ApiKey;

    fetch(geocoding)
        .then(function (response) {
            if (!response){
                alert("Failed Input");
                return;
            }
            return response.json();
                    
    })
    
        .then(function(data){
            output.innerHTML = data[0].lat + data[0].lon;
        })

};


button.addEventListener("click", getApi);