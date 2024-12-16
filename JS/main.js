const dayName = document.getElementById("dayName");
const dayNumber = document.getElementById("dayNumber");
const todayMonthCity = document.getElementById("todayMonthCity");
const todayLocation = document.getElementById("todayLocation");
const todayTemp = document.getElementById("todayTemp");
const todayConditionImg = document.getElementById("todayConditionImg");
const todayText = document.getElementById("todayText");
const todayHumidity = document.getElementById("todayHumidity");
const todayWind = document.getElementById("todayWind");
const todayWindDirection = document.getElementById("todayWindDirection");
const nextDayName = document.getElementById("nextDayName");
const nextConditionImg = document.getElementById("nextConditionImg");
const nextMaxTemp = document.getElementById("nextMaxTemp");
const nextMinTemp = document.getElementById("nextMinTemp");
const nextConditionText = document.getElementById("nextConditionText");
const afterNextDayName = document.getElementById("afterNextDayName");
const afterNextConditionImg = document.getElementById("afterNextConditionImg");
const afterNextMaxTemp = document.getElementById("afterNextMaxTemp");
const afterNextMinTemp = document.getElementById("afterNextMinTemp");
const afterNextConditionText = document.getElementById("afterNextConditionText");
const searchLocationInput = document.getElementById("searchLocationInput");
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords);
    let myLatitude = position.coords.latitude;
    let myLongitude = position.coords.longitude;
    getWeatherData(`${myLatitude},${myLongitude}`);
});
async function getWeatherData(query) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d5c8506fde5045b1913103551241512&q=${query}&days=3&aqi=no&alerts=no`);
    let data = await response.json();
    console.log(data);
    displayWeatherData(data);
    displayTomorrowData(data);
    displayAfterTomorrowData(data);
}
function displayWeatherData(data) {
    let today = data.current.last_updated;
    console.log(today);

    let DateName = new Date(today);
    let todayName = DateName.toLocaleString("en-us", { weekday: 'long' });
    dayName.innerHTML = todayName;

    let todayMonth = DateName.toLocaleString("en-us", { month: "long" });
    todayMonthCity.innerHTML = todayMonth;

    let todayDay = DateName.getDate();
    dayNumber.innerHTML = todayDay;

    todayLocation.innerHTML = data.location.country;
    todayTemp.innerHTML = data.current.temp_c;
    todayText.innerHTML = data.current.condition.text;

    let currentImage = data.current.condition.icon;
    let currentSrc = `https:${currentImage}`;
    todayConditionImg.setAttribute('src', currentSrc);

    todayHumidity.innerHTML = data.current.humidity;
    todayWind.innerHTML = data.current.wind_kph;
}
function displayTomorrowData(data) {
    let tomorrow = data.forecast.forecastday[1];
    console.log(tomorrow);

    let tomorrowDate = new Date(tomorrow.date);
    let tomorrowDateName = tomorrowDate.toLocaleString('en-us', { weekday: 'long' });
    nextDayName.innerHTML = tomorrowDateName;

    let tomorrowImg = tomorrow.day.condition.icon;
    let tomorrowSrc = `https:${tomorrowImg}`;
    nextConditionImg.setAttribute('src', tomorrowSrc);

    nextMaxTemp.innerHTML = tomorrow.day.maxtemp_c;
    nextMinTemp.innerHTML = tomorrow.day.mintemp_c;

    nextConditionText.innerHTML = tomorrow.day.condition.text;
}

function displayAfterTomorrowData(data) {
    let afterTomorrow = data.forecast.forecastday[2];
    console.log(afterTomorrow);

    let afterTomorrowDate = new Date(afterTomorrow.date);
    let afterTomorrowDateName = afterTomorrowDate.toLocaleString("en-us", { weekday: "long" });
    afterNextDayName.innerHTML = afterTomorrowDateName;

    let afterTomorrowImg = afterTomorrow.day.condition.icon;
    let afterTomorrowSrc = `https:${afterTomorrowImg}`;
    afterNextConditionImg.setAttribute('src', afterTomorrowSrc);

    afterNextMaxTemp.innerHTML = afterTomorrow.day.maxtemp_c;
    afterNextMinTemp.innerHTML = afterTomorrow.day.mintemp_c;

    afterNextConditionText.innerHTML = afterTomorrow.day.condition.text;
}
