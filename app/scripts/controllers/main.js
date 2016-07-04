'use strict';

/**
 * @ngdoc function
 * @name data4PruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the data4PruebaApp
 */
angular.module('data4PruebaApp')
  .controller('MainCtrl', ['$scope', 'matchmedia', 
  	function ($scope, matchmedia) {
    	matchmedia.on('screen and min-width: 480px', function(mediaQueryList){
    		alert("minimo");



    		var unregister = matchmedia.onPhone( function(mediaQueryList){
  				$scope.isPhone = mediaQueryList.matches;
  				alert ("sdjga");
			});
})

    
  }]);
