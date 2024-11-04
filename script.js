const apiKey = "22dfdcf9a3d1432895c200822240211";
const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;

document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    fetch(`${baseUrl}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error.message);
            } else {
                document.getElementById("cityName").innerText = data.location.name;
                document.getElementById("temp").innerText = `${data.current.temp_c} °C`;
                document.getElementById("wind_speed").innerText = `${data.current.wind_kph} km/hr`;
                document.getElementById("humidity").innerText = `${data.current.humidity} %`;
                document.getElementById("condition").innerText = data.current.condition.text;
                document.getElementById("icon").src = data.current.condition.icon;
                changeBackground(data.current.condition.text);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Unable to retrieve weather data.");
        });
}

function changeBackground(condition) {
    const body = document.body;

    if (condition.toLowerCase().includes("sunny")) {
        body.style.background = "linear-gradient(to right, #FFEE58, #FBC02D)";
    } else if (condition.toLowerCase().includes("rain") || condition.toLowerCase().includes("storm")) {
        body.style.background = "linear-gradient(to right, #90CAF9, #1976D2)";
    } else if (condition.toLowerCase().includes("cloudy")) {
        body.style.background = "linear-gradient(to right, #B0BEC5, #78909C)";
    } else if (condition.toLowerCase().includes("night")) {
        body.style.background = "linear-gradient(to right, #0D47A1, #1E88E5)";
    } else {
        body.style.background = "linear-gradient(to right, #6dd5fa, #2980b9)";
    }
}
