/**
 * Created by kshevchuk on 6/24/2015.
 */
/**
 * transition
 */
var data = [{"x": 1.0, "y": 1.1}, {"x": 2.0, "y": 2.5}, {"x":3.0, "y":3.5}];
var svg = d3.select("svg");
var circle = svg.selectAll("circle")
    .data(data);

circle.exit().remove();

circle.enter().append("circle")
    .attr("r", 2.5);

circle
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });


svg.selectAll("circle")
    .enter().append("circle")
    .attr("r", 20)
    .transition()
    .attr("r", 50);

