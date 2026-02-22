let searchLocationInput = document.getElementById("searchLocationInput");
let btnSearch = document.getElementById("btnSearch");
let loading = document.getElementById("loading");
let city = document.querySelector(".city");
let date = document.getElementById("date");
let month = document.getElementById("month");
let todayTemp = document.getElementById("todayTemp");
let todayHumidity = document.getElementById("todayHumidity");
let todayWind = document.getElementById("todayWind");
let dayWeather = document.getElementById("dayWeather");
let dayNext = document.getElementById("dayNext");
let degreeNext = document.getElementById("degreeNext");
let subDegreeNext = document.getElementById("subDegreeNext");
let dayNextWeather = document.getElementById("dayNextWeather");
let dayLast = document.getElementById("dayLast");
let degreeLast = document.getElementById("degreeLast");
let subDegreeLast = document.getElementById("subDegreeLast");
let dayLastWeather = document.getElementById("dayLastWeather");
let todayConditionImg = document.getElementById("todayConditionImg");
let NextConditionImg = document.getElementById("NextConditionImg");
let LastConditionImg = document.getElementById("LastConditionImg");

searchLocationInput.addEventListener("input", function () {
  let text = "";
  if (searchLocationInput.value !== "") {
    text = searchLocationInput.value;
    getWeather(text);
  } else {
    getWeather();
  }
});

async function getWeather(land = "cairo") {
  try {
    loading.classList.remove("d-none");
    document.querySelector(".main-forcast").classList.add("d-none");
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=d5c8506fde5045b1913103551241512&q=${land}&days=3&aqi=no&alerts=no`,
    );
    let data = await response.json();
    if (response.ok) {
      displayTodayWeather(data);
      displayNextWeather(data);
      displayLastWeather(data);
      document.querySelector(".main-forcast").classList.remove("d-none");
    }
  } catch (error) {
    console.log("error");
  } finally {
    loading.classList.add("d-none");
  }
}

function displayTodayWeather(data) {
  let today = data.current.last_updated;
  let newDate = new Date(today);
  let temp = data.current.temp_c;
  let currentImage = data.current.condition.icon;
  let currentSrc = `https:${currentImage}`;
  let text = data.current.condition.text;
  let humidity = data.current.humidity;
  let wind = data.current.wind_kph;

  let dayName = newDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  let dayDate = newDate.toLocaleDateString("en-US", {
    day: "numeric",
  });

  let monthName = newDate.toLocaleDateString("en-US", {
    month: "long",
  });

  city.innerHTML = data.location.name;
  day.innerHTML = dayName;
  date.innerHTML = dayDate;
  month.innerHTML = monthName;
  todayTemp.innerHTML = `${temp}°C`;
  todayConditionImg.setAttribute("src", currentSrc);
  dayWeather.innerHTML = text;
  todayHumidity.innerHTML = `${humidity}%`;
  todayWind.innerHTML = `${wind}km/h`;
}

function displayNextWeather(data) {
  let dayNextForcast = data.forecast.forecastday[1].date;
  let nextNewDate = new Date(dayNextForcast);
  let dayNextName = nextNewDate.toLocaleDateString("en-Us", {
    weekday: "long",
  });
  let currentImage = data.forecast.forecastday[1].day.condition.icon;
  let currentSrc = `https:${currentImage}`;
  let nextTemp = data.forecast.forecastday[1].day.maxtemp_c;
  let maxwind = data.forecast.forecastday[1].day.maxwind_kph;
  let text = data.forecast.forecastday[1].day.condition.text;

  dayNext.innerHTML = dayNextName;
  NextConditionImg.setAttribute("src", currentSrc);
  degreeNext.innerHTML = `${nextTemp}°C`;
  subDegreeNext.innerHTML = `${maxwind}°`;
  dayNextWeather.innerHTML = text;
}

function displayLastWeather(data) {
  let dayLastForcast = data.forecast.forecastday[2].date;
  let LastNewDate = new Date(dayLastForcast);
  let dayLasttName = LastNewDate.toLocaleDateString("en-Us", {
    weekday: "long",
  });
  let currentImage = data.forecast.forecastday[2].day.condition.icon;
  let currentSrc = `https:${currentImage}`;
  let lastTemp = data.forecast.forecastday[2].day.maxtemp_c;
  let maxwind = data.forecast.forecastday[2].day.maxwind_kph;
  let text = data.forecast.forecastday[2].day.condition.text;

  dayLast.innerHTML = dayLasttName;
  LastConditionImg.setAttribute("src", currentSrc);
  degreeLast.innerHTML = `${lastTemp}°C`;
  subDegreeLast.innerHTML = `${maxwind}°`;
  dayLastWeather.innerHTML = text;
}

getWeather();

let year = document.getElementById("year");
let newDate = new Date();
year.innerHTML = newDate.getFullYear();
