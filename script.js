$(document).ready(function(){
    var api_key = "8f236e524e673e139b0f6739b81a6eb4";
    var celsius = false;
//    var openWeatherMap; Trying to replace data by metric units available on the api url, 
    var ipInfo = "http://ipinfo.io";
    var imperial = "http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=";
//    var metric = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=";

    function result(fahrenheit, c){
        if(c) return Math.round(((fahrenheit - 32) * (5/9)) * 10) / 10 + "&deg" + "C";
        return Math.round(fahrenheit * 10) / 10 + "&deg" + "F";
    }

    function render(data, celsius){
        console.log(data);
        var temp = result(data.main.temp, celsius);
        var max = result(data.main.temp_max, celsius);
        var min = result(data.main.temp_min, celsius);

        $(".city").html("IP address: " + data.name + ", " + data.sys.country);
        $(".temp").html(temp);
        $(".weather").html(data.weather[0].description);
        $(".max").html("Max temp: " + max);
        $(".min").html("Min temp: " + min);
        $(".humidity").html("Humidity: " + data.main.humidity + "%");
        $(".pressure").html("Pressure: " + data.main.pressure + "hPa");
        $(".wind-speed").html("Wind speed: " + data.wind.speed + "mile/hr");
        $(".wind-dir").html("Wind direction: " + data.wind.deg + "&#176");
        $(".temp").prepend("<img src='" + 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png' + "'>");
    }

    $(function(){
        $.getJSON(ipInfo, function(data){
            console.log(data);
            loc = data.loc.split(",");

        $.getJSON(imperial + loc[0] + "&lon=" + loc[1] + "&appid=" + api_key, function(data){
            render(data, celsius);
            $("#toggle").click(function(){
                celsius = !celsius;
                render(data, celsius);
               })
            })
        })
    })
});
