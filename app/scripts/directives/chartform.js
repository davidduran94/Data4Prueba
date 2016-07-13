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

                /*Cambia los datos de la grafica, generando nuevos valores aleatorios a*/
                $scope.update = function(d, i){ 
                	$scope.data = $scope.randomData(); 
                	console.log("updated");
                };

                
                $scope.randomData = function(){
					return d3.range(~~(31*1)+1).map(function(d, i){return ( (Math.random()*(0.09999)).toFixed(4) );});
                };


                $scope.randomYears = function(){
                    return d3.range(~~(4*1)+1).map(function(d, i){return ( (Math.random()*(2000)).toFixed(0) );});
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

                /*Funcion que detecta el estado seleccionado y cambia el color de este*/
                $scope.findIDH = function(estado, arr){
                	arr=$scope.estados;
                	var idh = arr[0];
                    for (var i = 0; i < 32; i++) {
                        var chartEl = d3.selectAll(".bar")[0][i];
                        chartEl.style.fill = "steelblue";
                    }
                	for (var i = 0; i < 32; i++) {
					    if($scope.estados[i] == estado){
					    	idh = arr[i];
                            var chartEl = d3.selectAll(".bar")[0][i];
                            chartEl.style.fill = "red";
                        }
					}
					return idh;
                };

                $scope.findIdhValue = function(estado, arr){
                    arr=$scope.estados;
                    var idh = $scope.data[0];
                    for (var i = 0; i < 32; i++) {
                        if($scope.estados[i] == estado){
                            return $scope.data[i];
                        }
                    }
                    return idh;
                };

                /*Función para encontrar el promedio de IDH */
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

                $scope.ordenarDatos = function(){
                    var datos = $scope.data; 
                    //oredenamiento burbuja
                    for (var i = 1; i <= datos.length; i++) {
                        for (var j = 0; j <= datos.length-1; j++) {
                            if(datos[j]>datos[j+1]){
                                var aux = datos[j];
                                datos[j] = datos[j+1];
                                datos[j+1] = aux;
                            }                                
                        };
                    };
                    
                    $scope.data = d3.range(~~(31*1)+1).map(function(d, i){return ( (Math.random()*(0.09999)).toFixed(4) );});
                };
            },

            /*Template HTML del formulario de opciones*/
            templateUrl: 'views/opciones.html'

	    }
    });






