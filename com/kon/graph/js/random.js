/**
 * Created by kshevchuk on 6/24/2015.
 */

var format = d3.time.format("%a %b %d %Y");
var amountFn = function(d) { return d.amount };
var dateFn = function(d) { return format.parse(d.created_at) };

var JSONData = [
    { "id": 3, "created_at": "Sun May 05 2013", "amount": 12000},
    { "id": 1, "created_at": "Mon May 13 2013", "amount": 2000},
    { "id": 2, "created_at": "Thu Jun 06 2013", "amount": 17000},
    { "id": 4, "created_at": "Thu May 09 2013", "amount": 15000},
    { "id": 5, "created_at": "Mon Jul 01 2013", "amount": 16000}
];

(function() {
    var data = JSONData.slice();
    var x = d3.time.scale()
        .range([10, 280])
        .domain(d3.extent(data, dateFn));

    var y = d3.scale.linear()
        .range([180, 10])
        .domain(d3.extent(data, amountFn));
    var svg = d3.select("#demoAddRandom").append("svg:svg")
        .attr("width", 300)
        .attr("height", 200);

    var refreshGraph = function() {
        svg.selectAll("circle").data(data).enter()
            .append("svg:circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(dateFn(d)) })
            .attr("cy", function(d) { return y(amountFn(d)) })
            .on("click", function(d) {
                d3.select("#demoAddRandom .value").text("Date: " + d.created_at + " amount: " + d.amount)
            })
    };


    d3.selectAll(".add-data")
        .on("click", function() {
            var start = d3.min(data, dateFn);
            var end = d3.max(data, dateFn);
            var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

            obj = {
                'id': Math.floor(Math.random()*70),
                'amount': Math.floor(1000 + Math.random()*20001),
                'created_at': date.toDateString()
            };
            data.push(obj);
            refreshGraph()
        });

    refreshGraph()
})();

