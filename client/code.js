var map, heatmap;
var radiusClick = false;
var opacityClick = false;
var gradientClick = false;
var trafficLayer, transitLayer, bikeLayer;
var line;
var line2;
var directionsService;
var directionsDisplay1;
var directionsDisplay2;
var directionsDisplay3;
var directionsDisplay4;
var directionsDisplay5;
var directionsDisplay6;
var directionsDisplay7;
var lineSymbol;
var blankimage = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png'
var gainesville = { lat: 29.6516, lng: -82.3248 };
var zip32601 = { lat: 29.6422516, lng: -82.3289111 };
var zip32603 = { lat: 29.6577485, lng: -82.3479016 };
var zip32605 = { lat: 29.6793128, lng: -82.3723105 };
var zip32606 = { lat: 29.6788293, lng: -82.4644445 };
var zip32607 = { lat: 29.647247, lng: -82.4156829 };
var zip32608 = { lat: 29.6156734, lng: -82.3659168 };
var zip32609 = { lat: 29.7935588, lng: -82.2583297 };
var zip32641 = { lat: 29.6311155, lng: -82.2365981 };
var zip32653 = { lat: 29.7429556, lng: -82.3777335 };
var markers = [];

function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay1 = new google.maps.DirectionsRenderer;
  directionsDisplay2 = new google.maps.DirectionsRenderer;
  directionsDisplay3 = new google.maps.DirectionsRenderer;
  directionsDisplay4 = new google.maps.DirectionsRenderer;
  directionsDisplay5 = new google.maps.DirectionsRenderer;
  directionsDisplay6 = new google.maps.DirectionsRenderer;
  directionsDisplay7 = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    minZoom: 11,
    maxZoom: 15,
    center: gainesville
  });

  var onChangeHandler = function () {
    if (document.getElementById('start').value == "nothing") {
      directionsDisplay1.setMap(null);
      directionsDisplay2.setMap(null);
      directionsDisplay3.setMap(null);
      directionsDisplay4.setMap(null);
      directionsDisplay5.setMap(null);
      directionsDisplay6.setMap(null);
      directionsDisplay7.setMap(null);
    }
    else {
      directionsDisplay1.setMap(map);
      directionsDisplay2.setMap(map);
      directionsDisplay3.setMap(map);
      directionsDisplay4.setMap(map);
      directionsDisplay5.setMap(map);
      directionsDisplay6.setMap(map);
      directionsDisplay7.setMap(map);
      calculateAndDisplayRoute(directionsService, directionsDisplay1, 1);
      calculateAndDisplayRoute(directionsService, directionsDisplay2, 2);
      calculateAndDisplayRoute(directionsService, directionsDisplay3, 3);
      calculateAndDisplayRoute(directionsService, directionsDisplay4, 4);
      calculateAndDisplayRoute(directionsService, directionsDisplay5, 5);
      calculateAndDisplayRoute(directionsService, directionsDisplay6, 6);
      calculateAndDisplayRoute(directionsService, directionsDisplay7, 7);
    }
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map,
    zoom: 13,
    radius: 35,
    opacity: 0.5,
    gradient: getGradient()
  });
  heatmap.setMap(null);
  transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  //zipcodes, markers, pop-up windows
  var content32601 = '<div>' + '<p> Zip Code: 32601<br> Population: 18,585 <br> Median Age: 24.4<br> Number of Houses: 9,182<br> Median Income: $24,272<br> Below Poverty Line: 46.90%</p>' + '</div>';
  var info32601 = new google.maps.InfoWindow({
    content: content32601
  });
  var marker32601 = new google.maps.Marker({
    position: zip32601,
    map: map,
    label: '32601',
    icon: blankimage
  });
  marker32601.addListener('click', function () {
    info32601.open(map, marker32601);
  });
  var content32603 = '<div>' + '<p> Zip Code: 32603<br> Population: 6,741 <br> Median Age: 21.1<br> Number of Houses: 2,422 <br> Median Income: $20,080<br> Below Poverty Line: 54.50%</p>' + '</div>';
  var info32603 = new google.maps.InfoWindow({
    content: content32603
  });
  var marker32603 = new google.maps.Marker({
    position: zip32603,
    map: map,
    label: '32603',
    icon: blankimage
  });
  marker32603.addListener('click', function () {
    info32603.open(map, marker32603);
  });
  var content32605 = '<div>' + '<p> Zip Code: 32605<br> Population: 22,925 <br> Median Age: 40<br> Number of Houses: 10,459 <br> Median Income: $69,264<br> Below Poverty Line: 12.10%</p>' + '</div>';
  var info32605 = new google.maps.InfoWindow({
    content: content32605
  });
  var marker32605 = new google.maps.Marker({
    position: zip32605,
    map: map,
    label: '32605',
    icon: blankimage
  });
  marker32605.addListener('click', function () {
    info32605.open(map, marker32605);
  });
  var content32606 = '<div>' + '<p> Zip Code: 32606<br> Population: 21,833 <br> Median Age: 36.8<br> Number of Houses: 10,600 <br> Median Income: $59,122<br> Below Poverty Line: 10.10%</p>' + '</div>';
  var info32606 = new google.maps.InfoWindow({
    content: content32606
  });
  var marker32606 = new google.maps.Marker({
    position: zip32606,
    map: map,
    label: '32606',
    icon: blankimage
  });
  marker32606.addListener('click', function () {
    info32606.open(map, marker32606);
  });
  var content32607 = '<div>' + '<p> Zip Code: 32607<br> Population: 29,750 <br> Median Age: 25.1<br> Number of Houses: 14,802 <br> Median Income: $33,724<br> Below Poverty Line: 35.40%</p>' + '</div>';
  var info32607 = new google.maps.InfoWindow({
    content: content32607
  });
  var marker32607 = new google.maps.Marker({
    position: zip32607,
    map: map,
    label: '32607',
    icon: blankimage
  });
  marker32607.addListener('click', function () {
    info32607.open(map, marker32607);
  });
  var content32608 = '<div>' + '<p> Zip Code: 32608<br> Population: 45,832 <br> Median Age: 28<br> Number of Houses: 23,245 <br> Median Income: $40,465<br> Below Poverty Line: 29.40%</p>' + '</div>';
  var info32608 = new google.maps.InfoWindow({
    content: content32608
  });
  var marker32608 = new google.maps.Marker({
    position: zip32608,
    map: map,
    label: '32608',
    icon: blankimage
  });
  marker32608.addListener('click', function () {
    info32608.open(map, marker32608);
  });
  var content32609 = '<div>' + '<p> Zip Code: 32609<br> Population: 18,756 <br> Median Age: 36.1<br> Number of Houses: 7,999 <br> Median Income: $28,569<br> Below Poverty Line: 32.80%</p>' + '</div>';
  var info32609 = new google.maps.InfoWindow({
    content: content32609
  });
  var marker32609 = new google.maps.Marker({
    position: zip32609,
    map: map,
    label: '32609',
    icon: blankimage
  });
  marker32609.addListener('click', function () {
    info32609.open(map, marker32609);
  });
  var content32641 = '<div>' + '<p> Zip Code: 32641<br> Population: 14,291 <br> Median Age: 34.9<br> Number of Houses: 5,290 <br> Median Income: $30,091<br> Below Poverty Line: 32.80%</p>' + '</div>';
  var info32641 = new google.maps.InfoWindow({
    content: content32641
  });
  var marker32641 = new google.maps.Marker({
    position: zip32641,
    map: map,
    label: '32641',
    icon: blankimage
  });
  marker32641.addListener('click', function () {
    info32641.open(map, marker32641);
  });
  var content32653 = '<div>' + '<p> Zip Code: 32653<br> Population: 13,107 <br> Median Age: N/A<br> Number of Houses: 6,085 <br> Median Income: $64,570<br> Below Poverty Line: N/A</p>' + '</div>';
  var info32653 = new google.maps.InfoWindow({
    content: content32653
  });
  var marker32653 = new google.maps.Marker({
    position: zip32653,
    map: map,
    label: '32653',
    icon: blankimage
  });
  marker32653.addListener('click', function () {
    info32653.open(map, marker32653);
  });
  markers.push(marker32601);
  markers.push(marker32603);
  markers.push(marker32605);
  markers.push(marker32606);
  markers.push(marker32607);
  markers.push(marker32608);
  markers.push(marker32609);
  markers.push(marker32641);
  markers.push(marker32653);
  setMapOnAll(null);
}

/*function centerMap(map){
  map.setMap(map);
  map.setCenter(gainesville);
  map.setZoom(12);
}*/

function toggleDiv(id) {
    var div = document.getElementById(id);
    div.style.display = div.style.display == "none" ? "block" : "none";
    if (div.style.display == "block"){
      document.getElementById("Instruction").innerHTML = 'Click on the dropdown box under the checkboxes to display routes from hubs to apartments.';
    }
    else{
      document.getElementById("Instruction").innerHTML = '';
    }
    directionsDisplay1.setMap(null);
    directionsDisplay2.setMap(null);
    directionsDisplay3.setMap(null);
    directionsDisplay4.setMap(null);
    directionsDisplay5.setMap(null);
    directionsDisplay6.setMap(null);
    directionsDisplay7.setMap(null);
}

function heatMapToggle(id) {
  var legend = document.getElementById(id);
  legend.style.display = legend.style.display == "none" ? "block" : "none";

  if (heatmap.getMap() == null && legend.style.display == "block"){
    heatmap.setMap(map);
    map.setZoom(13);
    
    document.getElementById("Instruction").innerHTML = 'Zoom is locked. Refer to HeatMap Legend below.';
    map.setOptions({ minZoom: 13, maxZoom: 13 });
    map.setCenter({ lat: 29.6560626, lng: -82.3897699 });
  }
  else{
    heatmap.setMap(null);
    document.getElementById("Instruction").innerHTML = '';
    map.setOptions({ minZoom:11, maxZoom: 15 });
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, route) {
  if (route == 1) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: 'Majestic Oaks Apartments, Gainesville, FL 32607',
      travelMode: 'TRANSIT'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  if (route == 2) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: 'Gainesville Place Apartments, Gainesville, FL 32608',
      travelMode: 'TRANSIT'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  if (route == 3) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: 'Cabana Beach Apartments, Gainesville, FL 32607',
      travelMode: 'TRANSIT'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  if (route == 4) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: '3527 SW 20th Ave, Gainesville, FL 32607',
      travelMode: 'TRANSIT'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  if (route == 5) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: 'Tivoli Apartments in Gainesville, Gainesville, FL 32608',
      travelMode: 'TRANSIT'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  if (route == 6) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: '505 SW 2nd Ave, Gainesville, FL 32601',
      travelMode: 'TRANSIT'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  if (route == 7) {
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: 'Rawlings Hall, Gainesville, FL 32603',
      travelMode: 'TRANSIT'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function Markers() {
  if (markers[0].getMap() == null) {
    setMapOnAll(map);
    document.getElementById("Instruction").innerHTML = 'Click on the zipcodes on the map to get more information about each zipcode in Gainesville';
  }
  else {
    setMapOnAll(null);
    document.getElementById("Instruction").innerHTML = '';
  }
}
//data points
function getPoints() {
  return [
  //green = 5 min
  //yellow = 10 min
  //red = 15 min
    //oaks mall
    {location: new google.maps.LatLng(29.6574, -82.4114), weight: 3},
    {location: new google.maps.LatLng(29.6536, -82.4109), weight: 3},
    //along bus route 23
      //bottom right corner - newell & 55th
      {location: new google.maps.LatLng(29.659, -82.409), weight: 3},
      {location: new google.maps.LatLng(29.659, -82.405), weight: 3},
      {location: new google.maps.LatLng(29.659, -82.4014), weight: 3},
      //en route
      {location: new google.maps.LatLng(29.663, -82.4014), weight: 2.5},
      {location: new google.maps.LatLng(29.665, -82.4014), weight: 2.5},
      {location: new google.maps.LatLng(29.67, -82.4014), weight: 2.5},
      {location: new google.maps.LatLng(29.6738, -82.4018), weight: 2.5},

      //top right corner - 55th & 23rd
      {location: new google.maps.LatLng(29.6738, -82.4018), weight: 2.5},
      
      //left
      {location: new google.maps.LatLng(29.66, -82.414), weight: 3},
      {location: new google.maps.LatLng(29.66, -82.417), weight: 3},
      {location: new google.maps.LatLng(29.66, -82.420), weight: 2.5},
      {location: new google.maps.LatLng(29.66, -82.425), weight: 2.5},
      {location: new google.maps.LatLng(29.66, -82.430), weight: 2},
      {location: new google.maps.LatLng(29.661, -82.435), weight: 1.5},
      //right
      {location: new google.maps.LatLng(29.6576, -82.3959), weight: 2.5},
      {location: new google.maps.LatLng(29.6557, -82.3907), weight: 1},
      //south on 62nd blvd
      {location: new google.maps.LatLng(29.6497, -82.4066), weight: 2},
   

    //santa fe college
    {location: new google.maps.LatLng(29.6806, -82.4331), weight: 4},
      //towards 23rd ave
      {location: new google.maps.LatLng(29.677, -82.4303), weight: 1.5},
      //santa fe west apts
      {location: new google.maps.LatLng(29.6842, -82.4398), weight: 1},
      {location: new google.maps.LatLng(29.683, -82.437), weight: 1},
      //39th ave top right
      {location: new google.maps.LatLng(29.688, -82.4302), weight: 1.75},
      {location: new google.maps.LatLng(29.685, -82.4302), weight: 1.75},

    //butler  plaza
    {location: new google.maps.LatLng(29.625140, -82.387885), weight: 3.5},
      {location: new google.maps.LatLng(29.6218, -82.38697), weight: 3},
      {location: new google.maps.LatLng(29.6276, -82.3830), weight: 3},
      //surrounding areas
      {location: new google.maps.LatLng(29.6253, -82.38386), weight: 2},
      //24th ave and 38th ter
      {location: new google.maps.LatLng(29.63153, -82.3808), weight: 2},
      //in between
      {location: new google.maps.LatLng(29.63156, -82.3808), weight: 2},
      //20th and 38th ter
      {location: new google.maps.LatLng(29.6339, -82.3810), weight: 2},
      //continuing along route 33
      {location: new google.maps.LatLng(29.636757, -82.380765), weight: 2},
      {location: new google.maps.LatLng(29.637242, -82.3782), weight: 2},
      //before 34th st
      {location: new google.maps.LatLng(29.6378, -82.3741), weight: 2},
      //after 34th
      {location: new google.maps.LatLng(29.6375, -82.36886), weight: 2},
      {location: new google.maps.LatLng(29.63746, -82.36515), weight: 2},
      //left side of lake alice
      {location: new google.maps.LatLng(29.637484, -82.3601), weight: 2},
      //right side of lake alice
      {location: new google.maps.LatLng(29.63832, -82.35326), weight: 1.5},

      //archer route
      {location: new google.maps.LatLng(29.6211, -82.3812), weight: 1},
      {location: new google.maps.LatLng(29.6233, -82.3759), weight: 1},
      {location: new google.maps.LatLng(29.62564, -82.3745), weight: 1},
      {location: new google.maps.LatLng(29.627279, -82.37137), weight: 1},
      {location: new google.maps.LatLng(29.63175, -82.36193), weight: 1},

    //shands hospital
    {location: new google.maps.LatLng(29.6400, -82.3427), weight: 4.5},
      //museum
      {location: new google.maps.LatLng(29.6448, -82.3434), weight: 1.5},
      //diamond village
      {location: new google.maps.LatLng(29.64249, -82.3393), weight: 1},
      //down 13th on bus stops
      //oak brook condo
      {location: new google.maps.LatLng(29.6384, -82.3390), weight: 1},
      {location: new google.maps.LatLng(29.6278, -82.3391), weight: 1},
      {location: new google.maps.LatLng(29.6346, -82.3395), weight: 1},
      //boardwalk apt
      {location: new google.maps.LatLng(29.6264, -82.3392), weight: 1},
      //right on 16th
      {location: new google.maps.LatLng(29.6364, -82.3351), weight: 1},

      
    //rosa parks
    {location: new google.maps.LatLng(29.6460, -82.3227), weight: 4},
    //downtown
    {location: new google.maps.LatLng(29.64929, -82.3242), weight: 2},
    //courts up the road 
    {location: new google.maps.LatLng(29.65153, -82.3223), weight: 2},
    //right on university
    {location: new google.maps.LatLng(29.65166, -82.31961), weight: 1},
    //left to 2nd ave apt
    {location: new google.maps.LatLng(29.6504, -82.3299), weight: 1}  
  ];
}
 function getGradient() {
  return [
    'rgba(255, 255, 255, 0)',
    //gradient from red to yellow
    'rgba(229, 37, 0, 1)',
    'rgba(231, 58, 0, 1)',
    'rgba(234, 80, 0, 1)',
    'rgba(226, 102, 0, 1)',
    'rgba(239, 112, 0, 1)',
    'rgba(242, 146, 0, 1)',
    'rgba(244, 167, 0, 1)',
    'rgba(247, 189, 0, 1)',
    'rgba(249, 211, 0, 1)',
    'rgba(252, 233, 0, 1)',
    //yellow to green
    'rgba(226, 224, 0, 1)',
    'rgba(201, 216, 0, 1)',
    'rgba(176, 208, 0, 1)',
    'rgba(151, 199, 0, 1)',
    'rgba(126, 191, 0, 1)',
    'rgba(100, 183, 0, 1)',
    'rgba(75, 174, 0, 1)',
    'rgba(50, 166, 0, 1)',
    'rgba(25, 158, 0, 1)',
    'rgba(0, 150, 0, 1)'
  ];
}