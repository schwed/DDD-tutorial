/**
 * Created by kshevchuk on 6/19/2015.
 */
/**
 * An external data file separates the chart implementation from its data,
 * making it easier to reuse the implementation on multiple data-sets
 * or even live data that changes over time
 *
 * Tab-separated values (TSV):
 *  name	value
 *  John	4
 *  Steven	8
 *  Bob 15
 *  Michael	16
 *  Jeff	23
 *  Ford	42
 *
 *  Loading data introduces a new complexity: downloads are asynchronous.
 *  When you call d3.tsv, it returns immediately while the file downloads in the background.
 *  At some point in the future when the download finishes, your callback function is invoked with the new data,
 *  or an error if the download failed
 *
 *  ------------------------------------------------------------------------------------
 *  // 1. Code here runs first, before the download starts.
 *
 *  d3.tsv("data.tsv", function(error, data) {
 *  // 3. Code here runs last, after the download finishes.
 *  });
 *
 *  // 2. Code here runs second, while the file is downloading.
 * -----------------------------------------------------------------------------------------
 *
 *  Thus we need to separate the chart implementation into two phases.
 *  First, we initialize as much as we can when the page loads and before the data is available.
 *  It’s good to set the chart size when the page loads, so that the page does not reflow after the data downloads.
 *  Second, we complete the remainder of the chart inside the callback function.
 */


var width = 420,
    barHeight = 20;

// x-scale in the same place as before
/**
 * NOTE: we call x.domain when we got the data
 */
var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

/**
 * To use this data in a web browser, we need to download the file from a web server and then parse it,
 * which converts the text of the file into usable JavaScript objects.
 *
 * var data = [
 *      {name: "Locke",    value:  4},
 *      {name: "Reyes",    value:  8},
 *      {name: "Ford",     value: 15},
 *      {name: "Jarrah",   value: 16},
 *      {name: "Shephard", value: 23},
 *      {name: "Kwon",     value: 42}
 * ];
 * Fortunately, these two tasks can be performed by a single function, d3.tsv.
 */

d3.tsv("../../data/data.tsv", type, function(error, data) {
    x.domain([0, d3.max(data, function(d) { return d.value; })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });


    /**
     * Any place in the old chart implementation we referred to d must now refer to d.value.
     * In particular, whereas before we could pass the scale x to compute the width of the bar,
     * we must now specify a function that passes the data value to the scale: function(d) { return x(d.value); }.
     * Likewise, when computing the maximum value from our data-set, we must pass
     * an accessor function to d3.max that tells it how to evaluate each data point.
     */
    bar.append("rect")
        .attr("width", function(d) { return x(d.value); })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d.value) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });
});


/**
 * Here’s one more gotcha with external data: types!
 * The name column contains strings while the value column contains numbers.
 * Unfortunately, d3.tsv isn’t smart enough to detect and convert types automatically.
 * Instead, we specify a type function that is passed as the second argument to d3.tsv.
 * This type conversion function can modify the data object representing each row,
 * modifying or converting it to a more suitable representation:
 */
function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}

