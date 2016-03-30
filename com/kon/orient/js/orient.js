// get all nodes
///var nodesData = orientdb.query('SELECT EXPAND( $c ) LET $a = ( SELECT name FROM System ), $b = ( SELECT name FROM TableShare ), $d = ( SELECT name FROM Files ), $f = ( SELECT name FROM Column ), $c = UNIONALL( $a, $b, $d, $f )', 10000);
//var nodesDataString = JSON.stringify(nodesData);
//'SELECT EXPAND( $c ) LET $a = ( SELECT name FROM System ), $b = ( SELECT name FROM TableShare ), $d = ( SELECT name FROM Files ), $f = ( SELECT name FROM Column ), $c = UNIONALL( $a, $b, $d, $f )'
//console.log(nodesDataString);
//var nodesData = orientdb.query('SELECT EXPAND( $c ) LET $a = ( SELECT name FROM System ), $b = ( SELECT name Expand(out()) FROM System ), $d = ( SELECT name Expand(out()) FROM TableShare ), $f = ( SELECT name Expand(out()) FROM Files ), $c = UNIONALL( $a, $b, $d, $f )', 100000);
//console.log(JSON.stringify(nodesData));
//exit;
// to check if object has property
Object.prototype.hasOwnProperty = function(property) {
    return typeof this[property] !== 'undefined';
};

//var allData = orientdb.query("traverse all() from System",10000);

var  graph = {"nodes" : [], "links" : []};

//aggregateData();


//function aggregateData() {

  //  allData.result.forEach(function(d) {
        // build nodes
      //  loop:
      //  if (!d.hasOwnProperty('name')) {continue loop;}
            // its a vertex
          //  graph.nodes.push({"name": d.name});


   // });



   // return graph;
//}


// rest api



// Nodes
var nodesData = orientdb.query("select from DNSVertex",10000);
//var nodesJson = JSON.stringify(nodesData);
//alert(nodesson);

// Links

//'SELECT EXPAND( $c ) LET $a = ( SELECT FROM DNSEdge ), $b = (SELECT FROM Feeds), $c = UNIONALL( $a, $b )'
var linksData = orientdb.query('SELECT EXPAND( $c ) LET $a = ( SELECT FROM DNSEdge ), $b = (SELECT FROM Feeds), $c = UNIONALL( $a, $b )',10000);
//var linksData = orientdb.query("select  from DNSEdge",10000);
//var linksJson = JSON.stringify(linksData);
//alert(linksJson);

nodesData.result.forEach(function(d, i) {
    graph.nodes.push({"name": d.name});

    rid = nodesData.result[i]['@rid'];
    var outEdge = null;
    var inEdge = null;
    if ( d.hasOwnProperty('out_DNSEdge') && d.hasOwnProperty('in_DNSEdge') ) {
        outEdge = nodesData.result[i]['out_DNSEdge'];
        inEdge = nodesData.result[i]['in_DNSEdge'];
    }

    //if (inEdge != null)


});










var tempData = '{"links": [';

for (var i = 0; i < linksData.result.length; ++i) {

    tempData +='{"source": '.concat('"').concat(linksData.result[i].in).concat('"')
        .concat(', "target": ').concat('"').concat(linksData.result[i].out).concat('"')
       .concat(', "value": "1"').concat('}');

    if (i + 1 <  linksData.result.length ) {
        tempData += ', ';
    }
}

tempData += '], "nodes": [';

for (var i = 0; i < nodesData.result.length; ++i) {
    var obj = nodesData.result[i];
    var rid;
    var j = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            ++j;
            if (j === 2) {
                rid = obj[key].toString();
                break;
            }
        }
    }


    tempData += '{"name": '.concat('"').concat(rid).concat('" }');

    if (i + 1 < nodesData.result.length) {
        tempData += ', ';
    }

}


tempData += ']}';

console.log(tempData);

tempData = JSON.parse(tempData);

//console.log(JSON.stringify(tempData));
nodesData = null;
linksData = null;

var units = "Widgets";

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 91200 - margin.left - margin.right,
    height = 40740 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20();

// append the svg canvas to the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(10)
    .size([width, height]);

var path = sankey.link();

// load the data
//d3.json("http://localhost:63342/DDD-tutorial/com/kpmg/sank/data/greenhouse.json", function(error, greenhouse) {


var nodeMap = {};
tempData.nodes.forEach(function(x) { nodeMap[x.name] = x; });
tempData.links = tempData.links.map(function(x) {
    return {
        source: nodeMap[x.source],
        target: nodeMap[x.target],
        value: x.value
    };
});

sankey
    .nodes(tempData.nodes)
    .links(tempData.links)
    .layout(32);

// add in the links
var link = svg.append("g").selectAll(".link")
    .data(tempData.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
link.append("title")
    .text(function(d) {
        return d.source.name + " ? " +
            d.target.name + "\n" + format(d.value); });

// add in the nodes
var node = svg.append("g").selectAll(".node")
    .data(tempData.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", function() {
            this.parentNode.appendChild(this); })
        .on("drag", dragmove));

// add the rectangles for the nodes
node.append("rect")
    .attr("height", function(d) { return d.dy; })
    .attr("width", sankey.nodeWidth())
    .style("fill", function(d) {
        return d.color = color(d.name.replace(/ .*/, "")); })
    .style("stroke", function(d) {
        return d3.rgb(d.color).darker(2); })
    .append("title")
    .text(function(d) {
        return d.name + "\n" + format(d.value); });

// add in the title for the nodes
node.append("text")
    .attr("x", -6)
    .attr("y", function(d) { return d.dy / 2; })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");

// the function for moving the nodes
function dragmove(d) {
    d3.select(this).attr("transform",
        "translate(" + (
            d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
        ) + "," + (
            d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
        ) + ")");
    sankey.relayout();
    link.attr("d", path);
}
//});

orientdb.close();
