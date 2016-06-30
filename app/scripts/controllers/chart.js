'use strict';

/**
 * @ngdoc function
 * @name data4PruebaApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the data4PruebaApp
 */
angular.module('data4PruebaApp')
  .controller('ChartCtrl', function ($scope) {
    
    $scope.options = {width: 700, height: 500, 'bar': 'aaa'};
    $scope.data    = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    $scope.estados = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Coahuila','Colima','Distrito Federal','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacateca'];
    $scope.years   = ['1999', '2000', '2001','2002','2003','2004'];
    
    $scope.idh_min 		= 0;
    $scope.idh_max 		= 1;
    $scope.selectedItem = 'None';
    $scope.barValue 	= 'None';

    $scope.dropboxitemselected = function (item) {
        $scope.selectedItem = item;
    };

    $scope.hovered = function(d){
        $scope.barValue = d;
        $scope.$apply();
    };
    
  });
