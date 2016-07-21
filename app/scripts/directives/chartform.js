'use strict';

/**
 * @ngdoc directive
 * @name data4PruebaApp.directive:chartForm
 * @description  Directiva para el formulario de parametros de la Gráfica
 * # chartForm
 */
angular.module('data4PruebaApp')
  .directive('chartForm', function () {
    return {
            restrict: 'E',
            replace: true,
            controller: function AppCtrl ($scope) {
                var arr = [];

                /*Cambia los datos de la grafica por los pasados en el parametro nuevo*/
                $scope.update = function(newData){ 
                    $scope.data = d3.range(~~(31*1)+1).map.call(newData, function(i){return i;}); 
                	console.log("updated");
                };

                /*Encuentra el valor mas grande de IDH en los años generados*/
                $scope.findBigger = function(arr, indice){
                	var bigger = arr[0][indice];
                	for (var i = 0 ; i < 5; i++) {
					    if(arr[i][indice]>bigger)
					    	bigger = arr[i][indice];
					}
					return bigger;
                };

                /*Encuentra el valor mas pequeño de IDH en los años generados*/
                $scope.findSmaller = function (arr, indice){
                	//arr=$scope.data;
                	var small = arr[0][indice];
                	for (var i = 0; i < 5; i++) {
					    if(arr[i][indice]<small)
					    	small = arr[i][indice];
					}
					return small;
                };

                /*
                * Funcion que detecta el estado seleccionado y cambia el color de este
                * Recibe el valor del idh a buscar en el arreglo de datos
                */
                $scope.findIDH = function(valor_idh){
                	arr=$scope.estados;
                	var idh = arr[0];
                    for (var i = 0; i < 32; i++) {
                        var chartEl = d3.selectAll(".bar")[0][i];
                        chartEl.style.fill = "steelblue";
                    }
                	for (var i = 0; i < 32; i++) {
					    if($scope.data[i] == valor_idh){
					    	idh = arr[i];
                            var chartEl = d3.selectAll(".bar")[0][i];
                            chartEl.style.fill = "red";
                        }
					}
					return;
                };


                /*Función para encontrar el promedio de IDH de un estado en los años generados */
                $scope.promIDH = function (arr, indice){
                	//arr=$scope.data;
                	var prom=0;
                	//console.log(estado);
                	for (var i = 0; i < 5; i++) {
                		var c = arr[i][indice];
					    prom = c+parseInt(arr[i]);
					}
					prom = prom/5;
					return prom.toFixed(4);
                };

                /*
                * Ordenamiento Bubble Sort 
                * dependiendo del tipo de ordenamiento seleccionado devuelve el arreglo correspondiente
                */
                $scope.order = function (array,orden, original){
                    if(orden  == "alfabetico"){
                        array = original;
                        $scope.data = d3.range(~~(31*1)+1).map.call(array, function(i){return i;});
                        return original;
                    }
                    for (var k = 1; k < 32; k++) {
                        for (var j=0; j<32-k; j++){
                            if(array[j]>array[j+1]){
                                var aux    = array[j];
                                array[j]   = array[j+1];
                                array[j+1] = aux
                            }
                        }
                    }
                    if(orden=='descendente'){ array.reverse();}
                    $scope.data = d3.range(~~(31*1)+1).map.call(array, function(i){return i;});
                    return array;
                };
            },

            /*Template HTML del formulario de opciones*/
            templateUrl: 'views/opciones.html'

	    }
    });






