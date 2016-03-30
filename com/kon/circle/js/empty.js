/**
 * Created by kshevchuk on 6/23/2015.
 */
/**
 * What if we have no existing elements, such as with an empty page?
 * Then we’re joining data to an empty selection, and all data ends up in enter.
 * This pattern is so common, you’ll often see the selectAll + data + enter + append methods called sequentially,
 * one immediately after the other.
 * Despite it being common, keep in mind that this is just one special case of a data join.
 */

var svg = d3.select("svg")
    .selectAll("circle")
    .data([60, 80, 140, 290, 240, 300])
    .enter().append("circle")
    .attr("cy", 60)
    .attr("cx", function(d, i) {return i * 100 + 30;})
    .attr("r", function(d) {return Math.sqrt(d);});


