const weatherApiKey = '&appid=7f87800c8c0b2b95faec9fb5ab78b73f';
const weatherApi = "http://api.openweathermap.org/data/2.5/weather?q=";
const ipApi = "http://ipinfo.io";
const fahrURL = "&units=metric";
const celURL = "&units=imperial";
let currentUnitURL = "&units=imperial";
let cityName;
let currentUnit = " F";
let nightOrDay;

//get the ip from user and display the temperature automaticlly
$.getJSON(ipApi, function (data) {
    cityName = data.city;
    showWeather(cityName, currentUnitURL);
});

//read 2 var: the current location , the current unit F/C
function showWeather(city, unit) {
    $.get(weatherApi + city + weatherApiKey + unit, (data) => {

        let iconCode = data.weather[0].icon;
        let weatherCode = data.weather[0].id;
        let weatherDescription = data.weather[0].description;
        let roundedTemp = data.main.temp;
        roundedTemp = Math.round(roundedTemp * 10) / 10;

        $("#region").html(cityName);
        $("#temperature").html(roundedTemp + currentUnit);
        $("#description").html(weatherDescription);

        setNightOrDay(iconCode);

        changeIcon(weatherCode);
    });
}

// change the temperature to either fahrenheit or celcius
$('#temperature').click(() => {
    if (currentUnitURL === fahrURL) {
        currentUnitURL = celURL;
        currentUnit = " F";
    } else {
        currentUnitURL = fahrURL;
        currentUnit = " C";
    }
    showWeather(cityName, currentUnitURL);
});

//handle the "change location" event
$('#city-form').submit((event) => {
    event.preventDefault();
    cityName = $('#city-name').val();
    showWeather(cityName, currentUnitURL);
});


//use the iconCode to determine whether it is night or day
//2 task here: change the matching background color, change the value nightOrDay for later use in changeIcon()
function setNightOrDay(code) {
    if (code.charAt(2) === 'd') {
        document.body.style.backgroundColor = "#7ab1c9";
        nightOrDay = "day-";
    } else {
        document.body.style.backgroundColor = "#05051D";
        nightOrDay = "night-";
    }
}

//using weather-icons.min.css require assigning corresponding attribute to the class
function changeIcon(code) {

    var prefix = 'wi wi-owm-';
    var icon = nightOrDay + code;
    icon = prefix + icon;
    $('#weather-icon').attr("class", prefix + icon);
}