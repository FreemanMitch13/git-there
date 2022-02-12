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
    console.log(search);
    getApi(search);
   googleCall(); 
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
})
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
            console.log(data)
            console.log(data.current);
            console.log(data.current.weather[0].icon);

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
            document.getElementById('currentWeather').innerHTML += data.current.temp;
            document.getElementById('feels-like').innerHTML += data.current.feels_like;
            document.getElementById('humidity').innerHTML += data.current.humidity;
            document.getElementById('windSpeed').innerHTML += data.current.wind_speed;
})
}

function showError(error){
    if(error.PERMISSION_DENIED){
        div.innerHTML = "The user have denied the request for Geolocation.";
    }
}
getLocation();

// Google API Call
function googleCall(){
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
    console.log(googleCall)
   }


//search button
$('.searchBtn').on('click', handleSubmit);
