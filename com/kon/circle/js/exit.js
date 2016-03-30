/**
 * Created by kshevchuk on 6/23/2015.
 */
/**
 * Exit selection - to remove some elements for which there is no data
 */

var svg = d3.select("svg");
var circle = svg.selectAll("circle")
    .data([800, 920]);


circle
    .exit()
    .remove();

