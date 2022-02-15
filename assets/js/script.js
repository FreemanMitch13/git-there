var lat ;
var lon ;
var gMap = document.getElementById("gMap");
//Open Weather API Key
const weatherApiKey = "1ad4965b69077cc77a3ec509434002cd";
//Google API Key
const mapApiKey = "AIzaSyAneS2VJ_2d2al5EKqjrgbiQVKosCtfJA0";
var div = document.getElementById("location");

var searchInput = document.querySelector("#userInput");
var search ;

function handleSubmit(event) {
    event.preventDefault();
    search = searchInput.value.trim();
    searchInput.value = "";
    localStorage.setItem("search", search);
    getApi(search);
    googleCall(search); 
    renderHistory();
}
function handleHistory(event) {
    if (!event.target.matches('historyBtn')){
        var btn = event.target;
        search = btn.getAttribute('data-search');
        console.log(search);
        getApi(search);
        googleCall(search);

    }
}

function renderHistory() {
    var searchHistory = localStorage.getItem("search");
    
   // for (var i = 0; i < searchHistory.length; i++) {
        const historyItem = document.createElement("button");
        historyItem.setAttribute("type", "button");
        historyItem.setAttribute("class", "historyBtn btn btn-secondary m-2");
        historyItem.setAttribute("data-search", searchHistory);
        historyItem.innerHTML = searchHistory;
        $('#historyEl').append(historyItem);

}

//api to get lat and lon for weather
function getApi(search) {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${weatherApiKey}`;
    fetch(requestUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        cityNameValue = data[0]["name"];
        console.log(data);
        getLatLon(data[0]);
    })
    .catch( error => console.log(error) )
    .finally( console.log('finished with fetch') )
}


function getLatLon(location) {
    var { lat, lon } = location;
    var city = location.name;
    var latLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${weatherApiKey}`;
    
    fetch(latLonUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            const currentDate = new Date(data['current']['dt'] * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            let date= month + '/' + day + '/' + year;
            let dayImg = data.current.weather[0].icon;
            let dayImgEl = document.createElement('img');
            dayImgEl.setAttribute('src', "https://openweathermap.org/img/wn/" + dayImg + '@2x.png');
            dayImgEl.setAttribute('alt', data.current.weather[0].description);

            // document.getElementById('date').innerHTML = date;
            // document.getElementById('icon').append(dayImgEl);
            // document.getElementById('currentWeather').innerHTML += data.current.temp;
            // document.getElementById('feels-like').innerHTML += data.current.feels_like;
            // document.getElementById('humidity').innerHTML += data.current.humidity;
            // document.getElementById('windSpeed').innerHTML += data.current.wind_speed;

        let fiveDayForecast = document.querySelectorAll('div[id^=forecast-card]');

    
        for (var i=0; i<fiveDayForecast.length; i++){

            const currentDate = new Date(data.daily[i]['dt'] * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            let date= search + "  " + month + '/' + day + '/' + year;
            
            let dayImg = data.daily[i].weather[0].icon;
            let dayImgEl = document.createElement('img');
            dayImgEl.setAttribute('src', "https://openweathermap.org/img/wn/" + dayImg + '@2x.png');
            dayImgEl.setAttribute('alt', data.daily[i].weather[0].description);

            let dateEl = document.createElement('h5');
            // let iconEl = document.createElement('a');
            let currentTempEl = document.createElement('p');
            let feelsLikeEl = document.createElement('p');
            let humidityEl = document.createElement('p');
            let windSpeedEl = document.createElement('p');

            dateEl.textContent = date
            // iconEl=dayImgEl
            currentTempEl.textContent = "Current Temp: " + k2f(data.daily[i].temp.day) + " ℉";
            feelsLikeEl.textContent = "Feels Like: " + k2f(data.daily[i].feels_like.day) + " ℉";
            humidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";
            windSpeedEl.textContent= "Wind Speed: " + data.daily[i].wind_speed + " MPH";
            
            fiveDayForecast[i].innerHTML = "";
            fiveDayForecast[i].append(dateEl);
            fiveDayForecast[i].append(dayImgEl);
            fiveDayForecast[i].append(currentTempEl);
            fiveDayForecast[i].append(feelsLikeEl);
            fiveDayForecast[i].append(humidityEl);
            fiveDayForecast[i].append(windSpeedEl);
        }


})
}

function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}

//GEO Location
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }else{
        div.innerHTML = "The Browser Does Not Support Geolocation";
    }
}
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude; 

    var latLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${weatherApiKey}`;
    
    fetch(latLonUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
const currentDate = new Date(data['current']['dt'] * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            let date= month + '/' + day + '/' + year;
            let dayImg = data.current.weather[0].icon;
            let dayImgEl = document.createElement('img');
            dayImgEl.setAttribute('src', "https://openweathermap.org/img/wn/" + dayImg + '@2x.png');
            dayImgEl.setAttribute('alt', data.current.weather[0].description);

            document.getElementById('date').innerHTML = date;
            document.getElementById('icon').append(dayImgEl);
            document.getElementById('currentWeather').innerHTML += k2f(data.current.temp) + " &#176F";
            document.getElementById('feels-like').innerHTML += k2f(data.current.feels_like) + " &#176F";
            document.getElementById('humidity').innerHTML += data.current.humidity + "%";
            document.getElementById('windSpeed').innerHTML += data.current.wind_speed + " MPH";
})
}

function showError(error){
    if(error.PERMISSION_DENIED){
        div.innerHTML = "The user have denied the request for Geolocation.";
    }
}
getLocation();

// Google API Call
function googleCall(search){
    var googleApi = document.createElement("iframe")
    googleApi.setAttribute("id", "myIframe");
    googleApi.setAttribute("width", "auto");
    googleApi.setAttribute("height", "auto");
    googleApi.setAttribute("style", "border:0");
    googleApi.setAttribute("loading", "lazy");
    googleApi.setAttribute("src", "https://www.google.com/maps/embed/v1/directions?zoom=8&key=AIzaSyAneS2VJ_2d2al5EKqjrgbiQVKosCtfJA0"
    + "&origin=My%20Location" 
    + "&destination=" + search);
    gMap.append(googleApi);
   }


//search button
$('.searchBtn').on('click', handleSubmit);
$(document).on('click', '.historyBtn', handleHistory);
