const apiKey = "22dfdcf9a3d1432895c200822240211";
const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;

document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city name");
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
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Unable to retrieve weather data.");
        });
}
