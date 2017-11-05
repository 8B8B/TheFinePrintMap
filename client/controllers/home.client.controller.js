'use strict';
var myapp = angular.module('myApp',[]);

myapp.service('agenciesService', function($http){
    this.getAgenciesData = function(){
        return $http({
            url: 'https://transloc-api-1-2.p.mashape.com/agencies.json?agencies=116&callback=call&geo_area=29.6436325%2C-82.3457529%7C29.6436325%2C-82.3457529',
            method: 'GET',
            headers:{
                'X-Mashape-Key' : 'vzgqRtweZXmshXcuRLXMNv2IbMtLp1ehey1jsnShSFzoOdVYVT',
                'Accept' : 'application/json'
            }
        });
    };
});

myapp.service('routesService', function($http){
    this.getRouteData = function(){
        return $http({
            url: 'https://transloc-api-1-2.p.mashape.com/routes.json?agencies=116&callback=call',
            method: 'GET',
            //cache: 'true',
            headers:{
                'X-Mashape-Key' : 'vzgqRtweZXmshXcuRLXMNv2IbMtLp1ehey1jsnShSFzoOdVYVT',
                'Accept' : 'application/json'
            }
        });
    };
});

myapp.service('arrivalService', function($http){
    this.getArrivalData = function(){
        return $http({
            url: 'https://transloc-api-1-2.p.mashape.com/arrival-estimates.json?agencies=116&callback=call',
            method: 'GET',
            headers:{
                'X-Mashape-Key' : 'vzgqRtweZXmshXcuRLXMNv2IbMtLp1ehey1jsnShSFzoOdVYVT',
                'Accept' : 'application/json'
            }
        });
    };
});

myapp.service('segmentsService', function($http){
    this.getSegmentsData = function(){
        return $http({
            url: 'https://transloc-api-1-2.p.mashape.com/segments.json?agencies=116&callback=call',
            method: 'GET',
            //cache: 'true',
            headers:{
                'X-Mashape-Key' : 'vzgqRtweZXmshXcuRLXMNv2IbMtLp1ehey1jsnShSFzoOdVYVT',
                'Accept' : 'application/json'
            }
        });
    };
});

myapp.service('stopsService', function($http){
    this.getStopsData = function(){
        return $http({
            url: 'https://transloc-api-1-2.p.mashape.com/stops.json?agencies=116&callback=call',
            method: 'GET',
            //cache: 'true',
            headers:{
                'X-Mashape-Key' : 'vzgqRtweZXmshXcuRLXMNv2IbMtLp1ehey1jsnShSFzoOdVYVT',
                'Accept' : 'application/json'
            }
        });
    };
});

myapp.service('vehicleService', function($http){
    this.getVehicleData = function(){
        return $http({
            url: 'https://transloc-api-1-2.p.mashape.com/vehicles.json?agencies=116&callback=call',
            method: 'GET',
            headers:{
                'X-Mashape-Key' : 'vzgqRtweZXmshXcuRLXMNv2IbMtLp1ehey1jsnShSFzoOdVYVT',
                'Accept' : 'application/json'
            }
        });
    };
});

myapp.controller('HomeController', ['$scope', 'agenciesService', 'routesService', 'arrivalService', 'segmentsService', 'stopsService', 'vehicleService',
    function ($scope, agenciesService, routesService, arrivalService, segmentsService, stopsService, vehicleService) {
        // This provides Authentication context.
        //$scope.authentication = Authentication;
        $scope.agdata = null;
        $scope.rdata = null;
        $scope.adata = null;
        $scope.segdata = null;
        $scope.stdata = null;
        $scope.vdata = null;

        function getAgencies(){
            agenciesService.getAgenciesData().then(function(agenciesResponse){
                $scope.agdata = agenciesResponse.data;
            });
        }

        function getArrival(){
            arrivalService.getArrivalData().then(function (arrivalResponse) {
                $scope.adata = arrivalResponse.data;
            });
        }

        function getRoutes(){
            routesService.getRouteData().then(function (routesResponse) {
                $scope.rdata = routesResponse.data;
            });
        }

        function getSegments(){
            segmentsService.getSegmentsData().then(function (segmentsResponse) {
                $scope.segdata = segmentsResponse.data;
            });
        }

        function getStops(){
            stopsService.getStopsData().then(function (stopsResponse) {
                $scope.stdata = stopsResponse.data;
                var temp = "[";
                temp+=$scope.stdata.data[0].location.lat;
                temp+=", ";
                temp+=$scope.stdata.data[0].location.lng;
                temp+="]";
                $scope.coord = temp;
            });
        }

        function getVehicle(){
            vehicleService.getVehicleData().then(function (vehicleResponse) {
                $scope.vdata = vehicleResponse.data;
            });
        }

        getAgencies();
        getArrival();
        getRoutes();
        getSegments();
        getStops();
        getVehicle();


    }
]);

