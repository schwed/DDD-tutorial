/**
 * Created by kshevchuk on 6/24/2015.
 */



var svg = d3.select("svg");

/**
 * append single circle
 */

svg.append("circle")
    .attr("cx", 40)
    .attr("cy", 40)
    .attr("r", 25);

/**
 * transition
 */
svg.selectAll("circle")
    .enter().append("circle")
    .attr("r", 20)
    .transition()
    .attr("r", 50);



var data = [{"x": 1.0, "y": 1.1}, {"x": 2.0, "y": 2.5}, {"x": 3.0, "y": 3.5}];

svg.selectAll("circle")
.data(data)
.enter().append("circle")
.attr("cx", function(d) {return d.x;})
.attr("cy", function(d) {return d.y;})
.attr("r", 6);