/**
 * Created by kshevchuk on 6/23/2015.
 */
/**
 * Putting everything together, consider the three possible outcomes that result from joining data to elements:
 *
 * enter - incoming elements, entering the stage.
 * update - persistent elements, staying on stage.
 * exit - outgoing elements, exiting the stage.
 *
 * By default, the data join happens by index: the first element is bound to the first datum, and so on.
 * Thus, either the enter or exit selection will be empty, or both.
 * If there are more data than elements, the extra data are in the enter selection.
 * And if there are fewer data than elements, the extra elements are in the exit selection.
 *
 * You can control precisely which datum is bound to which element by specifying a key function to selection.data.
 * For example, by using the identity function,
 * you can rebind the circles to new data while ensuring that existing circles are rebound to the same value in the new data, if any.
 */

var svg = d3.select("svg");

var circle = svg.selectAll("circle")
    .data([360, 570, 690], function(d) { return d; });

circle.enter().append("circle")
    .attr("cy", 60)
    .attr("cx", function(d, i) { return i * 100 + 70; })
    .attr("r", function(d) { return Math.sqrt(d); });

circle.exit().remove();
