var googleLat ;
var googleLon ;
//Open Weather API Key
const weatherApiKey = "1ad4965b69077cc77a3ec509434002cd";
//Google API Key
const mapApiKey = "AIzaSyCKB4f8DEdLTxjvjdKe2j19VtWeW02ghX4"
var div = document.getElementById("location");

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }else{
        div.innerHTML = "The Browser Does Not Support Geolocation";
    }
}
function showPosition(position) {
    googleLat = position.coords.latitude;
    googleLon = position.coords.longitude;
    function getGoogle() {
            var googleUrl = `https://maps.googleapis.com/maps/api/directions/JSON?&origin=${googleLat},${googleLon}&key=${mapApiKey}`;
            fetch(googleUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data){
                console.log(data);
        })
    }
   getGoogle();
   
}
function showError(error){
    if(error.PERMISSION_DENIED){
        div.innerHTML = "The user have denied the request for Geolocation.";
    }
}
getLocation();
console.log(googleLat);
console.log(googleLon);
// const mapApiKey = "AIzaSyCKB4f8DEdLTxjvjdKe2j19VtWeW02ghX4";

// //api to get lat and lon
// function getApi(search) {
//     var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${apiKey}`;
//     fetch(requestUrl)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data){
//         cityNameValue = data[0]["name"];
//         console.log(data);
//         getLatLon(data[0]);
//     })
//     .catch( error => console.log(error) )
//     .finally( console.log('finished with fetch') )
// }


// function getLatLon(location) {
//     var { lat, lon } = location;
//     var city = location.name;
//     var latLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKey}`;
// }

// function getGoogle() {
//     var googleLat ;
//     var googleLon ;
//     var googleUrl = `https://maps.googleapis.com/maps/api/directions/JSON?&origin=${googleLat},${googleLon}&key=${mapApiKey}`;
//     fetch(googleUrl)
//     .then(function (response) {
//         console.log(response);
//     })
// }
