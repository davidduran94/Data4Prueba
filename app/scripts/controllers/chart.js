'use strict';

/**
 * @ngdoc function
 * @name data4PruebaApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the data4PruebaApp
 */
angular.module('data4PruebaApp')
  .controller('ChartCtrl', ['$scope', '$sce', function ($scope, $sce) {
    
    $scope.options = {width: 800, height: 550, 'bar': 'aaa'};
    $scope.data    = randomData();
    $scope.estados = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Coahuila','Colima','Distrito Federal','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
    $scope.years   = ['1999', '2000', '2001','2002','2003','2004'];
    $scope.orden   = ['alfabetico','ascendente', 'descendente'];
    
    $scope.idhMin 		 = 0;
    $scope.idhMax 		 = 1;
    $scope.idhProm 	     = 1;
    $scope.current_idh   = 0;
    $scope.selectedState = 'None';
    $scope.selectedYear  = 'None';
    $scope.selectedOrder = 'None';


	function randomData(){
		var arr = [];
		for (var i = 0, l = 32; i < l; i++) {
		    arr.push( (Math.random() * (0.0001 - 0.9999) + 0.9999).toFixed(4) );
		}
		return arr;
	}

    $scope.dropboxStateSelected = function (item) {
        $scope.selectedState = item;
        $scope.idhMax = $scope.findBigger();
        $scope.idhMin = $scope.findSmaller();
        $scope.idhProm= $scope.promIDH();
        $scope.current_idh = $scope.findIDH(item);
        //$scope.update();
        //$scope.$apply();
    };

     $scope.dropboxYearSelected = function (item) {
        $scope.selectedYear = item;
        $scope.update();
    };

     $scope.dropboxOrderSelected = function (item) {
        $scope.selectedOrder = item;
        $scope.ordenarDatos();

    };

    $scope.hovered = function(d){
        $scope.barValue = d;
        $scope.$apply();
    };
    
  }]);



/*
RESUROCES

http://bl.ocks.org/biovisualize/5372077    <------CHART BASE
http://jsfiddle.net/7K3tt/2/   <------CHART MIN
http://bl.ocks.org/Caged/6476579 <---------CHART NARANJA

https://github.com/data4/jobs-front-end  <--------- PRUEBA

http://frontendlabs.io/2797--la-gramatica-en-javascript


*/

