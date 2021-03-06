'use strict';

/**
 * @ngdoc directive
 * @name data4PruebaApp.directive:charts
 * @description
 * # charts
 */
angular.module('data4PruebaApp')
  .directive('barChart', function(){

  		d3.custom = {};

		d3.custom.barChart = function module() {
		    var margin = {top: 20, right: 20, bottom: 40, left: 40},
		        width = 600,
		        height = 700,
		        gap = 0,
		        ease = 'cubic-in-out';
		    var svg, duration = 500;

		    var dispatch = d3.dispatch('customHover');
			  
		    function exports(_selection) {
		        _selection.each(function(_data) {

		            var chartW = width - margin.left - margin.right,
		                chartH = height - margin.top - margin.bottom;

		            var x1 = d3.scale.ordinal()
		                .domain(_data.map(function(d, i){ return i; }))
		                .rangeRoundBands([0, chartW], 0.1);

		            var y1 = d3.scale.linear()
		                .domain([0, d3.max(_data, function(d, i){ return d; })])
		                .range([chartH, 0]);

		            var xAxis = d3.svg.axis()
		                .scale(x1)
		                .orient('bottom');

		            var yAxis = d3.svg.axis()
		                .scale(y1)
		                .orient('left');

		            var barW = chartW / _data.length;

		            if(!svg) {
		                svg = d3.select(this)
		                    .append('svg')
		                    .classed('chart', true);
		                var container = svg.append('g').classed('container-group', true);
		                container.append('g').classed('chart-group', true);
		                container.append('g').classed('x-axis-group axis', true);
		                container.append('g').classed('y-axis-group axis', true);
		            }

		            svg.transition().duration(duration).attr({width: width, height: height});
		            svg.select('.container-group')
		                .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

		            svg.select('.x-axis-group.axis')
		                .transition()
		                .duration(duration)
		                .ease(ease)
		                .attr({transform: 'translate(0,' + (chartH) + ')'})
		                .call(xAxis);

		            svg.select('.y-axis-group.axis')
		                .transition()
		                .duration(duration)
		                .ease(ease)
		                .call(yAxis);


		            var gapSize = x1.rangeBand() / 100 * gap;
		            	barW = x1.rangeBand() - gapSize;
		            var bars = svg.select('.chart-group')
		                .selectAll('.bar')
		                .data(_data);
		            bars.enter().append('rect')
		                .classed('bar', true)
		                .attr({
		                	x: chartW,
		                    width: barW,
		                    y: function(d, i) { return y1(d); },
		                    height: function(d, i) { return chartH - y1(d); }
		                })
		                .on('mouseover', dispatch.customHover)
		                .on('click', function() { d3.select(this).style("fill", "red") });
		                //.on('mouseout', function() { d3.select(this).style("fill", "steelblue") });		  


		            bars.transition()
		                .duration(duration)
		                .ease(ease)
		                .attr({
		                    width: barW,
		                    x: function(d, i) { return x1(i) + gapSize/2; },
		                    y: function(d, i) { return y1(d); },
		                    height: function(d, i) { return chartH - y1(d); }
		                });
		            bars.exit().transition().style({opacity: 0}).remove();

		            duration = 500;

		        });
		    }
		    exports.width = function(_x) {
		        if (!arguments.length) return width;
		        width = parseInt(_x);
		        return this;
		    };
		    exports.height = function(_x) {
		        if (!arguments.length) return height;
		        height = parseInt(_x);
		        duration = 0;
		        return this;
		    };
		    exports.gap = function(_x) {
		        if (!arguments.length) return gap;
		        gap = _x;
		        return this;
		    };
		    exports.ease = function(_x) {
		        if (!arguments.length) return ease;
		        ease = _x;
		        return this;
		    };
		    d3.rebind(exports, dispatch, 'on');
		    return exports;
		};

        var chart = d3.custom.barChart();
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="chart"></div>',
            scope:{
                height: '=height',
                data: '=data',
                hovered: '&hovered'
            },
            link: function(scope, element, attrs) {
                var chartEl = d3.select(element[0]);

                chart.on('customHover', function(d, i){ //se detecta cuando un elemento de la gráfica es seleccionado
                    scope.hovered({args:d});
                });

                scope.$watch('data', function (newVal, oldVal) {
                    chartEl.datum(newVal).call(chart);
                });

                scope.$watch('height', function(d, i){
                    chartEl.call(chart.height(scope.height));
                });


                
                /*
                	Se observa cuando la ventana cambia de tamaño y se llama a la función que vuelve a crear la grafica
                */

                window.onresize = function() {
            		return scope.$apply();
          		};
                scope.$watch(function() {
	              return angular.element($(window))[0].innerWidth;
		        }, function() {
		        	if(angular.element($(window))[0].innerWidth<480){
		            	// remove all previous items before render
		            	chartEl.selectAll("*").remove();
		            	var svg = d3.select(element[0])
	              		.append("svg")
	              		.attr("width", "100%");
		            	scope.render(scope.data, svg);
		            }
		            else if(angular.element($(window))[0].innerWidth>481)
		            	console.log("gogad");
		                var chart = d3.custom.barChart();
		        });
		 
		        scope.render = function(data, svg){
		        	var newData = data;
		        	var estados = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Coahuila','Colima','Distrito Federal','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
		        	data = [];
		        	for(var k =0; k<35; k++){
		        		var obj = {name:estados[k], score: Number(newData[k])};
		        		data.push(obj);
		        	}
		        	console.log(data);

		            // setup variables
		            var width, height, max;
		            width = d3.select(element[0])[0][0].offsetWidth - 4;
		              // 20 is for margins and can be changed
		            height = scope.data.length * 35;
		              // 35 = 30(bar height) + 5(margin between bars)
		            max = 98;
		              // this can also be found dynamically when the data is not static
		              // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

		            // set the height based on the calculations above
		            svg.attr('height', height);

		            //create the rectangles for the bar chart
		            svg.selectAll("rect")
		              .data(data)
		              .enter()
		                .append("rect")
		                .on("click", function(d, i){return scope.onClick({item: d});})
		                .attr("height", 24) // height of each bar
		                .attr("width", 0) // initial width of 0 for transition
		                .attr("x", 0.25) // half of the 20 side margin specified above
		                .attr("y", function(d, i){
		                  return i * 35;
		                }) // height + margin between bars
		                .attr("fill", "steelblue")
		                .transition()
		                  .duration(1000) // time of duration
		                  .attr("width", function(d){
		                    return 100*d.score/(max/width);
		                  }); // width based on scale

		            svg.selectAll("text")
		              .data(data)
		              .enter()
		                .append("text")
		                .attr("fill", "black")
		                .attr("y", function(d, i){return i * 35 + 17;})
		                .attr("x", 2)
		                .text(function(d){return d.name+" IDH: "+d.score;});
	          };
            }
        };
});
