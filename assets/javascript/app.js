//on click for home button
// document.getElementById("myBtn").addEventListener("click", displayDate);
// window.location.href = "file:///C:/Users/willi/Desktop/group-project/Group/index.html#";

// Need to create a onclick for when the city is entered
 //on click for search button needs to be 
// $("#searchCity").onclick("click") (function(){

//   event.preventDefault();
//   var city = $(this).attr("#searchLocation").val();
//   // var startDate = $
//   // var endDate = 
//   // var keyword = 
//   // var geoTag = 
//   var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=SOJLbFaWeEAeY6IXqBXhcCHomLO71BHF&city=" + city + "&startDateTime=" + startDate +"&endDateTime=" + endDate +"&keyword="+ keyword

//   $.ajax({
//    url: queryURL,
//    method: "GET"
//   }).then(function(response){
//    $("#json-view").text(JSON.stringify(response))
//   });

//  googlemaps   
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      var x = document.getElementById("location");
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  var x = document.getElementById("location");
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; 
  var latlon = position.coords.latitude + "," + position.coords.longitude;


  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=O4ZKxAFY8EOCdyuM8hx8sWLZSF8gkBHF&latlong="+latlon,
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                var e = document.getElementById("events");
                e.innerHTML = json.page.totalElements + " events found.";
                showEvents(json);
                initMap(position, json);
             },
    error: function(xhr, status, err) {
                console.log(err);
             }
  });

}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation."
          break;
      case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
      case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out."
          break;
      case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
  }
}


function showEvents(json) {
for(var i=0; i<json.page.size; i++) {
  $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
}
}


function initMap(position, json) {
var mapDiv = document.getElementById('map');
var map = new google.maps.Map(mapDiv, {
  center: {lat: position.coords.latitude, lng: position.coords.longitude},
  zoom: 10
});
for(var i=0; i<json.page.size; i++) {
  addMarker(map, json._embedded.events[i]);
}
}

function addMarker(map, event) {
var marker = new google.maps.Marker({
  position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
  map: map
});
marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
console.log(marker);
}




getLocation();
// });
//functions need to be created for when a city is entered, events from multiple API's need to populate to its designated page. need to come up with a limit of how many events will be displayed. on click to be at the end.
var cities = ["Denver", "Austin", "seattle", "Dallas"];
//Fuction to be Used Later
function searchCity (){

var city = $(this).attr("data-name");
// var startDate = ""
// var endDate = 
// var keyword = 
// // var geoTag = 
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=SOJLbFaWeEAeY6IXqBXhcCHomLO71BHF&city=" + city;

$.ajax({
   url: queryURL,
   method: "GET"
}).then(function(response){
   $("#json-view").text(JSON.stringify(response))
});
console.log(stringify(response));

}

function renderButtons(){

  $("#searchCity").empty();

  for(var i=0; i < cities.length; i++){
    var a = $(".btn")

   a.attr("data-name", cities[i]);
   
  //  $("#searchCity")

  }
}

$("#searchCity").on("click", function(event){
event.preventDefault()

var city = $("#searchLocation").val().trim();

cities.push(city);
console.log(cities);

renderButtons();


});




$(document).on("click",'#searchCity',searchCity);

//need to take data from specfic API and make it a JSON and push to specifc  item

//need to push the city entered to a new html page#
//search for dates and filter by the date inputed 

//
 //\ in CSSFilter by event type//Filter by what is inviovled in event//API needs to accept relevant queries//Make use of postman//Set limit for what is shown on page//sCan use sol.ifire modals from sweetalertswa//lLl

// start date picker 
 $('#startdatepicker').datepicker({
  weekStart: 1,
  daysOfWeekHighlighted: "6,0",
  autoclose: true,
  todayHighlight: true,
});
$('#startdatepicker').datepicker("setDate", new Date());

//end datre picker
$('#enddatepicker').datepicker({
  weekStart: 1,
  daysOfWeekHighlighted: "6,0",
  autoclose: true,
  todayHighlight: true,
});
$('#enddatepicker').datepicker("setDate", new Date());





    // For Date Bar
   $(document).ready(function(){
      var dateInput=$(".form-control mr-sm-2"); //our date input has the name "date"
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
      // dateInput.datepicker(options);
    console.log(options)
  });
