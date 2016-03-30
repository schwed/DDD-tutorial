/**
 * Created by kshevchuk on 6/23/2015.
 */

var circle = d3.selectAll("circle");

circle.style("fill", "steelblue");
circle.attr("r", 30);
circle.attr("cx", function() {return Math.random() * 720; });
circle.attr("cy", function() {return Math.random() * 120; });

/**
 * use data to drive the appearance of our circles
 */
circle.data([37, 52, 112]);

/**
 * Data is specified as an array of values;
 * this mirrors the concept of a selection, which is an array of elements.
 * In the code above, the first number (the first datum, 32) is bound to the first circle (the first element,
 * based on the order in which they are defined in the DOM), the second number is bound to the second circle, and so on.
 * After data is bound, it is accessible as the first argument to attribute and style functions.
 * By convention, we typically use the name d to refer to bound data. To set the radius using the data
 */
circle.attr("r", function(d) {return Math.sqrt(d) * 6;});

/**
 * There’s a second optional argument to each function you can also use: the index of the element within its selection.
 * The index is often useful for positioning elements sequentially.
 * Again by convention, this is often referred to as i
 */

circle.attr("cx", function(d, i) {return i *100 + 30;});

/**
 * Note that in SVG, the origin is in the top-left corner.
 *
 * -|------------------------> X
 *  |
 *  |
 *  |
 *  |
 *  |
 *  |
 *  \/
 *  Y
 */


var svg = d3.select("svg");
var circles = svg.selectAll("circle")
    .data([40, 56, 67, 130]);
var circleEnter = circles.enter().append("circle");



circleEnter.style("fill", "steelblue");
circleEnter.attr("cy", 60);
circleEnter.attr("cx", function(d, i) { return i * 100 + 30;});
circleEnter.attr("r", function(d) {return Math.sqrt(d);});

