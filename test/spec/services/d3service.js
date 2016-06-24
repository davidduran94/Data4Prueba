/**
 * @ngdoc service
 * @name d3jsApp.d3Service
 * @description
 * # d3Service
 * Factory in the d3jsApp.
 */
angular.module('d3', [])
  .factory('d3Service', ['$document','$q', '$rootScope', function () {
    // Service logic
    // ...

    var d = $q.defer();
    function onScriptLoad () {
      //cargar el cliente en el navegador
      $rootScope.$apply(function(){ d.resolve(window.d3);});
    }

    //etiqueta de sript y atributos
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = 'bower_components/d3/d3.js';
    scriptTag.onreadystatechange = function (){
      if(this.readyState=='complete'){ onScriptLoad();}
    };
    scriptTag.onLoad=scriptLoad;

    //se coloca en el DOM
    vas s = $document[0].getElementByTagName('body')[0];
    s.appendChild(scriptTag);

    // Public API here
    return {
      d3: function () {
        return d.promise;
      }
    };
  }]);
