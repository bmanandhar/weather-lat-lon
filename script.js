$(document).ready(function(){
    var api_key = "8f236e524e673e139b0f6739b81a6eb4";
//    var openWeatherMap; on Toggle, trying to replace data by metric units available on the api url,
    var ipInfo = "https://ipinfo.io";
    var imperial = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=";
    var metric = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=";
    var fahrenheit = true;
    var celsius = false;
    function result(fahrenheit, celsius){
        if(celsius && fahrenheit) return Math.round(celsius * 10) / 10 + "&deg" + "C";
        else return Math.round(fahrenheit * 10) / 10 + "&#176" + "F";
    }

    function cityWeather(data, celsius){
        console.log(data);
        var temp = result(data.main.temp, celsius);
        var max = result(data.main.temp_max, celsius);
        var min = result(data.main.temp_min, celsius);

        $(".city").html(city);
        $(".region-country").html(region + ", " + country);
        $(".temp").html(temp);
        $(".weather").html(data.weather[0].description);
        $(".max").html("Max temp: " + max);
        $(".min").html("Min temp: " + min);
        $(".humidity").html("Humidity: " + data.main.humidity + "%");
        $(".pressure").html("Pressure: " + data.main.pressure + "hPa");
        $(".wind-speed").html("Wind speed: " + data.wind.speed + "mile/hr");
        $(".wind-dir").html("Wind direction: " + data.wind.deg + "&#176");
        $(".temp").prepend("<img src='" + 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' + "'>");
    }

    function cityWeather(data, fahrenheit){
        console.log(data);
        var temp = result(data.main.temp, fahrenheit);
        var max = result(data.main.temp_max, fahrenheit);
        var min = result(data.main.temp_min, fahrenheit);

        $(".city").html(city);
        $(".region-country").html(region + ", " + country);
        $(".temp").html(temp);
        $(".weather").html(data.weather[0].description);
        $(".max").html("Max temp: " + max);
        $(".min").html("Min temp: " + min);
        $(".humidity").html("Humidity: " + data.main.humidity + "%");
        $(".pressure").html("Pressure: " + data.main.pressure + "hPa");
        $(".wind-speed").html("Wind speed: " + data.wind.speed + "m/sec");
        $(".wind-dir").html("Wind direction: " + data.wind.deg + "&#176");
        $(".temp").prepend("<img src='" + 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' + "'>");
    }

    $(function(){
        $.getJSON(ipInfo, function(data){
            console.log(data);
            loc = data.loc.split(",");
            city = data.city;
            region = data.region;
            country = data.country;

        $.getJSON(imperial + loc[0] + "&lon=" + loc[1] + "&appid=" + api_key, function(data){
            cityWeather(data, celsius);
            $("#toggle").click(function(){
                fahrenheit = false;
                celsius = true;
                cityWeather(data, metric);

        $.getJSON(metric + loc[0] + "&lon=" + loc[1] + "&appid=" + api_key, function(data){
            cityWeather(data, fahrenheit);
        })
               })
            })
        })
    })
});
