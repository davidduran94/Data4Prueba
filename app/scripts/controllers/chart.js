'use strict';

/**
 * @ngdoc function
 * @name data4PruebaApp.controller:ChartCtrl
 * @description Controlador de datos de la gráfica
 * # ChartCtrl
 * Controller of the data4PruebaApp
 */
angular.module('data4PruebaApp')
  .controller('ChartCtrl', ['$scope', '$sce', function ($scope, $sce) {
    
    /*
    * Variables y datos de la gráfica
    */
    $scope.arrayData     = generateData();      //variable donde se almacenan los datos de los 5 años 
    $scope.options       = {width: 1200, height: 550, 'bar': 'Data4'};
    $scope.data          = $scope.arrayData[0]; // datos que se muestran actualmente en la gráfica
    $scope.estados       = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Coahuila','Colima','Distrito Federal','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
    $scope.years         = randomYears();       // se generan 5 años aleatorios
    $scope.orden         = ['alfabetico','ascendente', 'descendente']; //tipos de ordenamiento
    $scope.idhMin        = 0;                   // Indice de desarrollo minimo en el estado seleccionado
    $scope.idhMax        = 1;                   // Indice de desarrollo máximo en el estado seleccionado
    $scope.idhProm       = 1;                   // Promedio de IDH en los años del estado seleccionado
    $scope.current_idh   = 0;                   // Indice de desarrollo en el año seleccioando del estado seleccionado
    $scope.selectedState = $scope.estados[0];   // Estado Seleccionado
    $scope.selectedYear  = $scope.years[0];     // Año seleccionado
    $scope.selectedOrder = $scope.orden[0];     // Tipo de orden en el que se muestra la gráfica
    

    /*
    *  Funcion que genera los datos aleatorios de los años para cada estado     
    */
    function generateData(){
        var arrayData = [];
        //ciclo para cada arreglo de datos de cada año
        for (var i = 0; i < 5; i++) {
            arrayData[i] = randomData();
        }        
        return arrayData;
    }

    /*
    * Devueleve un arreglo con 32 valores aleatorios
    */
	function randomData(){
		var arr = [];
		for (var i = 0, l = 32; i < l; i++) {
		    arr.push( (Math.random() * (0.0001 - 0.9999) + 0.9999).toFixed(4) );
		}
		return arr;
	}

    /*
    * Devuelve un arreglo con 5 numeros aleatorios entre 1960 y 2036 
    */
    function randomYears(){
        var arr = [];
        for (var i = 0, l = 5; i < l; i++) {
            var newNumber = (Math.random() * (1960 - 2036) + 2036).toFixed(0);
            arr.push( newNumber );
        }
        return arr;
    }

    
    /*
    * Función llamada cuando el estado seleccionado cambia
    */
    $scope.dropboxStateSelected = function (item) {
        $scope.selectedState = item;
        var indice_estado_actual;

        //Se detecta el tipo de ordenmiento y se escoge el valor de IDH para el estado seleccionado
        if($scope.selectedOrder != "alfabetico"){indice_estado_actual = (Math.random() * (0 - 31) + 31).toFixed(0);}
        else{indice_estado_actual = $scope.estados.indexOf(item);}
        
        //indices para hacer referencia a los datos en los arreglos 
        var indice_año = $scope.years.indexOf($scope.selectedYear); // se obtiene el año actual
        var valor_idh = $scope.arrayData[indice_año][indice_estado_actual]; // este valor se busca en el arreglo
        
        //se calculan los valores para el nuevo estado seleccionado
        $scope.idhMax = $scope.findBigger($scope.arrayData, indice_estado_actual);
        $scope.idhMin = $scope.findSmaller($scope.arrayData, indice_estado_actual);
        $scope.idhProm= $scope.promIDH($scope.arrayData, indice_estado_actual);
        $scope.findIDH(valor_idh);
        $scope.current_idh = $scope.data[indice_estado_actual];
    };

    /*
    * Función llamada cuando el año seleccionado cambia
    */
     $scope.dropboxYearSelected = function (item) {
        $scope.selectedYear = item;
        var indice = $scope.years.indexOf(item);
        $scope.data = $scope.arrayData[indice];
        $scope.update($scope.arrayData[indice]);
    };

    /*
    * Función llamada cuando tipo de ordenamiento de la gráfica cambia
    */
    $scope.dropboxOrderSelected = function (item) {
        $scope.selectedOrder = item;
        var indice = $scope.years.indexOf($scope.selectedYear);
        $scope.data = $scope.order($scope.data, item, $scope.arrayData[indice]);
    };
    
  }]);
