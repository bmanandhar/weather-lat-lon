var api_key = "8f236e524e673e139b0f6739b81a6eb4";
var cel = false;
var wd;

function displayTemp(fTemp, c){
  if(c) return Math.round((fTemp - 32) * (5/9)) + "&deg" + "C";
  return Math.round(fTemp) + "&deg" + "F";
}

function render(wd, cel){
      var city = "You are in " + wd.name;
      var icon = wd.weather[0].icon;
      var weather = wd.weather[0].description;
      var temp = displayTemp(wd.main.temp, cel);
      var high = displayTemp(wd.main.temp_max, cel);
      var low = displayTemp(wd.main.temp_min, cel);
      var pressure = wd.main.pressure;
      var windDir = wd.wind.deg;

      $('.city').html(city + ", " + wd.sys.country);
      var icon = "http://openweathermap.org/img/w/" + icon + ".png";
      $('.temp').prepend('<img src="' + icon + '">');
      $('.temp').html(temp);
      $('.weather').html(weather);
      $('.max').html("Max temp: "+high);
      $(".min").html("Min temp: " + low);
      $(".pressure").html("Pressure: " + pressure +"hPa");
      $(".wind-dir").html("Wind direction: " + windDir + "&#176");
}

$(function(){

  var loc;
  $.getJSON('http://ipinfo.io', function(d){
    console.log("assigning the data...")
    loc = d.loc.split(",");
    console.log(loc);
    console.log(d);

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
              + loc[0] + '&lon=' + loc[1] +'&APPID=' + api_key, function(apiData){
      wd = apiData;
      render(apiData, cel);
      $('#toggle').click(function(){
        cel = !cel;
        render(wd, cel);
      })
    })
  })
})
