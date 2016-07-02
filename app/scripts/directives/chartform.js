'use strict';

/**
 * @ngdoc directive
 * @name data4PruebaApp.directive:chartForm
 * @description
 * # chartForm
 */
angular.module('data4PruebaApp')
  .directive('chartForm', function () {
    return {
            restrict: 'E',
            replace: true,
            controller: function AppCtrl ($scope) {
                var arr = [];

                $scope.update = function(d, i){ 
                	$scope.data = $scope.randomData();

                };
                
                $scope.randomData = function(){
					for (var i = 0, l = 32; i < l; i++) {
					    arr.push( (Math.random() * (0.0001 - 0.9999) + 0.9999).toFixed(4) );
					}
					return arr;
                };

                $scope.findBigger = function(arr){
                	arr=$scope.data;
                	var bigger = arr[0];
                	for (var i = 0 ; i < 32; i++) {
					    if(arr[i]>bigger)
					    	bigger = arr[i];
					}
					return bigger;
                };

                $scope.findSmaller = function (arr){
                	arr=$scope.data;
                	var small = arr[0];
                	for (var i = 0; i < 32; i++) {
					    if(arr[i]<small)
					    	small = arr[i];
					}
					return small;
                };

                $scope.findIDH = function(estado, arr){
                	arr=$scope.data;
                	var idh = arr[0];
                	//console.log(estado);
                	for (var i = 0; i < 32; i++) {
					    if($scope.estados[i] == estado)
					    	idh = arr[i];
					}
					return idh;
                };

                $scope.promIDH = function (arr){
                	arr=$scope.data;
                	var prom=0;
                	//console.log(estado);
                	for (var i = 0; i < 32; i++) {
                		var c = arr[i];
					    prom = c+parseInt(arr[i]);
					}
					prom = prom/32;
					return prom.toFixed(4);
                };
            },

            templateUrl: 'views/opciones.html'

	    }
    });






