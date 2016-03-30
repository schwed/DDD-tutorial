/**
 * Created by kshevchuk on 6/19/2015.
 */
var width = 960,
    height = 500;

/**
 * When renaming the x scale to the y scale,
 * the range becomes [height, 0] rather than [0, width].
 * This is because the origin of SVG’s coordinate system is in the top-left corner.
 * We want the zero-value to be positioned at the bottom of the chart, rather than the top.
 * Likewise this means that we need to position the bar rects by setting the "y" and "height" attributes,
 * whereas before we only needed to set "width".
 * (The default value of the "x" attribute is zero, and the old bars were left-aligned.)
 * ----------------------------------
 * var x = d3.scale.linear()
 .      range([0, width]);
 * ------------------------------------
 */

var y = d3.scale.linear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

d3.tsv("../data/data.tsv", type, function(error, data) {
    y.domain([0, d3.max(data, function(d) { return d.value; })]);


    /**
     * We previously multiplied the var barHeight by the index of each data point (0, 1, 2, …) to produce fixed-height bars.
     * The resulting chart’s height thus depended on the size of the data-set.
     * -----------------------------------------------------------
     *       chart.attr("height", barHeight * data.length);
     * ------------------------------------------------------------
     * But here the opposite behavior is desired: the chart width is fixed and the bar width variable.
     * So rather than fix the barHeight,
     * now we compute the barWidth by dividing the available chart width by the size of the data-set, data.length.
     */

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", barWidth - 1);


    /**
     * Lastly, the bar labels must be positioned differently for columns rather than bars,
     * centered just below the top of the column.
     * The new "dy" attribute value of ".75em" anchors the label at approximately the text’s cap height rather than the baseline.
     */
    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { return y(d.value) + 3; })
        .attr("dy", ".75em")
        .text(function(d)
        { return d.value; });
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}