//on click for home button
document.getElementById("myBtn").addEventListener("click", displayDate);
window.location.href = "file:///C:/Users/willi/Desktop/group-project/Group/index.html#";

// Need to create a onclick for when the city is entered
 //on click for search button needs to be 
 $("#add ID for button").onclick("click", function(event){

  event.preventDefault();
  var city = $(this).attr("#Add ID for Location").val();
  // var startDate = $
  // var endDate = 
  // var keyword = 
  // var geoTag = 
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=SOJLbFaWeEAeY6IXqBXhcCHomLO71BHF&city=" + city + "&startDateTime=" + startDate +"&endDateTime=" + endDate +"&keyword="+ keyword

  $.ajax({
   url: queryURL,
   method: "GET"
  }).then(function(response){
   $("#json-view").text(JSON.stringify(response))
  });
    
    
});
//functions need to be created for when a city is entered, events from multiple API's need to populate to its designated page. need to come up with a limit of how many events will be displayed. on click to be at the end.

//Fuction to be Used Later
// function searchCity (){
// var city = $(this).attr("#locationInput").val();
// // var startDate = $
// // var endDate = 
// // var keyword = 
// // var geoTag = 
// var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=SOJLbFaWeEAeY6IXqBXhcCHomLO71BHF&city=" + city + "&startDateTime=" + startDate +"&endDateTime=" + endDate +"&keyword="+ keyword

// $.ajax({
//    url: queryURL,
//    method: "GET"
// }).then(function(response){
//    $("#json-view").text(JSON.stringify(response))
// });

// }

//need to take data from specfic API and make it a JSON and push to specifc  item

//need to push the city entered to a new html page

//search for dates and filter by the date inputed 

//
 //\ in CSSFilter by event type//Filter by what is inviovled in event//API needs to accept relevant queries//Make use of postman//Set limit for what is shown on page//sCan use sol.ifire modals from sweetalertswa//lLl





    // For Date Bar
   $(document).ready(function(){
      var date_input=$('input[name="date"]'); //our date input has the name "date"
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);
      console.log(date_input)
    })