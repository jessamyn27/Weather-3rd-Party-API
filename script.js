console.log('weather dashboard app');

//  global variables
var apikey = 'ce12d6753030b472f33593ed904442cf';

// current day variables
var userInput = $('#userInfo');

// input HTML variable
var submitBtn = $('#submitBtn');
var recentSearch = $('#recentSearch');

// one day weather variables
var day = $('#day');
var dayCity = $('#dayCity');
var dayCurrent = $('#dayCurrent');
var dayIcon = $('#dayIcon');
var dayTemp = $('#dayTemp');
var dayWind = $('#dayWind');
var dayHumidity = $('#dayHumidity');
var dayUV = $('#dayUV');

// five day weather variables
var fiveDayWeather = $('.fiveDayWeather');
var fiveDayDate = $('.fiveDayDate');
var fiveDayTemp = $('.fiveDayTemp');
var fiveDayPhoto = $('.fiveDayPhoto');
var fiveDayWind = $('.fiveDayWind');
var fiveDayHumidity = $('.fiveDayHumidity');

// javascript variables
var saveCity = [];

submitBtn.click(function() {
    userInput = $('#userInfo').val();
    getAPI();
})

function getAPI() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=' + apikey)
        //fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apikey}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            dayCity.text(data.name);
            dayCurrent.text(moment().format('dddd, MMM do'));

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude={part}&units=imperial&appid=ce12d6753030b472f33593ed904442cf')
                //fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&units=imperial&appid=${apikey}`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data2) {
                    console.log(data2);
                    dayUV.text("UV Index: " + data2.current.uvi);
                    //dayUV.text(`UV Index: ${data2.current.uvi}`);
                    dayIcon.prepend("<img src=http://openweathermap.org/img/wn/" + data2.current.weather[0].icon + "@2x.png />");
                    dayTemp.text('Temp: ' + data2.current.temp + '°F');
                    dayWind.text('Wind: ' + data2.current.wind_speed + 'MPH');
                    dayHumidity.text('Humidity: ' + data2.current.humidity + '%');

                    fiveDayTemp.each(function(i) { $(this).text("Temp: " + data2.daily[i].temp.day) })
                    fiveDayWind.each(function(i) { $(this).text("Wind: " + data2.daily[i].wind_speed) })
                    fiveDayHumidity.each(function(i) { $(this).text("Humidity: " + data2.daily[i].humidity) })
                    fiveDayDate.each(function(i) { $(this).text(moment().add(1 + i, 'days').format("dddd")); });
                    fiveDayPhoto.each(function(i) { $(this).prepend("<img src=http://openweathermap.org/img/wn/" + data2.daily[i].weather[0].icon + "@2x.png />"); });
                })
        })
}