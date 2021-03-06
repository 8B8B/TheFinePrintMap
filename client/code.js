//Variables for map, markers, directional services and directional displays
var map, heatmap;
var busstopmarkers1 = [];
var busstopmarkers2 = [];
var busstopmarkers3 = [];
var directionsDisplay20, directionsDisplay20x, directionsDisplay20y, i;
var directionsDisplay62, directionsDisplay62x, directionsDisplay62y;
var directionsDisplay75, directionsDisplay75x, directionsDisplay75y, directionsDisplay75z, directionsDisplay75w;
var directionsDisplay76, directionsDisplay76x, directionsDisplay76y;
var directionsDisplay1, directionsDisplay1x, directionsDisplay1y;
var directionsDisplay7, directionsDisplay7x, directionsDisplay7y;
var transitLayer;
var directionsService;
var directionsDisplay91;
var directionsDisplay92;
var directionsDisplay93;
var directionsDisplay94;
var directionsDisplay95;
var directionsDisplay96;
var directionsDisplay97;
var request20, request20x, request20y, request62, request62x, request62y;
var request75, request75w, request75z, request75x, request75y, request76, request76x, request76y;
var request1, request1x, request1y, request7, request7x, request7y;
var blankimage = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png';
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
var markerArray = []; //will contain number of stops + 1 for starting location
//initilizes the map with all elements hidden
function initMap() {
    var busImage = "https://www.materialui.co/materialIcons/maps/directions_bus_black_18x18.png";
    directionsService = new google.maps.DirectionsService;
    directionsDisplay91 = new google.maps.DirectionsRenderer({ map: map, preserveViewport: true, suppressMarkers: true });
    directionsDisplay92 = new google.maps.DirectionsRenderer({ map: map, preserveViewport: true, suppressMarkers: true });
    directionsDisplay93 = new google.maps.DirectionsRenderer({ map: map, preserveViewport: true, suppressMarkers: true });
    directionsDisplay94 = new google.maps.DirectionsRenderer({ map: map, preserveViewport: true, suppressMarkers: true });
    directionsDisplay95 = new google.maps.DirectionsRenderer({ map: map, preserveViewport: true, suppressMarkers: true });
    directionsDisplay96 = new google.maps.DirectionsRenderer({ map: map, preserveViewport: true, suppressMarkers: true });
    directionsDisplay97 = new google.maps.DirectionsRenderer({ map: map, preserveViewport: true, suppressMarkers: true });
    //Displays map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        minZoom: 12,
        maxZoom: 15,
        center: new google.maps.LatLng(29.643742, -82.369694),
    });

    var iconBase = 'https://maps.google.com/mapfiles/kml/paddle/';
    var icons = {
      student: {
        name: 'Student Apartment',
        icon: iconBase + 'blu-stars.png'
      },
      regular: {
        name: 'Regular Apartment',
        icon: iconBase + 'orange-stars.png'
      },
    };
    
    var legend = document.getElementById('markerLegend');
    for (var key in icons) {
      var type = icons[key];
      var name = type.name;
      var icon = type.icon;
      var div = document.createElement('div');
      div.innerHTML = '<img src="' + icon + '"> ' + name;
      legend.appendChild(div);
    }
    
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(legend);
    var onChangeHandler = function () {
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }
        document.getElementById("busRoutesTable").style.display = "none";
       document.getElementById("heatTable").style.display = "none";
        document.getElementById('demoTable').style.display = 'none';
        directionsDisplay91.setMap(null);
        directionsDisplay92.setMap(null);
        directionsDisplay93.setMap(null);
        directionsDisplay94.setMap(null);
        directionsDisplay95.setMap(null);
        directionsDisplay96.setMap(null);
        directionsDisplay97.setMap(null);
        if (document.getElementById('start').value == "nothing") {
        }
        else {
            var geocoder = new google.maps.Geocoder();
            document.getElementById("timeTable").style.display = "block";
            document.getElementById("Instruction").innerHTML = '';
            geocoder.geocode({ 'address': document.getElementById('start').value }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    markerArray.push(new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        icon: "http://maps.google.com/mapfiles/kml/paddle/wht-circle.png"
                    }));
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
            directionsDisplay91.setMap(map);
            directionsDisplay92.setMap(map);
            directionsDisplay93.setMap(map);
            directionsDisplay94.setMap(map);
            directionsDisplay95.setMap(map);
            directionsDisplay96.setMap(map);
            directionsDisplay97.setMap(map);
            calculateAndDisplayRoute(directionsService, directionsDisplay91, markerArray, 1);
            calculateAndDisplayRoute(directionsService, directionsDisplay92, markerArray, 2);
            calculateAndDisplayRoute(directionsService, directionsDisplay93, markerArray, 3);
            calculateAndDisplayRoute(directionsService, directionsDisplay94, markerArray, 4);
            calculateAndDisplayRoute(directionsService, directionsDisplay95, markerArray, 5);
            calculateAndDisplayRoute(directionsService, directionsDisplay96, markerArray, 6);
            calculateAndDisplayRoute(directionsService, directionsDisplay97, markerArray, 7);
        }
    };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        //Bus route onchange display
        var busOnChangeHandler = function(){
        if(document.getElementById('bRoutes').value == "noneSelected"){
            directionsDisplay20.setMap(null);
            directionsDisplay20x.setMap(null);
            directionsDisplay20y.setMap(null);
            directionsDisplay62.setMap(null);
            directionsDisplay62x.setMap(null);
            directionsDisplay62y.setMap(null);
            directionsDisplay75.setMap(null);
            directionsDisplay75x.setMap(null);
            directionsDisplay75y.setMap(null);
            directionsDisplay75z.setMap(null);
            directionsDisplay75w.setMap(null);
            directionsDisplay76.setMap(null);
            directionsDisplay76x.setMap(null);
            directionsDisplay76y.setMap(null);
            directionsDisplay1.setMap(null);
            directionsDisplay1x.setMap(null);
            directionsDisplay1y.setMap(null);
            directionsDisplay7.setMap(null);
            directionsDisplay7x.setMap(null);
            directionsDisplay7y.setMap(null);
            setBus(null, busstopmarkers1);
            setBus(null, busstopmarkers2);
            setBus(null, busstopmarkers3);
        }
        else if(document.getElementById('bRoutes').value == "bus1")
        {
          setBus(null, busstopmarkers1);
          setBus(null, busstopmarkers2);
          setBus(null, busstopmarkers3);
          directionsDisplay20.setMap(map);
          directionsDisplay20.setOptions( { suppressMarkers: true } );
          directionsDisplay20x.setMap(map);
          directionsDisplay20x.setOptions( { suppressMarkers: true } );
          directionsDisplay20y.setMap(map);
          directionsDisplay20y.setOptions( { suppressMarkers: true } );
          directionsDisplay62.setMap(map);
          directionsDisplay62.setOptions( { suppressMarkers: true } );
          directionsDisplay62x.setMap(map);
          directionsDisplay62x.setOptions( { suppressMarkers: true } );
          directionsDisplay62y.setMap(map);
          directionsDisplay62y.setOptions( { suppressMarkers: true } );
          directionsDisplay75.setMap(null);
          directionsDisplay75x.setMap(null);
          directionsDisplay75y.setMap(null);
          directionsDisplay75z.setMap(null);
          directionsDisplay75w.setMap(null);
          directionsDisplay76.setMap(null);
          directionsDisplay76x.setMap(null);
          directionsDisplay76y.setMap(null);
          directionsDisplay1.setMap(null);
          directionsDisplay1x.setMap(null);
          directionsDisplay1y.setMap(null);
          directionsDisplay7.setMap(null);
          directionsDisplay7x.setMap(null);
          directionsDisplay7y.setMap(null);
          setBus(map, busstopmarkers1);
          showingRoutesSelected(directionsService, 1);
        }
        else if(document.getElementById('bRoutes').value == "bus2"){
            setBus(null, busstopmarkers1);
            setBus(null, busstopmarkers2);
            setBus(null, busstopmarkers3);
            directionsDisplay20.setMap(null);
            directionsDisplay20x.setMap(null);
            directionsDisplay20y.setMap(null);
            directionsDisplay62.setMap(null);
            directionsDisplay62x.setMap(null);
            directionsDisplay62y.setMap(null);
            directionsDisplay1.setMap(null);
            directionsDisplay1x.setMap(null);
            directionsDisplay1y.setMap(null);
            directionsDisplay7.setMap(null);
            directionsDisplay7x.setMap(null);
            directionsDisplay7y.setMap(null);
            directionsDisplay75.setMap(map);
            directionsDisplay75.setOptions( { suppressMarkers: true } );
            directionsDisplay75x.setMap(map);
            directionsDisplay75x.setOptions( { suppressMarkers: true } );
            directionsDisplay75y.setMap(map);
            directionsDisplay75y.setOptions( { suppressMarkers: true } );
            directionsDisplay75z.setMap(map);
            directionsDisplay75z.setOptions( { suppressMarkers: true } );
            directionsDisplay75w.setMap(map);
            directionsDisplay75w.setOptions( { suppressMarkers: true } );
            directionsDisplay76.setMap(map);
            directionsDisplay76.setOptions( { suppressMarkers: true } );
            directionsDisplay76x.setMap(map);
            directionsDisplay76x.setOptions( { suppressMarkers: true } );
            directionsDisplay76y.setMap(map);
            directionsDisplay76y.setOptions( { suppressMarkers: true } );
            setBus(map, busstopmarkers2);
            showingRoutesSelected(directionsService, 2);
        }
        else if(document.getElementById('bRoutes').value == "bus3"){
            setBus(null, busstopmarkers1);
            setBus(null, busstopmarkers2);
            setBus(null, busstopmarkers3);
            directionsDisplay20.setMap(null);
            directionsDisplay20x.setMap(null);
            directionsDisplay20y.setMap(null);
            directionsDisplay62.setMap(null);
            directionsDisplay62x.setMap(null);
            directionsDisplay62y.setMap(null);
            directionsDisplay75.setMap(null);
            directionsDisplay75x.setMap(null);
            directionsDisplay75y.setMap(null);
            directionsDisplay75z.setMap(null);
            directionsDisplay75w.setMap(null);
            directionsDisplay76.setMap(null);
            directionsDisplay76x.setMap(null);
            directionsDisplay76y.setMap(null);
            directionsDisplay1.setMap(map);
            directionsDisplay1.setOptions( { suppressMarkers: true } );
            directionsDisplay1x.setMap(map);
            directionsDisplay1x.setOptions( { suppressMarkers: true } );
            directionsDisplay1y.setMap(map);
            directionsDisplay1y.setOptions( { suppressMarkers: true } );
            directionsDisplay7.setMap(map);
            directionsDisplay7.setOptions( { suppressMarkers: true } );
            directionsDisplay7x.setMap(map);
            directionsDisplay7x.setOptions( { suppressMarkers: true } );
            directionsDisplay7y.setMap(map);
            directionsDisplay7y.setOptions( { suppressMarkers: true } );
            setBus(map, busstopmarkers3);
            showingRoutesSelected(directionsService, 3);
        }
      };
    document.getElementById('bRoutes').addEventListener('change', busOnChangeHandler);
    //Initilize heatmap
    heatmap = new google.maps.visualization.HeatmapLayer({

        data: getPoints(),
        map: map,
        zoom: 13,
        radius: 35,
        opacity: 0.5,
        gradient: getGradient()
    });
    heatmap.setMap(null);
    //Demogrpahic markers
    var content32601 = '<div>' + '<p> Zip Code: 32601<br> Population: 18,585 <br> Median Age: 24.4<br> Number of Houses: 9,182<br> Median Income: $24,272<br> Below Poverty Line: 46.90%</p>' + '</div>';
    var info32601 = new google.maps.InfoWindow({
        content: content32601
    });
    var marker32601 = new google.maps.Marker({
        position: zip32601,
        map: map,
        label: {
            text: '32601',
            color: 'red',
            fontSize: "18px"
        },
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
        label: {
            text: '32603',
            color: 'red',
            fontSize: "18px"
        },
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
        label: {
            text: '32605',
            color: 'blue',
            fontSize: "18px"
        },
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
        label: {
            text: '32606',
            color: 'blue',
            fontSize: "18px"
        },
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
        label: {
            text: '32607',
            color: 'red',
            fontSize: "18px"
        },
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
        label: {
            text: '32608',
            color: 'red',
            fontSize: "18px"
        },
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
        label: {
            text: '32609',
            color: 'red',
            fontSize: "18px"
        },
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
        label: {
            text: '32641',
            color: 'red',
            fontSize: "18px"
        },
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
        label: {
            text: '32653',
            color: 'blue',
            fontSize: "18px"
        },
        icon: blankimage
    });
    marker32653.addListener('click', function () {
        info32653.open(map, marker32653);
    });
    //Puts all markers into an array
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
    //Bus 20 bus stops
    var bus20 = {
        "businfo": [
            {
                "code": 173, "lat": 29.653183, "lng": -82.410996
            },
            {
                "code": 824, "lat": 29.651658, "lng": -82.408971
            },
            {
                "code": 825, "lat": 29.650037, "lng": -82.407738
            },
            {
                "code": 826, "lat": 29.647812, "lng": -82.401864
            },
            {
                "code": 827, "lat": 29.646326, "lng": -82.400655
            },
            {
                "code": 828, "lat": 29.644417, "lng": -82.399106
            },
            {
                "code": 829, "lat": 29.641554, "lng": -82.398333
            },
            {
                "code": 859, "lat": 29.638078, "lng": -82.397988
            },
            {
                "code": 1236, "lat": 29.635913, "lng": -82.397884
            },
            {
                "code": 830, "lat": 29.639517, "lng": -82.39527
            },
            {
                "code": 832, "lat": 29.635184, "lng": -82.387438
            },
            {
                "code": 833, "lat": 29.634296, "lng": -82.38484
            },
            {
                "code": 835, "lat": 29.633958, "lng": -82.381892
            },
            {
                "code": 837, "lat": 29.633951, "lng": -82.377716
            },
            {
                "code": 838, "lat": 29.634077, "lng": -82.375158
            },
            {
                "code": 839, "lat": 29.635446, "lng": -82.372376
            },
            {
                "code": 840, "lat": 29.637361, "lng": -82.372355
            },
            {
                "code": 841, "lat": 29.637554, "lng": -82.370077
            },
            {
                "code": 842, "lat": 29.638171, "lng": -82.369247
            },
            {
                "code": 844, "lat": 29.640952, "lng": -82.36921
            },
            {
                "code": 1326, "lat": 29.642148, "lng": -82.368834
            },
            {
                "code": 845, "lat": 29.642199, "lng": -82.366099
            },
            {
                "code": 846, "lat": 29.642241, "lng": -82.364281
            },
            {
                "code": 847, "lat": 29.644793, "lng": -82.360884
            },
            {
                "code": 848, "lat": 29.644934, "lng": -82.35673
            },
            {
                "code": 849, "lat": 29.644837, "lng": -82.351988
            },
            {
                "code": 1134, "lat": 29.644778, "lng": -82.347121
            },
            {
                "code": 472, "lat": 29.646308, "lng": -82.343389
            },
            {
                "code": 473, "lat": 29.64514, "lng": -82.346983
            },
            {
                "code": 797, "lat": 29.644915, "lng": -82.352145
            },
            {
                "code": 798, "lat": 29.644962, "lng": -82.355326
            },
            {
                "code": 800, "lat": 29.644917, "lng": -82.360703
            },
            {
                "code": 801, "lat": 29.642655, "lng": -82.36404
            },
            {
                "code": 802, "lat": 29.642299, "lng": -82.366452
            },
            {
                "code": 803, "lat": 29.642291, "lng": -82.368951
            },
            {
                "code": 804, "lat": 29.641109, "lng": -82.36933
            },
            {
                "code": 806, "lat": 29.63812, "lng": -82.369333
            },
            {
                "code": 807, "lat": 29.637737, "lng": -82.37037
            },
            {
                "code": 808, "lat": 29.635891, "lng": -82.372659
            },
            {
                "code": 810, "lat": 29.634206, "lng": -82.374919
            },
            {
                "code": 811, "lat": 29.634123, "lng": -82.377023
            },
            {
                "code": 813, "lat": 29.634123, "lng": -82.382798
            },
            {
                "code": 814, "lat": 29.634482, "lng": -82.385207
            },
            {
                "code": 815, "lat": 29.635731, "lng": -82.38821
            },
            {
                "code": 816, "lat": 29.636959, "lng": -82.390186
            },
            {
                "code": 817, "lat": 29.637874, "lng": -82.397612
            },
            {
                "code": 1236, "lat": 29.635913, "lng": -82.397884
            },
            {
                "code": 818, "lat": 29.641168, "lng": -82.39814
            },
            {
                "code": 819, "lat": 29.644808, "lng": -82.399307
            },
            {
                "code": 820, "lat": 29.646771, "lng": -82.400893
            },
            {
                "code": 821, "lat": 29.648195, "lng": -82.402049
            },
            {
                "code": 822, "lat": 29.649886, "lng": -82.406641
            },
            {
                "code": 823, "lat": 29.652416, "lng": -82.408796
            },
            {
                "code": 173, "lat": 29.653183, "lng": -82.410996
            }
        ]
    };
    //Bus 62 bus stops
    var bus62 = {
        "businfo": [
            {
                "code": 173, "lat": 29.653183, "lng": -82.410996
            },
            {
                "code": 824, "lat": 29.651658, "lng": -82.408971
            },
            {
                "code": 825, "lat": 29.650037, "lng": -82.407738
            },
            {
                "code": 826, "lat": 29.647812, "lng": -82.401864
            },
            {
                "code": 827, "lat": 29.646326, "lng": -82.400655
            },
            {
                "code": 828, "lat": 29.644417, "lng": -82.399106
            },
            {
                "code": 829, "lat": 29.641554, "lng": -82.398333
            },
            {
                "code": 830, "lat": 29.639517, "lng": -82.39527
            },
            {
                "code": 832, "lat": 29.635184, "lng": -82.387438
            },
            {
                "code": 833, "lat": 29.634296, "lng": -82.38484
            },
            {
                "code": 835, "lat": 29.633958, "lng": -82.381892
            },
            {
                "code": 1459, "lat": 29.633377, "lng": -82.381043
            },
            {
                "code": 1556, "lat": 29.631549, "lng": -82.380992
            },
            {
                "code": 1554, "lat": 29.62791, "lng": -82.38336
            },
            {
                "code": 1564, "lat": 29.62598, "lng": -82.387373
            },
            {
                "code": 1493, "lat": 29.625154, "lng": -82.38789
            },
            {
                "code": 1349, "lat": 29.623016, "lng": -82.385719
            },
            {
                "code": 1548, "lat": 29.622999, "lng": -82.383453
            },
            {
                "code": 1027, "lat": 29.621328, "lng": -82.380919
            },
            {
                "code": 661, "lat": 29.619906, "lng": -82.379768
            },
            {
                "code": 635, "lat": 29.617617, "lng": -82.377736
            },
            {
                "code": 636, "lat": 29.617569, "lng": -82.374634
            },
            {
                "code": 637, "lat": 29.618395, "lng": -82.372361
            },
            {
                "code": 643, "lat": 29.620493, "lng": -82.372521
            },
            {
                "code": 945, "lat": 29.621566, "lng": -82.370416
            },
            {
                "code": 946, "lat": 29.620848, "lng": -82.368424
            },
            {
                "code": 947, "lat": 29.619683, "lng": -82.365079
            },
            {
                "code": 1140, "lat": 29.619302, "lng": -82.36289
            },
            {
                "code": 949, "lat": 29.616983, "lng": -82.362634
            },
            {
                "code": 950, "lat": 29.615368, "lng": -82.362445
            },
            {
                "code": 951, "lat": 29.614116, "lng": -82.361184
            },
            {
                "code": 449, "lat": 29.613497, "lng": -82.362054
            },
            {
                "code": 450, "lat": 29.615121, "lng": -82.36231
            },
            {
                "code": 451, "lat": 29.616282, "lng": -82.362443
            },
            {
                "code": 453, "lat": 29.617383, "lng": -82.362563
            },
            {
                "code": 454, "lat": 29.619626, "lng": -82.362759
            },
            {
                "code": 452, "lat": 29.619737, "lng": -82.364763
            },
            {
                "code": 1321, "lat": 29.621161, "lng": -82.368827
            },
            {
                "code": 1322, "lat": 29.621652, "lng": -82.370304
            },
            {
                "code": 1300, "lat": 29.620509, "lng": -82.37289
            },
            {
                "code": 1301, "lat": 29.618519, "lng": -82.372697
            },
            {
                "code": 1302, "lat": 29.617702, "lng": -82.374701
            },
            {
                "code": 1303, "lat": 29.617731, "lng": -82.377702
            },
            {
                "code": 1304, "lat": 29.619737, "lng": -82.379486
            },
            {
                "code": 1305, "lat": 29.62194, "lng": -82.381149
            },
            {
                "code": 1547, "lat": 29.623133, "lng": -82.383786
            },
            {
                "code": 1549, "lat": 29.623194, "lng": -82.38657
            },
            {
                "code": 1493, "lat": 29.625154, "lng": -82.38789
            },
            {
                "code": 1555, "lat": 29.62766, "lng": -82.383124
            },
            {
                "code": 1557, "lat": 29.631626, "lng": -82.380875
            },
            {
                "code": 813, "lat": 29.634123, "lng": -82.382798
            },
            {
                "code": 814, "lat": 29.634482, "lng": -82.385207
            },
            {
                "code": 815, "lat": 29.635731, "lng": -82.38821
            },
            {
                "code": 816, "lat": 29.636959, "lng": -82.390186
            },
            {
                "code": 818, "lat": 29.641168, "lng": -82.39814
            },
            {
                "code": 819, "lat": 29.644808, "lng": -82.399307
            },
            {
                "code": 820, "lat": 29.646771, "lng": -82.400893
            },
            {
                "code": 821, "lat": 29.648195, "lng": -82.402049
            },
            {
                "code": 822, "lat": 29.649886, "lng": -82.406641
            },
            {
                "code": 823, "lat": 29.652416, "lng": -82.408796
            },
            {
                "code": 173, "lat": 29.653183, "lng": -82.410996
            }
        ]
    };
    //Bus 75 bus stops
    var bus75 = {
        "businfo": [
            {
                "code": 173, "lat": 29.653183, "lng": -82.410996
            },
            {
                "code": 174, "lat": 29.655878, "lng": -82.408766
            },
            {
                "code": 175, "lat": 29.658046, "lng": -82.408785
            },
            {
                "code": 1098, "lat": 29.659741, "lng": -82.412015
            },
            {
                "code": 1099, "lat": 29.659774, "lng": -82.41348
            },
            {
                "code": 1100, "lat": 29.659768, "lng": -82.415987
            },
            {
                "code": 1101, "lat": 29.658161, "lng": -82.422467
            },
            {
                "code": 1102, "lat": 29.655414, "lng": -82.422488
            },
            {
                "code": 1103, "lat": 29.653548, "lng": -82.422532
            },
            {
                "code": 1104, "lat": 29.651869, "lng": -82.422534
            },
            {
                "code": 1105, "lat": 29.648149, "lng": -82.422466
            },
            {
                "code": 1072, "lat": 29.645065, "lng": -82.421338
            },
            {
                "code": 1074, "lat": 29.646139, "lng": -82.417689
            },
            {
                "code": 1077, "lat": 29.646606, "lng": -82.414578
            },
            {
                "code": 1078, "lat": 29.645268, "lng": -82.414515
            },
            {
                "code": 1079, "lat": 29.645152, "lng": -82.41687
            },
            {
                "code": 1081, "lat": 29.645196, "lng": -82.42141
            },
            {
                "code": 1106, "lat": 29.642686, "lng": -82.422558
            },
            {
                "code": 1108, "lat": 29.635012, "lng": -82.42249
            },
            {
                "code": 1051, "lat": 29.630459, "lng": -82.421341
            },
            {
                "code": 1053, "lat": 29.630901, "lng": -82.418044
            },
            {
                "code": 1054, "lat": 29.634887, "lng": -82.414195
            },
            {
                "code": 1055, "lat": 29.639213, "lng": -82.410517
            },
            {
                "code": 1056, "lat": 29.640571, "lng": -82.407144
            },
            {
                "code": 1057, "lat": 29.643171, "lng": -82.408231
            },
            {
                "code": 1058, "lat": 29.644556, "lng": -82.409203
            },
            {
                "code": 1059, "lat": 29.644725, "lng": -82.411549
            },
            {
                "code": 1061, "lat": 29.644718, "lng": -82.41056
            },
            {
                "code": 1062, "lat": 29.643054, "lng": -82.408176
            },
            {
                "code": 1063, "lat": 29.640457, "lng": -82.407225
            },
            {
                "code": 1064, "lat": 29.63936, "lng": -82.41055
            },
            {
                "code": 1065, "lat": 29.634802, "lng": -82.414357
            },
            {
                "code": 1066, "lat": 29.631011, "lng": -82.418057
            },
            {
                "code": 1067, "lat": 29.630587, "lng": -82.420423
            },
            {
                "code": 1109, "lat": 29.628917, "lng": -82.422593
            },
            {
                "code": 1110, "lat": 29.626073, "lng": -82.42252
            },
            {
                "code": 1111, "lat": 29.620922, "lng": -82.422609
            },
            {
                "code": 1112, "lat": 29.615536, "lng": -82.4226
            },
            {
                "code": 1113, "lat": 29.612392, "lng": -82.422577
            },
            {
                "code": 1114, "lat": 29.609447, "lng": -82.422605
            },
            {
                "code": 1115, "lat": 29.60622, "lng": -82.42273
            },
            {
                "code": 1116, "lat": 29.604281, "lng": -82.422721
            },
            {
                "code": 1117, "lat": 29.600647, "lng": -82.421468
            },
            {
                "code": 1118, "lat": 29.600221, "lng": -82.418521
            },
            {
                "code": 1119, "lat": 29.601681, "lng": -82.415682
            },
            {
                "code": 1120, "lat": 29.603054, "lng": -82.413065
            },
            {
                "code": 1121, "lat": 29.605073, "lng": -82.409212
            },
            {
                "code": 1122, "lat": 29.607018, "lng": -82.405613
            },
            {
                "code": 1123, "lat": 29.608152, "lng": -82.403389
            },
            {
                "code": 1124, "lat": 29.609276, "lng": -82.40128
            },
            {
                "code": 1125, "lat": 29.611973, "lng": -82.396169
            },
            {
                "code": 1126, "lat": 29.61314, "lng": -82.393955
            },
            {
                "code": 1127, "lat": 29.61475, "lng": -82.390687
            },
            {
                "code": 1128, "lat": 29.615798, "lng": -82.388658
            },
            {
                "code": 1129, "lat": 29.618326, "lng": -82.383769
            },
            {
                "code": 1130, "lat": 29.619186, "lng": -82.382248
            },
            {
                "code": 1305, "lat": 29.62194, "lng": -82.381149
            },
            {
                "code": 1547, "lat": 29.623133, "lng": -82.383786
            },
            {
                "code": 1549, "lat": 29.623194, "lng": -82.38657
            },
            {
                "code": 1350, "lat": 29.624064, "lng": -82.386675
            },
            {
                "code": 1493, "lat": 29.625154, "lng": -82.38789
            },
            {
                "code": 1565, "lat": 29.625705, "lng": -82.387354
            },
            {
                "code": 1349, "lat": 29.623016, "lng": -82.385719
            },
            {
                "code": 1548, "lat": 29.622999, "lng": -82.383453
            },
            {
                "code": 1027, "lat": 29.621328, "lng": -82.380919
            },
            {
                "code": 1028, "lat": 29.620111, "lng": -82.381097
            },
            {
                "code": 1249, "lat": 29.61945, "lng": -82.382416
            },
            {
                "code": 1250, "lat": 29.61596, "lng": -82.388989
            },
            {
                "code": 1251, "lat": 29.615169, "lng": -82.390515
            },
            {
                "code": 1252, "lat": 29.613287, "lng": -82.394175
            },
            {
                "code": 1033, "lat": 29.612116, "lng": -82.396338
            },
            {
                "code": 1034, "lat": 29.609439, "lng": -82.401489
            },
            {
                "code": 1035, "lat": 29.608679, "lng": -82.402942
            },
            {
                "code": 1036, "lat": 29.607295, "lng": -82.405553
            },
            {
                "code": 1038, "lat": 29.605489, "lng": -82.408933
            },
            {
                "code": 1039, "lat": 29.603408, "lng": -82.412933
            },
            {
                "code": 1040, "lat": 29.602111, "lng": -82.415406
            },
            {
                "code": 1041, "lat": 29.600403, "lng": -82.418594
            },
            {
                "code": 1042, "lat": 29.600168, "lng": -82.420515
            },
            {
                "code": 1043, "lat": 29.603688, "lng": -82.422575
            },
            {
                "code": 1044, "lat": 29.607026, "lng": -82.42254
            },
            {
                "code": 1045, "lat": 29.609508, "lng": -82.422512
            },
            {
                "code": 1046, "lat": 29.612398, "lng": -82.4225
            },
            {
                "code": 1047, "lat": 29.614907, "lng": -82.422598
            },
            {
                "code": 1048, "lat": 29.619511, "lng": -82.422598
            },
            {
                "code": 1049, "lat": 29.626101, "lng": -82.422476
            },
            {
                "code": 1050, "lat": 29.628397, "lng": -82.422371
            },
            {
                "code": 1068, "lat": 29.6312, "lng": -82.422377
            },
            {
                "code": 1069, "lat": 29.635495, "lng": -82.422409
            },
            {
                "code": 1071, "lat": 29.642605, "lng": -82.422383
            },
            {
                "code": 1082, "lat": 29.645945, "lng": -82.422326
            },
            {
                "code": 1084, "lat": 29.650712, "lng": -82.422348
            },
            {
                "code": 1085, "lat": 29.65307, "lng": -82.422247
            },
            {
                "code": 1087, "lat": 29.653263, "lng": -82.418623
            },
            {
                "code": 1089, "lat": 29.653187, "lng": -82.414991
            },
            {
                "code": 1091, "lat": 29.656182, "lng": -82.418499
            },
            {
                "code": 1093, "lat": 29.656295, "lng": -82.421376
            },
            {
                "code": 1094, "lat": 29.659342, "lng": -82.422241
            },
            {
                "code": 1096, "lat": 29.659467, "lng": -82.416029
            },
            {
                "code": 1097, "lat": 29.659514, "lng": -82.413875
            },
            {
                "code": 171, "lat": 29.656865, "lng": -82.408931
            },
            {
                "code": 172, "lat": 29.654364, "lng": -82.408945
            },
            {
                "code": 173, "lat": 29.653183, "lng": -82.410996
            }
        ]
    };
    //Bus 76 bus stops
    var bus76 = {
        "businfo": [
            {
                "code": 520, "lat": 29.679605, "lng": -82.431858
            },
            {
                "code": 521, "lat": 29.67778, "lng": -82.430533
            },
            {
                "code": 522, "lat": 29.674223, "lng": -82.428413
            },
            {
                "code": 523, "lat": 29.674075, "lng": -82.425183
            },
            {
                "code": 524, "lat": 29.674222, "lng": -82.418182
            },
            {
                "code": 525, "lat": 29.674199, "lng": -82.415181
            },
            {
                "code": 526, "lat": 29.674173, "lng": -82.41037
            },
            {
                "code": 528, "lat": 29.674006, "lng": -82.401845
            },
            {
                "code": 1394, "lat": 29.664908, "lng": -82.401618
            },
            {
                "code": 1395, "lat": 29.660832, "lng": -82.401583
            },
            {
                "code": 170, "lat": 29.659731, "lng": -82.403419
            },
            {
                "code": 171, "lat": 29.656865, "lng": -82.408931
            },
            {
                "code": 172, "lat": 29.654364, "lng": -82.408945
            },
            {
                "code": 824, "lat": 29.651658, "lng": -82.408971
            },
            {
                "code": 825, "lat": 29.650037, "lng": -82.407738
            },
            {
                "code": 826, "lat": 29.647812, "lng": -82.401864
            },
            {
                "code": 827, "lat": 29.646326, "lng": -82.400655
            },
            {
                "code": 828, "lat": 29.644417, "lng": -82.399106
            },
            {
                "code": 829, "lat": 29.641554, "lng": -82.398333
            },
            {
                "code": 1396, "lat": 29.640003, "lng": -82.406526
            },
            {
                "code": 1064, "lat": 29.63936, "lng": -82.41055
            },
            {
                "code": 1065, "lat": 29.634802, "lng": -82.414357
            },
            {
                "code": 1066, "lat": 29.631011, "lng": -82.418057
            },
            {
                "code": 1067, "lat": 29.630587, "lng": -82.420423
            },
            {
                "code": 1398, "lat": 29.630617, "lng": -82.423787
            },
            {
                "code": 1400, "lat": 29.630607, "lng": -82.431858
            },
            {
                "code": 1401, "lat": 29.62965, "lng": -82.434958
            },
            {
                "code": 1402, "lat": 29.628342, "lng": -82.436419
            },
            {
                "code": 1403, "lat": 29.628824, "lng": -82.438395
            },
            {
                "code": 1405, "lat": 29.630536, "lng": -82.432402
            },
            {
                "code": 1407, "lat": 29.630424, "lng": -82.423632
            },
            {
                "code": 1051, "lat": 29.630459, "lng": -82.421341
            },
            {
                "code": 1053, "lat": 29.630901, "lng": -82.418044
            },
            {
                "code": 1054, "lat": 29.634887, "lng": -82.414195
            },
            {
                "code": 1055, "lat": 29.639213, "lng": -82.410517
            },
            {
                "code": 1397, "lat": 29.63988, "lng": -82.40643
            },
            {
                "code": 818, "lat": 29.641168, "lng": -82.39814
            },
            {
                "code": 819, "lat": 29.644808, "lng": -82.399307
            },
            {
                "code": 820, "lat": 29.646771, "lng": -82.400893
            },
            {
                "code": 821, "lat": 29.648195, "lng": -82.402049
            },
            {
                "code": 822, "lat": 29.649886, "lng": -82.406641
            },
            {
                "code": 823, "lat": 29.652416, "lng": -82.408796
            },
            {
                "code": 174, "lat": 29.655878, "lng": -82.408766
            },
            {
                "code": 175, "lat": 29.630901, "lng": -82.418044
            },
            {
                "code": 176, "lat": 29.659464, "lng": -82.407681
            },
            {
                "code": 1392, "lat": 29.661038, "lng": -82.401491
            },
            {
                "code": 1393, "lat": 29.665237, "lng": -82.401437
            },
            {
                "code": 512, "lat": 29.674154, "lng": -82.402288
            },
            {
                "code": 514, "lat": 29.67424, "lng": -82.410596
            },
            {
                "code": 515, "lat": 29.67427, "lng": -82.415178
            },
            {
                "code": 516, "lat": 29.67427, "lng": -82.417999
            },
            {
                "code": 517, "lat": 29.674186, "lng": -82.425058
            },
            {
                "code": 518, "lat": 29.675243, "lng": -82.430108
            },
            {
                "code": 520, "lat": 29.679605, "lng": -82.431858
            }
        ]
    };
    //Bus 1 bus stops
    var bus1 = {
        "businfo": [
            {
                "code": 001, "lat": 29.645695, "lng": -82.322634
            },
            {
                "code": 1206, "lat": 29.649518, "lng": -82.322319
            },
            {
                "code": 002, "lat": 29.650346, "lng": -82.323804
            },
            {
                "code": 003, "lat": 29.650397, "lng": -82.326459
            },
            {
                "code": 004, "lat": 29.650325, "lng": -82.329674
            },
            {
                "code": 006, "lat": 29.650335, "lng": -82.33279
            },
            {
                "code": 007, "lat": 29.650314, "lng": -82.334603
            },
            {
                "code": 008, "lat": 29.649574, "lng": -82.337179
            },
            {
                "code": 009, "lat": 29.648033, "lng": -82.337151
            },
            {
                "code": 011, "lat": 29.64512, "lng": -82.337119
            },
            {
                "code": 012, "lat": 29.644956, "lng": -82.338095
            },
            {
                "code": 013, "lat": 29.64486, "lng": -82.340088
            },
            {
                "code": 014, "lat": 29.644941, "lng": -82.344997
            },
            {
                "code": 015, "lat": 29.643904, "lng": -82.34701
            },
            {
                "code": 016, "lat": 29.640202, "lng": -82.346288
            },
            {
                "code": 017, "lat": 29.63884, "lng": -82.346268
            },
            {
                "code": 018, "lat": 29.636965, "lng": -82.349826
            },
            {
                "code": 020, "lat": 29.633928, "lng": -82.35865
            },
            {
                "code": 022, "lat": 29.632046, "lng": -82.362534
            },
            {
                "code": 023, "lat": 29.63054, "lng": -82.365763
            },
            {
                "code": 024, "lat": 29.629562, "lng": -82.367818
            },
            {
                "code": 025, "lat": 29.62775, "lng": -82.371529
            },
            {
                "code": 026, "lat": 29.625604, "lng": -82.374394
            },
            {
                "code": 027, "lat": 29.623771, "lng": -82.376049
            },
            {
                "code": 028, "lat": 29.624804, "lng": -82.377613
            },
            {
                "code": 029, "lat": 29.625586, "lng": -82.379062
            },
            {
                "code": 1492, "lat": 29.623861, "lng": -82.381311
            },
            {
                "code": 1547, "lat": 29.623133, "lng": -82.383786
            },
            {
                "code": 1549, "lat": 29.623194, "lng": -82.38657
            },
            {
                "code": 1350, "lat": 29.624064, "lng": -82.386675
            },
            {
                "code": 1493, "lat": 29.625154, "lng": -82.38789
            },
            {
                "code": 9999, "lat": 29.625705, "lng": -82.387354
            },
            {
                "code": 1349, "lat": 29.623016, "lng": -82.385719
            },
            {
                "code": 1548, "lat": 29.622999, "lng": -82.383453
            },
            {
                "code": 1491, "lat": 29.623953, "lng": -82.380799
            },
            {
                "code": 030, "lat": 29.625914, "lng": -82.379059
            },
            {
                "code": 031, "lat": 29.62774, "lng": -82.377674
            },
            {
                "code": 033, "lat": 29.628167, "lng": -82.374291
            },
            {
                "code": 034, "lat": 29.627555, "lng": -82.371179
            },
            {
                "code": 035, "lat": 29.629102, "lng": -82.368184
            },
            {
                "code": 036, "lat": 29.629747, "lng": -82.366625
            },
            {
                "code": 037, "lat": 29.630404, "lng": -82.365328
            },
            {
                "code": 038, "lat": 29.63196, "lng": -82.361997
            },
            {
                "code": 039, "lat": 29.633715, "lng": -82.35815
            },
            {
                "code": 040, "lat": 29.636402, "lng": -82.350912
            },
            {
                "code": 041, "lat": 29.639054, "lng": -82.346141
            },
            {
                "code": 042, "lat": 29.640847, "lng": -82.34609
            },
            {
                "code": 043, "lat": 29.64436, "lng": -82.346853
            },
            {
                "code": 045, "lat": 29.644804, "lng": -82.343071
            },
            {
                "code": 046, "lat": 29.644706, "lng": -82.340791
            },
            {
                "code": 047, "lat": 29.644854, "lng": -82.337808
            },
            {
                "code": 048, "lat": 29.646027, "lng": -82.337023
            },
            {
                "code": 050, "lat": 29.648187, "lng": -82.337075
            },
            {
                "code": 051, "lat": 29.649701, "lng": -82.337048
            },
            {
                "code": 052, "lat": 29.650154, "lng": -82.33541
            },
            {
                "code": 053, "lat": 29.650247, "lng": -82.332081
            },
            {
                "code": 055, "lat": 29.650198, "lng": -82.329901
            },
            {
                "code": 056, "lat": 29.650203, "lng": -82.326684
            },
            {
                "code": 1290, "lat": 29.650241, "lng": -82.325138
            },
            {
                "code": 057, "lat": 29.650215, "lng": -82.324131
            },
            {
                "code": 1216, "lat": 29.649751, "lng": -82.322448
            },
            {
                "code": 001, "lat": 29.645695, "lng": -82.322634
            }
        ]
    };
    //Bus 7 bus stops
    var bus7 = {
        "businfo": [
            {
                "code": 001, "lat": 29.645695, "lng": -82.322634
            },
            {
                "code": 292, "lat": 29.645772, "lng": -82.315216
            },
            {
                "code": 293, "lat": 29.645758, "lng": -82.312416
            },
            {
                "code": 294, "lat": 29.645728, "lng": -82.310869
            },
            {
                "code": 295, "lat": 29.64573, "lng": -82.308937
            },
            {
                "code": 297, "lat": 29.645724, "lng": -82.306015
            },
            {
                "code": 096, "lat": 29.648794, "lng": -82.305822
            },
            {
                "code": 300, "lat": 29.650775, "lng": -82.305763
            },
            {
                "code": 301, "lat": 29.651804, "lng": -82.304736
            },
            {
                "code": 303, "lat": 29.651841, "lng": -82.301258
            },
            {
                "code": 304, "lat": 29.651799, "lng": -82.297724
            },
            {
                "code": 306, "lat": 29.651775, "lng": -82.293739
            },
            {
                "code": 1553, "lat": 29.649168, "lng": -82.293379
            },
            {
                "code": 108, "lat": 29.646145, "lng": -82.293897
            },
            {
                "code": 307, "lat": 29.644997, "lng": -82.293838
            },
            {
                "code": 308, "lat": 29.643874, "lng": -82.291542
            },
            {
                "code": 309, "lat": 29.64283, "lng": -82.289449
            },
            {
                "code": 311, "lat": 29.637069, "lng": -82.289243
            },
            {
                "code": 312, "lat": 29.634589, "lng": -82.289253
            },
            {
                "code": 313, "lat": 29.632589, "lng": -82.288082
            },
            {
                "code": 314, "lat": 29.632585, "lng": -82.285681
            },
            {
                "code": 315, "lat": 29.632605, "lng": -82.2837
            },
            {
                "code": 317, "lat": 29.634716, "lng": -82.280751
            },
            {
                "code": 319, "lat": 29.636671, "lng": -82.28069
            },
            {
                "code": 320, "lat": 29.638733, "lng": -82.280693
            },
            {
                "code": 322, "lat": 29.636666, "lng": -82.275829
            },
            {
                "code": 323, "lat": 29.636216, "lng": -82.272412
            },
            {
                "code": 324, "lat": 29.639894, "lng": -82.272461
            },
            {
                "code": 325, "lat": 29.6419, "lng": -82.27242
            },
            {
                "code": 326, "lat": 29.642474, "lng": -82.271429
            },
            {
                "code": 9997, "lat": 29.643234, "lng": -82.272516
            },
            {
                "code": 327, "lat": 29.642186, "lng": -82.272547
            },
            {
                "code": 329, "lat": 29.636223, "lng": -82.272559
            },
            {
                "code": 330, "lat": 29.636919, "lng": -82.275702
            },
            {
                "code": 331, "lat": 29.638623, "lng": -82.280846
            },
            {
                "code": 332, "lat": 29.636636, "lng": -82.280843
            },
            {
                "code": 333, "lat": 29.634792, "lng": -82.280864
            },
            {
                "code": 334, "lat": 29.63276, "lng": -82.28088
            },
            {
                "code": 335, "lat": 29.632664, "lng": -82.283656
            },
            {
                "code": 337, "lat": 29.632697, "lng": -82.289072
            },
            {
                "code": 338, "lat": 29.634861, "lng": -82.289182
            },
            {
                "code": 341, "lat": 29.641906, "lng": -82.289168
            },
            {
                "code": 342, "lat": 29.644029, "lng": -82.29138
            },
            {
                "code": 343, "lat": 29.645217, "lng": -82.293702
            },
            {
                "code": 101, "lat": 29.646124, "lng": -82.293773
            },
            {
                "code": 102, "lat": 29.649163, "lng": -82.293221
            },
            {
                "code": 107, "lat": 29.649086, "lng": -82.294941
            },
            {
                "code": 103, "lat": 29.651128, "lng": -82.293201
            },
            {
                "code": 345, "lat": 29.652004, "lng": -82.294232
            },
            {
                "code": 346, "lat": 29.652022, "lng": -82.297479
            },
            {
                "code": 347, "lat": 29.651985, "lng": -82.301537
            },
            {
                "code": 349, "lat": 29.652003, "lng": -82.304304
            },
            {
                "code": 350, "lat": 29.650506, "lng": -82.305928
            },
            {
                "code": 111, "lat": 29.648383, "lng": -82.305943
            },
            {
                "code": 113, "lat": 29.645997, "lng": -82.305961
            },
            {
                "code": 115, "lat": 29.645817, "lng": -82.309512
            },
            {
                "code": 116, "lat": 29.645802, "lng": -82.311005
            },
            {
                "code": 358, "lat": 29.645824, "lng": -82.315039
            },
            {
                "code": 001, "lat": 29.645695, "lng": -82.322634
            }
        ]
    };
    //Sets up bus route display
    directionsDisplay20 = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "blue" }
    });
    directionsDisplay20x = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "blue" }
    });
    directionsDisplay20y = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "blue" }
    });
    directionsDisplay62 = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "orange" }
    });
    directionsDisplay62x = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "orange" }
    });
    directionsDisplay62y = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "orange" }
    });
    directionsDisplay75 = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "grey" }
    });
    directionsDisplay75x = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "grey" }
    });
    directionsDisplay75y = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "grey" }
    });
    directionsDisplay75z = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "grey" }
    });
    directionsDisplay75w = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "grey" }
    });
    directionsDisplay76 = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "pink" }
    });
    directionsDisplay76x = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "pink" }
    });
    directionsDisplay76y = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "pink" }
    });
    directionsDisplay1 = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "green" }
    });
    directionsDisplay1x = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "green" }
    });
    directionsDisplay1y = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "green" }
    });
    directionsDisplay7 = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "red" }
    });
    directionsDisplay7x = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "red" }
    });
    directionsDisplay7y = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: { strokeColor: "red" }
    });
    // Bus 20 Markers and bus route id 4001214
    var busmarker20, busmarker62, busmarker75, busmarker76, busmarker1, busmarker7;
    var busIcon = {
        url: busImage,
        scaledSize: new google.maps.Size(13, 13),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };
    //Sets displays to map and removes unnessesary markers
    directionsDisplay20.setMap(map);
    directionsDisplay20.setOptions({ suppressMarkers: true });
    directionsDisplay20x.setMap(map);
    directionsDisplay20x.setOptions({ suppressMarkers: true });
    directionsDisplay20y.setMap(map);
    directionsDisplay20y.setOptions({ suppressMarkers: true });
    directionsDisplay62.setMap(map);
    directionsDisplay62.setOptions({ suppressMarkers: true });
    directionsDisplay62x.setMap(map);
    directionsDisplay62x.setOptions({ suppressMarkers: true });
    directionsDisplay62y.setMap(map);
    directionsDisplay62y.setOptions({ suppressMarkers: true });
    directionsDisplay75.setMap(map);
    directionsDisplay75.setOptions({ suppressMarkers: true });
    directionsDisplay75x.setMap(map);
    directionsDisplay75x.setOptions({ suppressMarkers: true });
    directionsDisplay75y.setMap(map);
    directionsDisplay75y.setOptions({ suppressMarkers: true });
    directionsDisplay75z.setMap(map);
    directionsDisplay75z.setOptions({ suppressMarkers: true });
    directionsDisplay75w.setMap(map);
    directionsDisplay75w.setOptions({ suppressMarkers: true });
    directionsDisplay76.setMap(map);
    directionsDisplay76.setOptions({ suppressMarkers: true });
    directionsDisplay76x.setMap(map);
    directionsDisplay76x.setOptions({ suppressMarkers: true });
    directionsDisplay76y.setMap(map);
    directionsDisplay76y.setOptions({ suppressMarkers: true });
    directionsDisplay1.setMap(map);
    directionsDisplay1.setOptions({ suppressMarkers: true });
    directionsDisplay1x.setMap(map);
    directionsDisplay1x.setOptions({ suppressMarkers: true });
    directionsDisplay1y.setMap(map);
    directionsDisplay1y.setOptions({ suppressMarkers: true });
    directionsDisplay7.setMap(map);
    directionsDisplay7.setOptions({ suppressMarkers: true });
    directionsDisplay7x.setMap(map);
    directionsDisplay7x.setOptions({ suppressMarkers: true });
    directionsDisplay7y.setMap(map);
    directionsDisplay7y.setOptions( { suppressMarkers: true } );
    //each of these set of for loops creates markers for the bus stops and pushes them into arrays by pair
     var x20 = 0, y20 = 0;
        request20 = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = 0; i < bus20.businfo.length-30; i++){
            busmarker20 =  new google.maps.Marker({
                position: new google.maps.LatLng(bus20.businfo[i].lat, bus20.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers1.push(busmarker20);
            x20++;
            if (i == 0) request20.origin = busmarker20.getPosition();
            else if (i == bus20.businfo.length - 31) request20.destination = busmarker20.getPosition();
            else{
                 if(!request20.waypoints) request20.waypoints = [];
                 request20.waypoints.push({
                     location: busmarker20.getPosition(),
                     stopover: true
                 });
             }
        }
       //
        var busmarker20x;
        request20x = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = x20; i < bus20.businfo.length-5; i++){
            busmarker20x =  new google.maps.Marker({
                position: new google.maps.LatLng(bus20.businfo[i].lat, bus20.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers1.push(busmarker20x);
            y20++;
            if (i == x20) request20x.origin = busmarker20x.getPosition();
            else if (i == bus20.businfo.length - 6) request20x.destination = busmarker20x.getPosition();
            else{
                if(!request20x.waypoints) request20x.waypoints = [];
                request20x.waypoints.push({
                    location: busmarker20x.getPosition(),
                    stopover: true
                });
            }
        }
          //
        y20 = y20 +x20;
        var busmarker20y;
        request20y = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = y20; i < bus20.businfo.length; i++){
            busmarker20y =  new google.maps.Marker({
                position: new google.maps.LatLng(bus20.businfo[i].lat, bus20.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers1.push(busmarker20y);
            if (i == y20) request20y.origin = busmarker20y.getPosition();
            else if (i == bus20.businfo.length - 1) request20y.destination = busmarker20y.getPosition();
            else{
                if(!request20y.waypoints) request20y.waypoints = [];
                request20y.waypoints.push({
                    location: busmarker20y.getPosition(),
                    stopover: true
                });
            }
        }
        // Bus 62 markers and route id 4008446
        var x62 = 0, y62 = 0;
        request62 = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = 0; i < bus62.businfo.length-37; i++){
            busmarker62 =  new google.maps.Marker({
                position: new google.maps.LatLng(bus62.businfo[i].lat, bus62.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers1.push(busmarker62);
            x62++;
            if (i == 0) request62.origin = busmarker62.getPosition();
            else if (i == bus62.businfo.length - 38) request62.destination = busmarker62.getPosition();
            else{
                 if(!request62.waypoints) request62.waypoints = [];
                 request62.waypoints.push({
                     location: busmarker62.getPosition(),
                     stopover: true
                 });
             }
        }
       //
        var busmarker62x;
        request62x = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = x62; i < bus62.businfo.length-12; i++){
            busmarker62x =  new google.maps.Marker({
                position: new google.maps.LatLng(bus62.businfo[i].lat, bus62.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers1.push(busmarker62x);
            y62++;
            if (i == x62) request62x.origin = busmarker62x.getPosition();
            else if (i == bus62.businfo.length - 13) request62x.destination = busmarker62x.getPosition();
            else{
                if(!request62x.waypoints) request62x.waypoints = [];
                request62x.waypoints.push({
                    location: busmarker62x.getPosition(),
                    stopover: true
                });
            }
        }
          //
        y62 = y62 +x62;
        var busmarker62y;
        request62y = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = y62; i < bus62.businfo.length; i++){
            busmarker62y =  new google.maps.Marker({
                position: new google.maps.LatLng(bus62.businfo[i].lat, bus62.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers1.push(busmarker62y);
            if (i == y62) request62y.origin = busmarker62y.getPosition();
            else if (i == bus62.businfo.length - 1) request62y.destination = busmarker62y.getPosition();
            else{
                if(!request62y.waypoints) request62y.waypoints = [];
                request62y.waypoints.push({
                    location: busmarker62y.getPosition(),
                    stopover: true
                });
            }
        }
        // Bus 75 markers and route id 4001290
        var x75 = 0, y75 = 0, z75 = 0, w75 =0;
        request75 = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = 0; i < bus75.businfo.length-78; i++){
            busmarker75 =  new google.maps.Marker({
                position: new google.maps.LatLng(bus75.businfo[i].lat, bus75.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers2.push(busmarker75);
            x75++;
            if (i == 0) request75.origin = busmarker75.getPosition();
            else if (i == bus75.businfo.length - 79) request75.destination = busmarker75.getPosition();
            else{
                 if(!request75.waypoints) request75.waypoints = [];
                 request75.waypoints.push({
                     location: busmarker75.getPosition(),
                     stopover: true
                 });
             }
        }
       //
        var busmarker75x;
        request75x = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = x75; i < bus75.businfo.length-53; i++){
            busmarker75x =  new google.maps.Marker({
                position: new google.maps.LatLng(bus75.businfo[i].lat, bus75.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers2.push(busmarker75x);
            y75++;
            if (i == x75) request75x.origin = busmarker75x.getPosition();
            else if (i == bus75.businfo.length - 54) request75x.destination = busmarker75x.getPosition();
            else{
                if(!request75x.waypoints) request75x.waypoints = [];
                request75x.waypoints.push({
                    location: busmarker75x.getPosition(),
                    stopover: true
                });
            }
        }
          //
        y75 = y75 +x75;
        var busmarker75y;
        request75y = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = y75; i < bus75.businfo.length-28; i++){
            busmarker75y =  new google.maps.Marker({
                position: new google.maps.LatLng(bus75.businfo[i].lat, bus75.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers2.push(busmarker75y);
            z75++;
            if (i == y75) request75y.origin = busmarker75y.getPosition();
            else if (i == bus75.businfo.length - 29) request75y.destination = busmarker75y.getPosition();
            else{
                if(!request75y.waypoints) request75y.waypoints = [];
                request75y.waypoints.push({
                    location: busmarker75y.getPosition(),
                    stopover: true
                });
            }
        }
        z75 = y75 +z75;
        var busmarker75z;
        request75z = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = z75; i < bus75.businfo.length-3; i++){
            busmarker75z =  new google.maps.Marker({
                position: new google.maps.LatLng(bus75.businfo[i].lat, bus75.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers2.push(busmarker75z);
            w75++;
            if (i == z75) request75z.origin = busmarker75z.getPosition();
            else if (i == bus75.businfo.length - 4) request75z.destination = busmarker75z.getPosition();
            else{
                if(!request75z.waypoints) request75z.waypoints = [];
                request75z.waypoints.push({
                    location: busmarker75z.getPosition(),
                    stopover: true
                });
            }
        }
        w75 = z75 +w75;
          var busmarker75w;
          request75w = {
              travelMode: google.maps.TravelMode.DRIVING
          };
          for(i = w75; i < bus75.businfo.length; i++){
              busmarker75w =  new google.maps.Marker({
                  position: new google.maps.LatLng(bus75.businfo[i].lat, bus75.businfo[i].lng),
                  map: map,
                  icon: busIcon
              });
              busstopmarkers2.push(busmarker75w);
              if (i == w75) request75w.origin = busmarker75w.getPosition();
              else if (i == bus75.businfo.length - 1) request75w.destination = busmarker75w.getPosition();
              else{
                  if(!request75w.waypoints) request75w.waypoints = [];
                  request75w.waypoints.push({
                      location: busmarker75w.getPosition(),
                      stopover: true
                  });
              }
          }
        // Bus 76 markers and route id 4008444
        var x76 = 0, y76 = 0;
        request76 = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = 0; i < bus76.businfo.length-29; i++){
            busmarker76 =  new google.maps.Marker({
                position: new google.maps.LatLng(bus76.businfo[i].lat, bus76.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers2.push(busmarker76);
            x76++;
            if (i == 0) request76.origin = busmarker76.getPosition();
            else if (i == bus76.businfo.length - 30) request76.destination = busmarker76.getPosition();
            else{
                if(!request76.waypoints) request76.waypoints = [];
                request76.waypoints.push({
                    location: busmarker76.getPosition(),
                    stopover: true
                });
            }
        }
       //
        var busmarker76x;
        request76x = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = x76; i < bus76.businfo.length-4; i++){
            busmarker76x =  new google.maps.Marker({
                position: new google.maps.LatLng(bus76.businfo[i].lat, bus76.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers2.push(busmarker76x);
            y76++;
            if (i == x76) request76x.origin = busmarker76x.getPosition();
            else if (i == bus76.businfo.length - 5) request76x.destination = busmarker76x.getPosition();
            else{
                if(!request76x.waypoints) request76x.waypoints = [];
                request76x.waypoints.push({
                    location: busmarker76x.getPosition(),
                    stopover: true
                });
            }
        }
          //
        y76 = y76 +x76;
        var busmarker76y;
        request76y = {
            travelMode: google.maps.TravelMode.DRIVING
        };

        for(i = y76; i < bus76.businfo.length; i++){
            busmarker76y =  new google.maps.Marker({
                position: new google.maps.LatLng(bus76.businfo[i].lat, bus76.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers2.push(busmarker76y);
            if (i == y76) request76y.origin = busmarker76y.getPosition();
            else if (i == bus76.businfo.length - 1) request76y.destination = busmarker76y.getPosition();
            else{
                if(!request76y.waypoints) request76y.waypoints = [];
                request76y.waypoints.push({
                    location: busmarker76y.getPosition(),
                    stopover: true
                });
            }
        }
        // Bus 1 markers and route id 4001150
        var x1 = 0, y1 = 0;
        request1 = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = 0; i < bus1.businfo.length-37; i++){
            busmarker1 =  new google.maps.Marker({
                position: new google.maps.LatLng(bus1.businfo[i].lat, bus1.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers3.push(busmarker1);
            x1++;
            if (i == 0) request1.origin = busmarker1.getPosition();
            else if (i == bus1.businfo.length - 38) request1.destination = busmarker1.getPosition();
            else{
                if(!request1.waypoints) request1.waypoints = [];
                request1.waypoints.push({
                    location: busmarker1.getPosition(),
                    stopover: true
                });
            }
        }
       //
        var busmarker1x;
        request1x = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = x1-1; i < bus1.businfo.length-13; i++){
            busmarker1x =  new google.maps.Marker({
                position: new google.maps.LatLng(bus1.businfo[i].lat, bus1.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers3.push(busmarker1x);
            y1++;
            if (i == x1-1) request1x.origin = busmarker1x.getPosition();
            else if (i == bus1.businfo.length - 14) request1x.destination = busmarker1x.getPosition();
            else{
                if(!request1x.waypoints) request1x.waypoints = [];
                request1x.waypoints.push({
                    location: busmarker1x.getPosition(),
                    stopover: true
                });
            }
        }
          //
        y1 = y1 +x1;
        var busmarker1y;
        request1y = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = y1; i < bus1.businfo.length; i++){
            busmarker1y =  new google.maps.Marker({
                position: new google.maps.LatLng(bus1.businfo[i].lat, bus1.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers3.push(busmarker1y);
            if (i == y1) request1y.origin = busmarker1y.getPosition();
            else if (i == bus1.businfo.length - 1) request1y.destination = busmarker1y.getPosition();
            else{
                if(!request1y.waypoints) request1y.waypoints = [];
                request1y.waypoints.push({
                    location: busmarker1y.getPosition(),
                    stopover: true
                });
            }
        }
        // Bus 7 markers and route id 4001286
        var x7 = 0, y7 = 0;
        request7 = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = 0; i < bus7.businfo.length-37; i++){
            busmarker7 =  new google.maps.Marker({
                position: new google.maps.LatLng(bus7.businfo[i].lat, bus7.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers3.push(busmarker7);
            x7++;
            if (i == 0) request7.origin = busmarker7.getPosition();
            else if (i == bus7.businfo.length - 38) request7.destination = busmarker7.getPosition();
            else{
                if(!request7.waypoints) request7.waypoints = [];
                request7.waypoints.push({
                    location: busmarker7.getPosition(),
                    stopover: true
                });
            }
        }
       //
        var busmarker7x;
        request7x = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = x7; i < bus7.businfo.length-12; i++){
            busmarker7x =  new google.maps.Marker({
                position: new google.maps.LatLng(bus7.businfo[i].lat, bus7.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers3.push(busmarker7x);
            y7++;
            if (i == x7) request7x.origin = busmarker7x.getPosition();
            else if (i == bus7.businfo.length - 13) request7x.destination = busmarker7x.getPosition();
            else{
                if(!request7x.waypoints) request7x.waypoints = [];
                request7x.waypoints.push({
                    location: busmarker7x.getPosition(),
                    stopover: true
                });
            }
        }
          //
        y7 = y7 +x7;
        var busmarker7y;
        request7y = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for(i = y7; i < bus7.businfo.length; i++){
            busmarker7y =  new google.maps.Marker({
                position: new google.maps.LatLng(bus7.businfo[i].lat, bus7.businfo[i].lng),
                map: map,
                icon: busIcon
            });
            busstopmarkers3.push(busmarker7y);
            if (i == y7) request7y.origin = busmarker7y.getPosition();
            else if (i == bus7.businfo.length - 1) request7y.destination = busmarker7y.getPosition();
            else{
                if(!request7y.waypoints) request7y.waypoints = [];
                request7y.waypoints.push({
                    location: busmarker7y.getPosition(),
                    stopover: true
                });
            }
        }
        //makes all bus stops and routes disappear
        setBus(null, busstopmarkers1);
        setBus(null, busstopmarkers2);
        setBus(null, busstopmarkers3);
        directionsDisplay20.setMap(null);
        directionsDisplay20x.setMap(null);
        directionsDisplay20y.setMap(null);
        directionsDisplay62.setMap(null);
        directionsDisplay62x.setMap(null);
        directionsDisplay62y.setMap(null);
        directionsDisplay75.setMap(null);
        directionsDisplay75x.setMap(null);
        directionsDisplay75y.setMap(null);
        directionsDisplay75z.setMap(null);
        directionsDisplay75w.setMap(null);
        directionsDisplay76.setMap(null);
        directionsDisplay76x.setMap(null);
        directionsDisplay76y.setMap(null);
        directionsDisplay1.setMap(null);
        directionsDisplay1x.setMap(null);
        directionsDisplay1y.setMap(null);
        directionsDisplay7.setMap(null);
        directionsDisplay7x.setMap(null);
        directionsDisplay7y.setMap(null);
      }
//makes bus stops appear and disappear
function setBus(map, busarray) {
    for (var i = 0; i < busarray.length; i++) {
        busarray[i].setMap(map);
    }
}
//makes bus routes appear and disappear
function busstop() {
    if (busstopmarkers1[0].getMap() == null && busstopmarkers2[0].getMap() == null && busstopmarkers3[0].getMap() == null) {
        map.setZoom(13);
        map.setCenter(gainesville);
        document.getElementById("timeTable").style.display = "none";
    }
    else {
        document.getElementById("Instruction").innerHTML = '';
        setBus(null, busstopmarkers1);
        setBus(null, busstopmarkers2);
        setBus(null, busstopmarkers3);
        directionsDisplay20.setMap(null);
        directionsDisplay20x.setMap(null);
        directionsDisplay20y.setMap(null);
        directionsDisplay62.setMap(null);
        directionsDisplay62x.setMap(null);
        directionsDisplay62y.setMap(null);
        directionsDisplay75.setMap(null);
        directionsDisplay75x.setMap(null);
        directionsDisplay75y.setMap(null);
        directionsDisplay75z.setMap(null);
        directionsDisplay75w.setMap(null);
        directionsDisplay76.setMap(null);
        directionsDisplay76x.setMap(null);
        directionsDisplay76y.setMap(null);
        directionsDisplay1.setMap(null);
        directionsDisplay1x.setMap(null);
        directionsDisplay1y.setMap(null);
        directionsDisplay7.setMap(null);
        directionsDisplay7x.setMap(null);
        directionsDisplay7y.setMap(null);
        map.setZoom(13);
        map.setCenter(gainesville);
        document.getElementById("Instruction").innerHTML = '';
    }
}
//makes heatmap and its legend appear and disappear
function heatMapToggle(id) {
    var div = document.getElementById(id);
    div.style.display = div.style.display == "none" ? "block" : "none";
    var table = document.getElementById("heatTable");
    table.style.display = div.style.display;
    document.getElementById("timeTable").style.display = "none";
    document.getElementById("busRoutesTable").style.display = "none";
    document.getElementById('demoTable').style.display = 'none';
    if (heatmap.getMap() == null && div.style.display == "block") {
        heatmap.setMap(map);
        map.setZoom(13);
        document.getElementById("Instruction").innerHTML = '';
        map.setOptions({ minZoom: 13, maxZoom: 13 });
    }
    else {
        heatmap.setMap(null);
        document.getElementById("Instruction").innerHTML = '';
        map.setOptions({ minZoom: 11, maxZoom: 15 });
    }
}
//calculates travel times between hubs and apartments
var delayFactor = 0;
function calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, route) {
    var duration = 0;
    var x;
    if (route == 1) {
        directionsService.route({
            origin: document.getElementById('start').value,
            destination: 'Majestic Oaks Apartments, Gainesville, FL 32607',
            travelMode: 'TRANSIT'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                duration = response.routes[0].legs[0].duration.text;
                x = document.getElementById("timeCompTable").rows[8].cells;
                x[1].innerHTML = duration;
                markerArray.push(new google.maps.Marker({
                    position: response.routes[0].legs[0].end_location,
                    map: map,
                    label: {
                        text: 'Majestic Oaks',
                        color: 'black',
                        fontWeight: '900'
                    },
                    icon: "http://maps.google.com/mapfiles/kml/paddle/orange-stars.png"
                }));
                //document.getElementById("majestic").insertCell(1).innerHTML = duration;
                //document.getElementById("Instruction").innerHTML += '<p class="info">To Majestic Oaks: ' + duration + '</p>';
            } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, route);
                }, delayFactor * 100);
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
                duration = response.routes[0].legs[0].duration.text;
                x = document.getElementById("timeCompTable").rows[2].cells;
                x[1].innerHTML = duration;
                markerArray.push(new google.maps.Marker({
                    position: response.routes[0].legs[0].end_location,
                    map: map,
                    label: {
                        text: 'Gainesville Place',
                        color: 'black',
                        fontWeight: '900'
                    },
                    icon: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png"
                }));
                //document.getElementById("gp").insertCell(1).innerHTML = duration;
                //document.getElementById("Instruction").innerHTML += '<p class="info">To Gainesville Place: ' + duration + '</p>';
            } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, route);
                }, delayFactor * 100);
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
                duration = response.routes[0].legs[0].duration.text;
                x = document.getElementById("timeCompTable").rows[3].cells;
                x[1].innerHTML = duration;
                markerArray.push(new google.maps.Marker({
                    position: response.routes[0].legs[0].end_location,
                    map: map,
                    label: {
                        text: 'Cabana Beach',
                        color: 'black',
                        fontWeight: '900'
                    },
                    icon: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png"
                }));
                //document.getElementById("cabana").insertCell(1).innerHTML = duration;
                //document.getElementById("Instruction").innerHTML += '<p class="info">To Cabana Beach: ' + duration + '</p>';
            } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, route);
                }, delayFactor * 100);
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
                duration = response.routes[0].legs[0].duration.text;
                x = document.getElementById("timeCompTable").rows[4].cells;
                x[1].innerHTML = duration;
                markerArray.push(new google.maps.Marker({
                    position: response.routes[0].legs[0].end_location,
                    map: map,
                    label: {
                        text: 'West 20',
                        color: 'black',
                        fontWeight: '900'
                    },
                    icon: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png"
                }));
                //document.getElementById("west20").insertCell(1).innerHTML = duration;
                //document.getElementById("Instruction").innerHTML += '<p class="info">To West 20: ' + duration + '</p>';
            } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, route);
                }, delayFactor * 250);
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
                duration = response.routes[0].legs[0].duration.text;
                x = document.getElementById("timeCompTable").rows[9].cells;
                x[1].innerHTML = duration;
                markerArray.push(new google.maps.Marker({
                    position: response.routes[0].legs[0].end_location,
                    map: map,
                    label: {
                        text: 'Tivoli Apartments',
                        color: 'black',
                        fontWeight: '900'
                    },
                    icon: "http://maps.google.com/mapfiles/kml/paddle/orange-stars.png"
                }));
                //document.getElementById("tivoli").insertCell(1).innerHTML = duration;
                //document.getElementById("Instruction").innerHTML += '<p class="info">To Tivoli: ' + duration + '</p>';
            } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, route);
                }, delayFactor * 100);
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
                duration = response.routes[0].legs[0].duration.text;
                x = document.getElementById("timeCompTable").rows[5].cells;
                x[1].innerHTML = duration;
                markerArray.push(new google.maps.Marker({
                    position: response.routes[0].legs[0].end_location,
                    map: map,
                    label: {
                        text: '2nd Ave',
                        color: 'black',
                        fontWeight: '900'
                    },
                    icon: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png"
                }));
                //document.getElementById("avenue").insertCell(1).innerHTML = duration;
                //document.getElementById("Instruction").innerHTML += '<p class="info">To 2nd Ave Apartments: ' + duration + '</p>';
            } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, route);
                }, delayFactor * 100);
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
                duration = response.routes[0].legs[0].duration.text;
                x = document.getElementById("timeCompTable").rows[6].cells;
                x[1].innerHTML = duration;
                markerArray.push(new google.maps.Marker({
                    position: response.routes[0].legs[0].end_location,
                    map: map,
                    label: {
                        text: 'Rawlings Hall',
                        color: 'black',
                        fontWeight: '900'
                    },
                    icon: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png"
                }));
                //document.getElementById("rawlings").insertCell(1).innerHTML = duration;
                //document.getElementById("Instruction").innerHTML += '<p class="info">To Rawlings Hall: ' + duration + '</p>';
            } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                delayFactor++;
                setTimeout(function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, route);
                }, delayFactor * 100);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}
//Sets demographics markers to appear and disappear
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function Markers(id) {
    if (markers[0].getMap() == null) {
        setMapOnAll(map);
        var div = document.getElementById(id);
        div.style.display = div.style.display == "none" ? "block" : "none";
        var table = document.getElementById("demoTable");
        table.style.display = div.style.display;
        document.getElementById("Instruction").innerHTML = '';
        document.getElementById("timeTable").style.display = "none";
        document.getElementById("busRoutesTable").style.display = "none";
        document.getElementById("heatTable").style.display = "none";
        //document.getElementById("Instruction").innerHTML = 'Click on the zipcodes on the map to get more information about each zipcode in Gainesville. <br>Red: Households below poverty line is greater than average <br>Blue: Households below poverty line is less than average ';
    }
    else {
        setMapOnAll(null);
        document.getElementById("Instruction").innerHTML = '';
        document.getElementById("timeTable").style.display = "none";
        document.getElementById("busRoutesTable").style.display = "none";
        document.getElementById("demoTable").style.display = "none";
        document.getElementById("heatTable").style.display = "none";
    }
}
//points for heatmap
function getPoints() {
    return [
        //green = 5 min
        //yellow = 10 min
        //red = 15 min
        //oaks mall
        { location: new google.maps.LatLng(29.6574, -82.4114), weight: 3 },
        { location: new google.maps.LatLng(29.6536, -82.4109), weight: 3 },
        //along bus route 23
        //bottom right corner - newell & 55th
        { location: new google.maps.LatLng(29.659, -82.409), weight: 3 },
        { location: new google.maps.LatLng(29.659, -82.405), weight: 3 },
        { location: new google.maps.LatLng(29.659, -82.4014), weight: 3 },
        //en route
        { location: new google.maps.LatLng(29.663, -82.4014), weight: 2.5 },
        { location: new google.maps.LatLng(29.665, -82.4014), weight: 2.5 },
        { location: new google.maps.LatLng(29.67, -82.4014), weight: 2.5 },
        { location: new google.maps.LatLng(29.6738, -82.4018), weight: 2.5 },

        //top right corner - 55th & 23rd
        { location: new google.maps.LatLng(29.6738, -82.4018), weight: 2.5 },

        //left
        { location: new google.maps.LatLng(29.66, -82.414), weight: 3 },
        { location: new google.maps.LatLng(29.66, -82.417), weight: 3 },
        { location: new google.maps.LatLng(29.66, -82.420), weight: 2.5 },
        { location: new google.maps.LatLng(29.66, -82.425), weight: 2.5 },
        { location: new google.maps.LatLng(29.66, -82.430), weight: 2 },
        { location: new google.maps.LatLng(29.661, -82.435), weight: 1.5 },
        //right
        { location: new google.maps.LatLng(29.6576, -82.3959), weight: 2.5 },
        { location: new google.maps.LatLng(29.6557, -82.3907), weight: 1 },
        //south on 62nd blvd
        { location: new google.maps.LatLng(29.6497, -82.4066), weight: 2 },


        //santa fe college
        { location: new google.maps.LatLng(29.6806, -82.4331), weight: 4 },
        //towards 23rd ave
        { location: new google.maps.LatLng(29.677, -82.4303), weight: 1.5 },
        //santa fe west apts
        { location: new google.maps.LatLng(29.6842, -82.4398), weight: 1 },
        { location: new google.maps.LatLng(29.683, -82.437), weight: 1 },
        //39th ave top right
        { location: new google.maps.LatLng(29.688, -82.4302), weight: 1.75 },
        { location: new google.maps.LatLng(29.685, -82.4302), weight: 1.75 },

        //butler  plaza
        { location: new google.maps.LatLng(29.625140, -82.387885), weight: 3.5 },
        { location: new google.maps.LatLng(29.6218, -82.38697), weight: 3 },
        { location: new google.maps.LatLng(29.6276, -82.3830), weight: 3 },
        //surrounding areas
        { location: new google.maps.LatLng(29.6253, -82.38386), weight: 2 },
        //24th ave and 38th ter
        { location: new google.maps.LatLng(29.63153, -82.3808), weight: 2 },
        //in between
        { location: new google.maps.LatLng(29.63156, -82.3808), weight: 2 },
        //20th and 38th ter
        { location: new google.maps.LatLng(29.6339, -82.3810), weight: 2 },
        //continuing along route 33
        { location: new google.maps.LatLng(29.636757, -82.380765), weight: 2 },
        { location: new google.maps.LatLng(29.637242, -82.3782), weight: 2 },
        //before 34th st
        { location: new google.maps.LatLng(29.6378, -82.3741), weight: 2 },
        //after 34th
        { location: new google.maps.LatLng(29.6375, -82.36886), weight: 2 },
        { location: new google.maps.LatLng(29.63746, -82.36515), weight: 2 },
        //left side of lake alice
        { location: new google.maps.LatLng(29.637484, -82.3601), weight: 2 },
        //right side of lake alice
        { location: new google.maps.LatLng(29.63832, -82.35326), weight: 1.5 },

        //archer route
        { location: new google.maps.LatLng(29.6211, -82.3812), weight: 1 },
        { location: new google.maps.LatLng(29.6233, -82.3759), weight: 1 },
        { location: new google.maps.LatLng(29.62564, -82.3745), weight: 1 },
        { location: new google.maps.LatLng(29.627279, -82.37137), weight: 1 },
        { location: new google.maps.LatLng(29.63175, -82.36193), weight: 1 },

        //shands hospital
        { location: new google.maps.LatLng(29.6400, -82.3427), weight: 4.5 },
        //museum
        { location: new google.maps.LatLng(29.6448, -82.3434), weight: 1.5 },
        //diamond village
        { location: new google.maps.LatLng(29.64249, -82.3393), weight: 1 },
        //down 13th on bus stops
        //oak brook condo
        { location: new google.maps.LatLng(29.6384, -82.3390), weight: 1 },
        { location: new google.maps.LatLng(29.6278, -82.3391), weight: 1 },
        { location: new google.maps.LatLng(29.6346, -82.3395), weight: 1 },
        //boardwalk apt
        { location: new google.maps.LatLng(29.6264, -82.3392), weight: 1 },
        //right on 16th
        { location: new google.maps.LatLng(29.6364, -82.3351), weight: 1 },


        //rosa parks
        { location: new google.maps.LatLng(29.6460, -82.3227), weight: 4 },
        //downtown
        { location: new google.maps.LatLng(29.64929, -82.3242), weight: 2 },
        //courts up the road 
        { location: new google.maps.LatLng(29.65153, -82.3223), weight: 2 },
        //right on university
        { location: new google.maps.LatLng(29.65166, -82.31961), weight: 1 },
        //left to 2nd ave apt
        { location: new google.maps.LatLng(29.6504, -82.3299), weight: 1 }

    ];
}
//Gradient from green to red for heatmap
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
//toggles timecomparison dropdown menu
function toggleDiv(id) {
    var div = document.getElementById(id);
    div.style.display = div.style.display == "none" ? "block" : "none";
    var table = document.getElementById("timeTable");
    table.style.display = div.style.display;
    document.getElementById("Instruction").innerHTML = '';
    document.getElementById("busRoutesTable").style.display = "none";
    document.getElementById("heatTable").style.display = "none";
    document.getElementById('demoTable').style.display = 'none';
    var div2 = document.getElementById('markerLegend');
    div2.style.display = div.style.display;
    directionsDisplay91.setMap(null);
    directionsDisplay92.setMap(null);
    directionsDisplay93.setMap(null);
    directionsDisplay94.setMap(null);
    directionsDisplay95.setMap(null);
    directionsDisplay96.setMap(null);
    directionsDisplay97.setMap(null);
    setBus(null,markerArray);
}
//toggles bus routes and bus stops dropdown menu
function togglingDiv(id) {
    var div = document.getElementById(id);
    div.style.display = div.style.display == "none" ? "block" : "none";
    var table = document.getElementById("busRoutesTable");
    table.style.display = div.style.display;
    document.getElementById("Instruction").innerHTML = '';
    document.getElementById("heatTable").style.display = "none";
    document.getElementById('demoTable').style.display = 'none';
    document.getElementById('timeTable').style.display = 'none';
 
    directionsDisplay20.setMap(null);
    directionsDisplay20x.setMap(null);
    directionsDisplay20y.setMap(null);
    directionsDisplay62.setMap(null);
    directionsDisplay62x.setMap(null);
    directionsDisplay62y.setMap(null);
    directionsDisplay75.setMap(null);
    directionsDisplay75x.setMap(null);
    directionsDisplay75y.setMap(null);
    directionsDisplay75z.setMap(null);
    directionsDisplay75w.setMap(null);
    directionsDisplay76.setMap(null);
    directionsDisplay76x.setMap(null);
    directionsDisplay76y.setMap(null);
    directionsDisplay1.setMap(null);
    directionsDisplay1x.setMap(null);
    directionsDisplay1y.setMap(null);
    directionsDisplay7.setMap(null);
    directionsDisplay7x.setMap(null);
    directionsDisplay7y.setMap(null);
    busstop();
}
//toggles between pairs of routes for bus stops
var showingRoutesSelected = function (directionsService, selected) {
    if (selected == 1) {
        directionsService.route(request20, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay20.setDirections(results);
            }
        });
        directionsService.route(request20x, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay20x.setDirections(results);
            }
        });
        directionsService.route(request20y, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay20y.setDirections(results);
            }
        });
        directionsService.route(request62, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay62.setDirections(results);
            }
        });
        directionsService.route(request62x, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay62x.setDirections(results);
            }
        });
        directionsService.route(request62y, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay62y.setDirections(results);
            }
        });
    }
    else if (selected == 2) {
        directionsService.route(request75, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay75.setDirections(results);
            }
        });
        directionsService.route(request75x, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay75x.setDirections(results);
            }
        });
        directionsService.route(request75y, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay75y.setDirections(results);
            }
        });
        directionsService.route(request75z, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay75z.setDirections(results);
            }
        });
        directionsService.route(request75w, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay75w.setDirections(results);
            }
        });
        directionsService.route(request76, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay76.setDirections(results);
            }
        });
        directionsService.route(request76x, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay76x.setDirections(results);
            }
        });
        directionsService.route(request76y, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay76y.setDirections(results);
            }
        });
    }
    else if (selected == 3) {
        directionsService.route(request1, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay1.setDirections(results);
            }
        });
        directionsService.route(request1x, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay1x.setDirections(results);
            }
        });
        directionsService.route(request1y, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay1y.setDirections(results);
            }
        });
        directionsService.route(request7, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay7.setDirections(results);
            }
        });
        directionsService.route(request7x, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay7x.setDirections(results);
            }
        });
        directionsService.route(request7y, function (results, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay7y.setDirections(results);
            }
        });
    }
};