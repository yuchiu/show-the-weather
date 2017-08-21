let weather = (function () {

    // cacheDom:
    let $region = $("#region");
    let $temp = $("#temperature");
    let $desc = $("#description");
    let $cityForm = $('#city-form');
    let $cityName = $('#city-name');
    let $icon = $('#weather-icon');
    //true = F, false = C
    let curUnit = true;

    // events:
    $cityForm.on('submit', (event) => {
        event.preventDefault();
        let city = $cityName.val();
        initWeather(city);
    });

    $temp.on('click', switchUnit);

    // function:    
    function getIp() {
        const ipApi = "https://ipinfo.io"
        $.getJSON(ipApi, function (data) {
            initWeather(data.city);
        });
    }

    function initWeather(city) {
        const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";
        const weatherApiKey = '&appid=7f87800c8c0b2b95faec9fb5ab78b73f';
        let UnitURL = (curUnit === true ? "&units=imperial" : "&units=metric");
        $.get(weatherApi + city + weatherApiKey + UnitURL, (data) => {
            let iconCode = data.weather[0].icon;
            let weatherCode = data.weather[0].id;
            let weatherDescription = data.weather[0].description;
            let roundedTemp = data.main.temp;
            roundedTemp = Math.round(roundedTemp * 10) / 10;

            renderWeather(city, roundedTemp, weatherDescription);
            setBackground(iconCode);
            renderIcon(iconCode, weatherCode);
        });
    }

    function renderWeather(city, roundedTemp, weatherDescription) {
        let celOrFah = (curUnit === true ? " F" : " C");
        $region.html(city);
        $temp.html(roundedTemp + celOrFah);
        $desc.html(weatherDescription);
    }

    function setBackground(iconCode) {
        let bgColor = (iconCode.charAt(2) === "d" ? "#7ab1c9" : "#05051D");
        document.body.style.backgroundColor = bgColor;
    }

    function renderIcon(iconCode, weatherCode) {
        let prefix = 'wi wi-owm-';
        let nightOrDay = (iconCode.charAt(2) === "d" ? "day-" : "night-");
        let icon = nightOrDay + weatherCode;
        icon = prefix + icon;
        $icon.attr("class", prefix + icon);
    }

    function switchUnit() {
        if (curUnit) {
            curUnit = false;
            initWeather($region.text());
        } else if (!curUnit) {
            curUnit = true;
            initWeather($region.text());
        }
    }

    getIp();
    

})();