/**
 * Created by kshevchuk on 7/15/2015.
 */

// for http rest authentication
var token = 'Basic ' + $.base64.encode('root:Genie.2013');


buildReport();

function buildReport() {
    //var vertexQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT FROM System where @rid = '#26:5'), $c = ( SELECT Expand(out()) FROM System where @rid = '#26:5' ), $d = ( SELECT Expand(out().out()) FROM System where @rid = '#26:5' ), $e = ( SELECT Expand(out().out().out()) FROM System where @rid = '#26:5'), $f = ( SELECT FROM System where @rid = '#26:10' ), $g = ( SELECT Expand(out()) FROM System where @rid = '#26:10' ), $h = ( SELECT Expand(out().out()) FROM System where @rid = '#26:10' ), $i = ( SELECT Expand(out().out().out()) FROM System where @rid = '#26:10' ), $a = UNIONALL( $b, $c, $d, $e, $i, $h, $g, $f )";
    //var vertexQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM System where direction = 'Source' ), $c = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM TableShare where direction = 'Source' ), $a = UNIONALL( $b, $c)";
    var vertexQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM System where direction = 'Source' ), $c = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM TableShare where direction = 'Source' ), $d = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM Files where direction = 'Source' ), $a = UNIONALL( $b, $c, $d)";


    //var vertexQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM System where direction = 'Source' ), $c = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM TableShare where direction = 'Source' ), $d = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM Files where direction = 'Source' ), $e = ( SELECT @rid, @class, name, direction FROM Column where direction = 'Source'), $a = UNIONALL( $b, $c, $d, $e )";
    var edgeQuery = "SELECT EXPAND( $c ) LET $a = ( SELECT FROM DNSEdge ), $b = (SELECT FROM Feeds), $c = UNIONALL( $a, $b )";

    queue(2)
        .defer(request, vertexQuery)
        .defer(request, edgeQuery)
        .awaitAll(ready);
}

function ready(error, results) {
    if (error) return; console.warn(error);
    //console.log(JSON.stringify(results));

    var vertexData = results[0];
    var edgeData = results[1];
    var graph = {"nodes" : [], "links" : []};

    buildNodes(vertexData, graph);
    buildLinks(vertexData, edgeData, graph);

    buildSankey(graph);

}

function request(query, callback) {
    d3.json("http://USMDCKDDB6042:2480/query/VisualDNS/sql/" + query + "/100000").header('Authorization', token).get(function (error, jsonData) {
        if (error) callback(error);
        else callback(null, jsonData);
    });
}

function buildNodes(vertexData, graph) {
    vertexData.result.forEach(function(d) {
        graph.nodes.push({"name": d.name});
    });
};

function buildLinks(vertexData, edgeData, graph) {
    var rid;
    var className;
    var direction;
    var outEdges;
    var name;
    vertexData.result.forEach(function(d, i) {
        rid = vertexData.result[i]['rid'];
        className = vertexData.result[i]['class'];
        direction = vertexData.result[i]['direction'];
        outEdges = vertexData.result[i]['out_DNSEdge'];
        name = vertexData.result[i]['name'];
        var targets = [];


        // SOURCE
        if (className === 'System' && direction === 'Source') {
            if (outEdges != null) {
                targets = matchTargets(vertexData, outEdges, edgeData);
            }
        }

        if (className === 'TableShare' && direction === 'Source') {
            if (outEdges != null) {
                targets = matchTargets(vertexData, outEdges, edgeData);
            }
        }

        if (className === 'Files' && direction === 'Source') {
            if (outEdges != null) {
                targets = matchTargets(vertexData, outEdges, edgeData);
            }
        }

        // TARGET
        if (className === 'System' && direction === 'Target') {
            if (outEdges != null) {
                targets = matchTargets(vertexData, outEdges, edgeData);
            }
        }

        if (className === 'TableShare' && direction === 'Target') {
            if (outEdges != null) {
                targets = matchTargets(vertexData, outEdges, edgeData);
            }
        }

        if (className === 'Files' && direction === 'Target') {
            if (outEdges != null) {
                targets = matchTargets(vertexData, outEdges, edgeData);
            }
        }


        targets.forEach(function (b, j) {
            graph.links.push({
                "source": name,
                "target": targets[j],
                "value": targets.length
            });
        });

    });
}

function matchTargets(vertexData, outEdges, edgeData) {
    var target = [];
    outEdges
        .map(function (d) {
            //go over each edge id from out_DNSEdge array
            return d;
        })
        .reduce(function (last, now) {
            // go over each Edge find one that has this rid and and capture 'in' field value
            edgeData.result.forEach(function (d, i) {
                if (edgeData.result[i]['@rid'] === now && last.indexOf(edgeData.result[i]['in']) < 0) {
                    last.push(edgeData.result[i]['in']);
                }
            });
            return last; // store all in fields that are the each vertex rid
        }, [])
        .reduce(function(last, now) {
            // go over each vertex and find one that has this rid and capture its name
            vertexData.result.forEach(function (d, i) {
                if (vertexData.result[i]['rid'] === now) {
                    target.push(vertexData.result[i]['name']);
                }
            });

        }, []);
    return target;
}

function buildSankey(graph) {
    //console.log(JSON.stringify(graph));

    var units = "Widgets"; // confidence

    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 1200 - margin.left - margin.right,
        height = 740 - margin.top - margin.bottom;

    var formatNumber = d3.format(",.0f"),    // zero decimal places
        format = function (d) {
            return formatNumber(d) + " " + units;
        },
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
    graph.nodes.forEach(function (x) {
        nodeMap[x.name] = x;
    });
    graph.links = graph.links.map(function (x) {
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
        .style("stroke-width", function (d) {
            return Math.max(1, d.dy);
        })
        .sort(function (a, b) {
            return b.dy - a.dy;
        });

    // add the link titles
    link.append("title")
        .text(function (d) {
            return d.source.name + " ? " +
                d.target.name + "\n" + format(d.value);
        });

    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .call(d3.behavior.drag()
            .origin(function (d) {
                return d;
            })
            .on("dragstart", function () {
                this.parentNode.appendChild(this);
            })
            .on("drag", dragmove));
    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function (d) {
            return d.dy;
        })
        .attr("width", sankey.nodeWidth())
        .style("fill", function (d) {
            return d.color = color(d.name.replace(/ .*/, ""));
        })
        .style("stroke", function (d) {
            return d3.rgb(d.color).darker(2);
        })
        .append("title")
        .text(function (d) {
            return d.name + "\n" + format(d.value);
        });

    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function (d) {
            return d.dy / 2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) {
            return d.name;
        })
        .filter(function (d) {
            return d.x < width / 2;
        })
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



