/**
 * Created by kshevchuk on 6/19/2015.
 */
var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

/**
 * set the svg element’s size
 * so that we can compute the height based on the size of the dataset (data.length).
 * This way, the size is based on the height of each bar rather than the overall height of the chart,
 * and we ensure adequate room for labels.
 */

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

/**
 * SVG elements must be positioned relative to the top-left corner of the container
 * Each bar consists of a g element which in turn contains a rect and a text.
 * We use a data join (an enter selection) to create a g element for each data point.
 * We then translate the g element vertically, creating a local origin for positioning the bar and its associated label.
 *
 * <g transform="translate(0,40)">
 *      <rect width="150" height="19"></rect>
 *      <text x="147" y="9.5" dy=".35em">15</text>
 * </g>
 */

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

/**
 * text position must be offset by three pixels from the end of the bar,
 * while the dy offset is used to center the text vertically
 */

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
