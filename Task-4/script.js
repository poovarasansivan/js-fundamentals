function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "32a0d1dae74c15d5fce83dda58513c15";
  if (!city) {
    alert("Please enter city name");
    return;
  }
  const currentWeatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastWeatherurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherurl)
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((error) => {
      console.log(error);
      alert("Weather data not found");
    });

  fetch(forecastWeatherurl)
    .then((response) => response.json())
    .then((data) => {
      displayForecastWeather(data);
    })
    .catch((error) => {
      console.log(error);
      alert("Weather data not found");
    });
}

function displayCurrentWeather(data) {
  const tempdivinfo = document.getElementById("temp-div");
  const weatherinfodiv = document.getElementById("weather-info");
  const weathericon = document.getElementById("weather-icon");
  const hourlyforecast = document.getElementById("hourly-forecast");

  weatherinfodiv.innerHTML = "";
  tempdivinfo.innerHTML = "";
  hourlyforecast.innerHTML = "";

  if (data.cod === "404") {
    weatherinfodiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityname = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconcode = data.weather[0].icon;
    const iconurl = `http://openweathermap.org/img/wn/${iconcode}@4x.png`;

    const temperaturehtml = `<p>${temperature}°C</p>`;
    const weatherhtml = `<p>${cityname}</p><p>${description}</p>`;
    tempdivinfo.innerHTML = temperaturehtml;
    weatherinfodiv.innerHTML = weatherhtml;
    weathericon.src = iconurl;
    weathericon.alt = description;
    showImg();
  }
}

function displayForecastWeather(data) {
  const hourlyforecast = document.getElementById("hourly-forecast");
  const next24hours = data.list.slice(0, 8);

  next24hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hours = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconcode = item.weather[0].icon;
    const iconurl = `http://openweathermap.org/img/wn/${iconcode}.png`;

    const hourlyhtml = `<div class="hourly-item">
                              <span>${hours}:00</span>
                              <img src="${iconurl}" alt="weather-icon">
                              <span>${temperature}°C</span>
                            </div>`;
    hourlyforecast.innerHTML += hourlyhtml;
  });
}

function showImg() {
  const img = document.getElementById("weather-icon");
  img.style.display = "block";
}
