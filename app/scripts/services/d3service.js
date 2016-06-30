'use strict';

/**
 * @ngdoc service
 * @name data4PruebaApp.d3Service
 * @description
 * # d3Service
 * Factory in the data4PruebaApp.
 */
angular.module('data4PruebaApp')
  .factory('d3Service', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
