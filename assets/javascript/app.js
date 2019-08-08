//on click for home button
// document.getElementById("myBtn").addEventListener("click", displayDate);
// window.location.href = "file:///C:/Users/willi/Desktop/group-project/Group/index.html#";

//  googlemaps  
var globalIdgaf={
  coords:{
    latitude:39.68,
    longitude:-104.96
  }
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      var x = document.getElementById("location");
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
  console.log(navigator.geolocation)
}
function showPosition(position=globalIdgaf) {
  var x = document.getElementById("location");
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; 
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  // console.log(position.coords)

  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=O4ZKxAFY8EOCdyuM8hx8sWLZSF8gkBHF&latlong="+latlon,
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);

                var e = document.getElementById("events");
                // e.innerHTML = json.page.totalElements + " events found.";
                e.innerHTML = json.page.totalElements + " events found.";
                showEvents(json);
                console.log(position)
                initMap(position, json);
             },
    error: function(xhr, status, err) {
                console.log(err);
             }
  });
  // $.ajax({
  //   type:"GET",
  //   url:"https://maps.googleapis.com/maps/api/js?key=AIzaSyAL7oHHjQCXhpWvTqCS89EQbOrjBkIE_5M&callback=initMap"+latlon,
  //   async:true,
  //   dataType: "json",
  //   success: function(json) {
  //               console.log(json);
  //               var e = document.getElementById("events");
  //               e.innerHTML = json.page.totalElements + " events found.";
  //               showEvents(json);
  //               initMap(position, json);
  //            },
  //   error: function(xhr, status, err) {
  //               console.log(err);
  //            }
  // });
};

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
for(var i=0; i<10; i++) {
  $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
}
}
// json.page.size

function initMap(position=globalIdgaf, json) {
var mapDiv = document.getElementById('map');
console.log(position)

var map = new google.maps.Map(mapDiv, {
  center: {lat: position.coords.latitude, lng: position.coords.longitude},
  zoom: 10
});
for(var i=0; i<10; i++) {
  addMarker(map, json._embedded.events[i]);
}
}
// json.page.size

function addMarker(map, event) {
var marker = new google.maps.Marker({
  position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
  map: map
});
marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
console.log(marker);
}




//Fuction for JSON starts-->soon to append info on HTML
getLocation();

// });
//functions need to be created for when a city is entered, events from multiple API's need to populate to its designated page. need to come up with a limit of how many events will be displayed. on click to be at the end.
var cities = ["Denver", "Austin", "Seattle", "Dallas"];
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
// console.log(stringify(response));
for(var i =0; i<_embedded.events.length; i++){
var eventName = _embedded.events[i].name
var startDateTime= _embedded.events[i].sales.public.startDateTime
var venueName=_embedded.events[i].venues.name
var img=_embedded.events[i].attractions.name.images.url
console.log(eventName);
}















}
//
var page = 0;

function getEvents(page) {

  $('#events-panel').show();
  $('#attraction-panel').hide();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getEvents.json.page.totalPages-1) {
      page=0;
      return;
    }
  }
  
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=SOJLbFaWeEAeY6IXqBXhcCHomLO71BHF&size=4&page="+page,
    async:true,
    dataType: "json",
    success: function(json) {
          getEvents.json = json;
  			  showEvents(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showEvents(json) {
  var items = $('#events .list-group-item');
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    item.off("click");
    item.click(events[i], function(eventObject) {
      console.log(eventObject.data);
      try {
        getAttraction(eventObject.data._embedded.attractions[0].id);
      } catch (err) {
      console.log(err);
      }
    });
    item=item.next();
  }
}

$('#prev').click(function() {
  getEvents(--page);
});

$('#next').click(function() {
  getEvents(++page);
});

function getAttraction(id) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions/"+id+".json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG",
    async:true,
    dataType: "json",
    success: function(json) {
          showAttraction(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showAttraction(json) {
  $('#events-panel').hide();
  $('#attraction-panel').show();
  
  $('#attraction-panel').click(function() {
    getEvents(page);
  });
  
  $('#attraction .list-group-item-heading').first().text(json.name);
  $('#attraction img').first().attr('src',json.images[0].url);
  $('#classification').text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
}

getEvents(page);


//
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
