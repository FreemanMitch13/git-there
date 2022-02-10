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
    
    console.log(googleLat);
    console.log(googleLon);
}
function showError(error){
    if(error.PERMISSION_DENIED){
        div.innerHTML = "The user have denied the request for Geolocation.";
    }
}
getLocation();