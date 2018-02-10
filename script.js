$(document).ready(function(){
var api_key = "8f236e524e673e139b0f6739b81a6eb4";
var celsius = false;

function displayTemp(fTemp, c){
    if(c) return Math.round((fTemp - 32) * (5/9)) + "&deg" + "C";
    return Math.round(fTemp) + "&deg" + "F";
}

function render(data, celsius){
    console.log(data);
    var country = data.sys.country;
    var icon = data.weather[0].icon;
    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    var temp = displayTemp(data.main.temp, celsius);
    var high = displayTemp(data.main.temp_max, celsius);
    var low = displayTemp(data.main.temp_min, celsius);

    $('.city').html("IP address: " + data.name + ", " + country);
    $('.temp').prepend('<img src="' + icon + '">');
    $('.temp').html(temp);
    $('.weather').html(data.weather[0].description);
    $('.max').html("Max temp: "+high);
    $(".min").html("Min temp: " + low);
    $(".pressure").html("Pressure: " + data.main.pressure +"hPa");
    $(".wind-speed").html("Wind speed: " + data.wind.speed + "m/s");
    $(".wind-dir").html("Wind direction: " + data.wind.deg + "&#176");
    $('.temp').prepend('<img src="' + iconSrc + '">');
}

$(function(){
    var location;
    var ipinfo = 'http://ipinfo.io';
    var openAPI = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=';
  $.getJSON(ipinfo, function(d){
    loc = d.loc.split(",");
    console.log(location);
    console.log(d);

    $.getJSON(openAPI + loc[0] + '&lon=' + loc[1] +'&APPID=' + api_key, function(apiData){
      wd = apiData;
      render(apiData, celsius);
      $('#toggle').click(function(){
        celsius = !celsius;
        render(wd, celsius);
      })
    })
  })
})
});
