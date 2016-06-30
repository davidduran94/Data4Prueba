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
                	$scope.data    = randomData();
                	$scope.idh_min = findSmaller(arr);
                	$scope.idh_max = findBigger(arr);
                	$scope.dropboxitemselected();
                	$scope.barValue= findIDH($scope.selectedItem, arr);
                };
                
                function randomData(){
					for (var i = 0, l = 32; i < l; i++) {
					    arr.push( (Math.random() * (0.0001 - 0.9999) + 0.9999).toFixed(4) );
					}
					return arr;
                };

                function findBigger(arr){
                	arr=$scope.data;
                	var bigger = arr[0];
                	for (var i = 0 ; i < 32; i++) {
					    if(arr[i]>bigger)
					    	bigger = arr[i];
					}
					return bigger;
                };

                function findSmaller(arr){
                	var small = arr[0];
                	for (var i = 0; i < 32; i++) {
					    if(arr[i]<small)
					    	small = arr[i];
					}
					return small;
                };

                function findIDH(estado, arr){
                	var idh = arr[0];
                	//console.log(estado);
                	for (var i = 0; i < 32; i++) {
					    if($scope.estados[i] == estado)
					    	idh = arr[i];
					}
					return idh;
                };
            },

            template: '<div class="form">' +
                    '<div ng-controller="ChartCtrl">'+

                     '<div class="dropdown line">'+
			            '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Seleccione un estado<span class="caret"></span></button>'+
			            '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">'+
			                '<li ng-repeat="a in estados"><a ng-click="dropboxitemselected(a)">{{a}}</a></li>'+
			            '</ul>'+
			        '</div>'+

			        '<div class="dropdown line">'+
			            '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Seleccione un año<span class="caret"></span></button>'+
			            '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">'+
			                '<li ng-repeat="a in years"><a ng-click="">{{a}}</a></li>'+
			            '</ul>'+
			        '</div>'+

                    '<button class="btn btn-primary" ng-click="update()">Update Data</button>' +
                    '<br /><h3>Estado Seleccionado: {{ selectedItem }} IDH:{{barValue}}<h3></div>'+
                    '<h3>IDH Mayor: {{ idh_max}} IDH Menor:{{idh_min}}<h3><br></div>'


	    }
    });






