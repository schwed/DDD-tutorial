/**
 * Created by kshevchuk on 7/15/2015.
 */

var  graph = {"nodes" : [], "links" : []};
//var nodesQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT @rid, @class, name, direction FROM System where direction = 'Source' ), $c = ( SELECT @rid, @class, name, direction FROM TableShare where direction = 'Source' ), $d = ( SELECT @rid, @class, name, direction FROM Files where direction = 'Source' ), $e = ( SELECT @rid, @class, name, direction FROM Column where direction = 'Source'), $f = ( SELECT @rid, @class, name, direction FROM Column where direction = 'Target' ), $g = ( SELECT @rid, @class, name, direction FROM Files where direction = 'Target' ), $h = ( SELECT @rid, @class, name, direction FROM TableShare where direction = 'Target' ), $i = ( SELECT @rid, @class, name, direction FROM System where direction = 'Target' ), $a = UNIONALL( $b, $c, $d, $e, $f, $g, $h, $i )";
var nodesQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT @rid, @class, name, direction FROM System where direction = 'Source' ), $c = ( SELECT @rid, @class, name, direction FROM TableShare where direction = 'Source' ), $d = ( SELECT @rid, @class, name, direction FROM Files where direction = 'Source' ), $e = ( SELECT @rid, @class, name, direction FROM Column where direction = 'Source'), $a = UNIONALL( $b, $c, $d, $e )";

var nodesData = orientdb.query(nodesQuery,10000);
//console.log(JSON.stringify(nodesData));

buildNodes();
buildLinks();
buildReport();

function buildReport() {
    var units = "Widgets";

    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 1200 - margin.left - margin.right,
        height = 60740 - margin.top - margin.bottom;

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


    var nodeMap = {};
    graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
    graph.links = graph.links.map(function(x) {
        return {
            source: nodeMap[x.source],
            target: nodeMap[x.target],
            value: x.value
        };
    });

    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
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
        .data(graph.nodes)
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

}

function buildNodes() {
    nodesData.result.forEach(function(d) {
        graph.nodes.push({"name": d.name});
    });
}

function buildLinks() {
    var tableShareData = [];
    var filesData = [];
    var columnsData = [];

    nodesData.result.forEach(function (a, i) {
        // SOURCE DESTINATION
        //rid = d.rid;
        rid = nodesData.result[i]['rid'];
        if (a.class == 'System' && a.direction == 'Source') {

            var tableShare = getTarget("select Expand(out()) from System where @rid = '" + rid + "'");
            // console.log(JSON.stringify(tableShareData));
            tableShare.result.forEach(function (b, j) {
                // source: System, target: tableShare, value: increment
                graph.links.push({"source": a.name, "target": b.name, "value": tableShare.result.length});


                // files
                var files = getTarget("select Expand(out().out()) from System where @rid = '" + rid + "'");
                files.result.forEach(function (c, k) {
                    // source: tableShare, target: Files, value: increment
                    graph.links.push({"source": b.name, "target": c.name, "value": files.result.length});


                    // column
                    var columns = getTarget("select Expand(out().out().out()) from System where @rid = '" + rid + "'");
                    columns.result.forEach(function(d) {
                        // source: Files, target: Column, value: increment
                        graph.links.push({"source": c.name, "target": d.name, "value": columns.result.length});

                    });
                });

            });


        }
    });

    /*
    if (tableShareData != null && tableShareData.length > 0) {
        tableShareData[0].result.forEach(function (c, k) {
            tsRid = tableShareData[0].result[k]['@rid'];

            filesData.push(getTarget("select Expand(out()) from TableShare where @rid = '" + tsRid + "'"));
            filesData[0].result.forEach(function (f) {
                // source: tableShare, target: Files, value: increment
                graph.links.push({"source": c.name, "target": f.name, "value": filesData[0].result.length});

            });
        });

        // empty the array as we don't need it
        tableShareData.splice(0, tableShareData.length);
    }

    if (filesData != null && filesData.length > 0) {
        filesData[0].result.forEach(function (g, m) {
            fRid = filesData[0].result[m]['@rid'];

            columnsData.push(getTarget("select Expand(out()) from Files where @rid = '" + fRid + "'"));
            columnsData[0].result.forEach(function(h) {
                // source: Files, target: Column, value: increment
                graph.links.push({"source": g.name, "target": h.name, "value": columnsData[0].result.length});

           });
        });

        // empty the array as we don't need it
        filesData.splice(0,filesData.length);
    }
    */
    console.log(graph);


    // COLUMNS LINKS USE NAMES
    // source: Column(name), target: Column(name), value: increment

    // TARGET SOURCE
    // source: Column, target: Files, value: increment


    // source: Files, target: tableShare, value: increment


    // source: tableShare, target: System, value: increment


    //graph.links.push({"source": d.source, "target": d.target, "value": +d.value});


}

function getTarget(queryString) {

    return orientdb.query(queryString,10000);
}

orientdb.close();
