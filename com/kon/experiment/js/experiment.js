/**
 * Created by kshevchuk on 7/27/2015.
 */
// for http rest authentication
//var token = 'Basic ' + $.base64.encode('root:Genie.2013');


buildReport();

function buildReport() {
    //var vertexQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT FROM System where @rid = '#26:5'), $c = ( SELECT Expand(out()) FROM System where @rid = '#26:5' ), $d = ( SELECT Expand(out().out()) FROM System where @rid = '#26:5' ), $e = ( SELECT Expand(out().out().out()) FROM System where @rid = '#26:5'), $f = ( SELECT FROM System where @rid = '#26:10' ), $g = ( SELECT Expand(out()) FROM System where @rid = '#26:10' ), $h = ( SELECT Expand(out().out()) FROM System where @rid = '#26:10' ), $i = ( SELECT Expand(out().out().out()) FROM System where @rid = '#26:10' ), $a = UNIONALL( $b, $c, $d, $e, $i, $h, $g, $f )";
    //var vertexQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM System where direction = 'Source' ), $c = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM TableShare where direction = 'Source' ), $a = UNIONALL( $b, $c)";
    //var vertexQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM System where direction = 'Source' ), $c = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM TableShare where direction = 'Source' ), $d = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM Files where direction = 'Source' ), $a = UNIONALL( $b, $c, $d)";


    //var vertexQuery = "SELECT EXPAND( $a ) LET $b = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM System where direction = 'Source' ), $c = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM TableShare where direction = 'Source' ), $d = ( SELECT @rid, @class, name, direction, out_DNSEdge FROM Files where direction = 'Source' ), $e = ( SELECT @rid, @class, name, direction FROM Column where direction = 'Source'), $a = UNIONALL( $b, $c, $d, $e )";
    //var edgeQuery = "SELECT EXPAND( $c ) LET $a = ( SELECT FROM DNSEdge ), $b = (SELECT FROM Feeds), $c = UNIONALL( $a, $b )";
    var vertexQuery = "allnodes.json";
    var edgeQuery = "alledges.json";
    queue(2)
        .defer(request, vertexQuery)
        .defer(request, edgeQuery)
        .awaitAll(ready);
}

function ready(error, results) {
    if (error) {
        console.warn(error);
        return;
    }
    //console.log(JSON.stringify(results));

    var vertexData = results[0];
    var edgeData = results[1];
    var graph = {"nodes" : [], "links" : []};


    buildNodes(vertexData, graph);
    buildLinks(vertexData, edgeData, graph);

    buildSankey(graph);

}

function request(query, callback) {
    //d3.json("http://USMDCKDDB6042:2480/query/VisualDNS/sql/" + query + "/100000").header('Authorization', token).get(function (error, jsonData) {
    d3.json("http://localhost:63342/DDD-tutorial/com/kpmg/experiment/data/" + query, function(error, jsonData) {
        if (error) callback(error);
        else callback(null, jsonData);
    });
}

function buildNodes(vertexData, graph) {
    vertexData.result.forEach(function(d, i) {
        if (d.direction === 'Target') return;
        graph.nodes.push({"name": d.name});
    });
};

function buildLinks(vertexData, edgeData, graph) {
    var rid;
    var className;
    var direction;
    var outEdges;
    var name;
    var targets = [];
    vertexData.result.forEach(function(d, i) {
        rid = vertexData.result[i]['@rid'];
        className = vertexData.result[i]['@class'];
        direction = vertexData.result[i]['direction'];
        outEdges = vertexData.result[i]['out_DNSEdge'];
        name = vertexData.result[i]['name'];


        // function needs this to be valid
        if (outEdges == null || outEdges.length < 1) return;

        // SOURCE
        if (className === 'System' && direction === 'Source') {

            // get TableShare targets
            targets = matchTargets(vertexData, outEdges, edgeData);

        }

        if (className === 'TableShare' && direction === 'Source') {

            // get Files targets
            targets = matchTargets(vertexData, outEdges, edgeData);

        }

        if (className === 'Files' && direction === 'Source') {

            // get Column targets
            targets = matchTargets(vertexData, outEdges, edgeData);

        }

        /*
         // TARGET
         if (className === 'System' && direction === 'Target') {

         targets = matchTargets(vertexData, outEdges, edgeData);

         }

         if (className === 'TableShare' && direction === 'Target') {

         targets = matchTargets(vertexData, outEdges, edgeData);

         }

         if (className === 'Files' && direction === 'Target') {

         targets = matchTargets(vertexData, outEdges, edgeData);

         }
         */


        targets.forEach(function (b, j) {
            graph.links.push({
                "source": name,
                "target": targets[j],
                "value": targets.length
            });
        });

        /**
         * Using .splice() will work perfectly,
         * but since .splice() function will return an array with all the removed items,
         * it will actually return a copy of the original array.
         * Benchmarks suggests that this has no effect on performance whatsoever
         */
        targets.splice(0, targets.length);
    });
}

function buildTargets(vertexData, outEdges, edgeData) {
    var target = [];
    var last = [];
    //go over each edge id from out_DNSEdge array that was obtained per each vertex
    outEdges.forEach(function (a) {

        // go over each Edge find one that has this rid and and capture 'in' field value
        edgeData.result.forEach(function (b, j) {
            if (edgeData.result[j]['@rid'] === a) {
                if ($.inArray(edgeData.result[j]['in'], last) === -1) {
                    // store all in fields that are the each vertex rid
                    last.push(edgeData.result[j]['in']);
                }
            }
        });
    });
    // go over each vertex and find one that has this rid and capture its name
    vertexData.result.forEach(function (d, i) {

        if ($.inArray(vertexData.result[i]['in'], last) !== -1) {
            target.push(vertexData.result[i]['name']);
        }
    });
    return target;
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
                if (edgeData.result[i]['@rid'] === now) {
                    if ($.inArray(edgeData.result[i]['in'], last) === -1) {
                        last.push(edgeData.result[i]['in']);
                    }
                }
            });
            return last; // store all in fields that are the each vertex rid
        }, [])
        .reduce(function(last, now) {
            // go over each vertex and find one that has this rid and capture its name
            vertexData.result.forEach(function (d, i) {
                if (vertexData.result[i]['@rid'] === now) {
                    target.push(vertexData.result[i]['name']);
                }
            });

        }, []);
    return target;
}

function buildSankey(graph) {
    function a(a) {
        d3.select(this).attr("transform", "translate(" + a.x + "," + (a.y = Math.max(0, Math.min(j - a.dy, d3.event.y))) + ")"),
            m.relayout(),
            p.attr("d", o)
    }
    function b(a) {
        n.transition().duration(200).style("opacity", .95),
            n.html("<div class='popup-label'>"
                + "LINEAGE"
                + "</div><div class='popup-line'><span class='popup-label'>Source</span><span class='popup-value'>"
                + a.source.name
                + "</span></div><div class='popup-line'><span class='popup-label'>Target</span><span class='popup-value'>"
                + a.target.name
                + "</span></div><div class='popup-line'><span class='popup-label'>Weight </span><span class='popup-value'>"
                + a.value.toFixed(1) + "</span></div><div class='popup-line'><span class='popup-label'>ID </span><span class='popup-value'>"
                + a.source.name + " -> " + a.target.name
                + "</span></div><div class='popup-line'><span class='popup-label'>Confidence </span><span class='popup-value'>"
                + a.value + "</span></div>").style("left", d3.event.pageX
                + 15 + "px").style("top", d3.event.pageY - 28 + "px")
    }
    function c(a) {
        n.transition().duration(200).style("opacity", .95),
            n.html("<div class='popup-label'>"
                + a.name.toUpperCase()
                + " (" + a.name
                + ")</div><div class='popup-line'><span class='popup-title'>"
                + a.name
                + "</span></div><div class='popup-line'><span class='popup-label'>ID</span><span class='popup-value'>"
                + a.name + "</span></div><div class='popup-line'><span class='popup-label'>Weight </span><span class='popup-value'>"
                + a.value.toFixed(0) + "</span></div>").style("left", d3.event.pageX + 15
                + "px").style("top", d3.event.pageY - 28 + "px")
    }
    function d() {
        n.transition().duration(500).style("opacity", 0)
    }

    // --------------------------------------------------------- //


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

    var f = graph.nodes,
        g = graph.links;

    console.log("graph Nodes: " + f.length),
    console.log("graph Links: " + g.length);

    var h = {
            top: 5,
            right: 300,
            bottom: 5,
            left: 200
        }
        , i = 1300 - h.left - h.right
        , j = 10 * f.length - h.top - h.bottom
        , k = (d3.format(",.0f"), d3.scale.category20())
        , l = d3.select("#content").append("svg").attr("width", i + h.left + h.right).attr("height", j + h.top + h.bottom).append("g").attr("transform", "translate(" + h.left + "," + h.top + ")")
        , m = d3.sankey().nodeWidth(10).nodePadding(10).size([i, j])
        , n = d3.select("#content").append("div").attr("class", "popup").style("opacity", 0)
        , o = m.link();


    m.nodes(f).links(g).layout(32);
    var p = l.append("g")
            .selectAll(".link")
            .data(g)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", o)
            .style("stroke-width", function(a) {
                return Math.max(1, a.dy)
            })
            /*
            .style("stroke", function(d) {
                if (d.value > 80)
                return "#00FF00";
                return "#000";
            })*/
            .sort(function(a, b) {
                return b.dy - a.dy
            })
            .on("mouseover", function(a) {
                b(a)
            })
            .on("mouseout", function(a) {
                d(a)
            })
        ,
        q = l.append("g")
            .selectAll(".node")
            .data(f)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(a) {
                return "translate(" + a.x + "," + a.y + ")"
            })
            .call(d3.behavior
                .drag()
                .origin(function(a) {
                    return a
                })
                .on("dragstart", function() {
                    this.parentNode.appendChild(this)
                })
                .on("drag", a))
            .on("click", function(a) {
                window.open(a.name, "_self", !0);
                //alert("Clicked!");
            })
            .on("mouseover", function(a) {
                c(a)
            })
            .on("mouseout", function(a) {
                d(a)
            })
            .on("contextmenu", function(a) {
                window.open("/#dummy/" + a.name, "_self", !0),
                    d3.event.preventDefault()
            });
    return q.append("rect")
        .attr("height", function(a) {
            return a.dy
        })
        .attr("width", m.nodeWidth()).style("fill", function(a) {
            return a.color = k(a.name.toString().replace(/ .*/, ""))
        })
        .style("stroke", function(a) {
            return d3.rgb(a.color).darker(2)
        }),
        q.append("text")
            .attr("x", 16).attr("y", function(a) {
                return a.dy / 2
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .attr("transform", null )
            .text(function(a) {
                return a.name
            })
            .filter(function(a) {
                return a.x < i / 2
            })
            .attr("x", 0 - m.nodeWidth())
            .attr("text-anchor", "end"),
        //$(this.el).append(this.template()),
        this
}



d3.sankey = function () {
    function a() {
        n.forEach(function (a) {
            a.sourceLinks = [], a.targetLinks = []
        }),

        o.forEach(function (a) {
            var b = a.source, c = a.target;
            "number" == typeof b && (b = a.source = n[a.source]),
            "number" == typeof c && (c = a.target = n[a.target]),
                b.sourceLinks.push(a), c.targetLinks.push(a)
        })
    }

    function b() {
        n.forEach(function (a) {
            a.value = Math.max(d3.sum(a.sourceLinks, i), d3.sum(a.targetLinks, i))
        })
    }

    function c() {
        function a(d) {
            if (d.index = c++,
                    d.lowIndex = d.index,
                    d.onStack = !0,
                    b.push(d),
                d.sourceLinks && (d.sourceLinks.forEach(function (b) {
                    var c = b.target;
                    c.hasOwnProperty("index") ? c.onStack && (d.lowIndex = Math.min(d.lowIndex, c.index)) : (a(c), d.lowIndex = Math.min(d.lowIndex, c.lowIndex))
                }),
                d.lowIndex === d.index)
            ) {
                var e, f = [];
                do e = b.pop(), e.onStack = !1, f.push(e);
                while (e != d);
                p.push({root: d, scc: f})
            }
        }

        var b = [], c = 0;
        n.forEach(function (b) {
            b.index || a(b)
        }),
            p.forEach(function (a, b) {
                a.index = b,
                    a.scc.forEach(function (a) {
                        a.component = b
                    })
            })
    } // end of function c

    function d() {
        function a() {
            for (var a, b, c = p, d = 0; c.length;)
                a = [], b = {},
                    c.forEach(function (c) {
                        c.x = d,
                            c.scc.forEach(function (d) {
                                d.sourceLinks.forEach(function (d) {
                                    b.hasOwnProperty(d.target.component) || d.target.component == c.index || (a.push(p[d.target.component]), b[d.target.component] = !0)
                                })
                            })
                    }),
                    c = a,
                    ++d

        }

        function b(a, b) {
            for (var c = [a], d = 1, e = 0, f = 0; d > 0;) {
                var g = c.shift();
                if (d--, !g.hasOwnProperty("x")) {
                    g.x = f, g.dx = k;
                    var h = b(g);
                    c = c.concat(h), e += h.length
                }
                0 == d && (f++, d = e, e = 0)
            }
        }

        a(),
            p.forEach(function (a, c) {
                b(a.root, function (a) {
                    var b = a.sourceLinks.filter(function (a) {
                        return a.target.component == c
                    }).map(function (a) {
                        return a.target
                    });
                    return b
                })
            });
        var c = 0, d = d3.nest().key(function (a) {
            return a.x
        }).sortKeys(d3.ascending).entries(p).map(function (a) {
            return a.values
        }), c = -1, f = -1;
        d.forEach(function (a) {
            a.forEach(function (a) {
                a.x = c + 1, a.scc.forEach(function (b) {
                    b.x = a.x + b.x, f = Math.max(f, b.x)
                })
            }), c = f
        }),
            n.filter(function (a) {
                var b = a.sourceLinks.filter(function (a) {
                    return a.source.name != a.target.name
                });
                return 0 == b.length
            }).forEach(function (a) {
                a.x = c
            }), e((m[0] - k) / Math.max(c, 1))
    } // end of function d

    function e(a) {
        n.forEach(function (b) {
            b.x *= a
        })
    }

    function f(a) {
        function b() {
            var a = d3.min(g, function (a) {
                return (m[1] - (a.length - 1) * l) / d3.sum(a, i)
            });
            g.forEach(function (b) {
                b.forEach(function (b, c) {
                    b.y = c, b.dy = b.value * a
                })
            }), o.forEach(function (b) {
                b.dy = b.value * a
            })
        }

        function c(a) {
            function b(a) {
                return h(a.source) * a.value
            }

            g.forEach(function (c) {
                c.forEach(function (c) {
                    if (c.targetLinks.length) {
                        var d = d3.sum(c.targetLinks, b) / d3.sum(c.targetLinks, i);
                        c.y += (d - h(c)) * a
                    }
                })
            })
        }

        function d(a) {
            function b(a) {
                return h(a.target) * a.value
            }

            g.slice().reverse().forEach(function (c) {
                c.forEach(function (c) {
                    if (c.sourceLinks.length) {
                        var d = d3.sum(c.sourceLinks, b) / d3.sum(c.sourceLinks, i);
                        c.y += (d - h(c)) * a
                    }
                })
            })
        }

        function e() {
            g.forEach(function (a) {
                var b, c, d, e = 0, g = a.length;
                for (a.sort(f), d = 0; g > d; ++d)
                    b = a[d], c = e - b.y, c > 0 && (b.y += c), e = b.y + b.dy + l;
                if (c = e - l - m[1], c > 0)
                    for (e = b.y -= c, d = g - 2; d >= 0; --d)
                        b = a[d], c = b.y + b.dy + l - e, c > 0 && (b.y -= c), e = b.y
            })
        }

        function f(a, b) {
            return a.y - b.y
        }

        var g = d3.nest().key(function (a) {
            return a.x
        }).sortKeys(d3.ascending).entries(n).map(function (a) {
            return a.values
        });
        b(), e();
        for (var j = 1; a > 0; --a)
            d(j *= .99), e(), c(j), e()
    } // end of function f

    function g() {
        function a(a, b) {
            return a.source.y - b.source.y
        }

        function b(a, b) {
            return a.target.y - b.target.y
        }

        n.forEach(function (c) {
            c.sourceLinks.sort(b), c.targetLinks.sort(a)
        }), n.forEach(function (a) {
            var b = 0, c = 0;
            a.sourceLinks.forEach(function (a) {
                a.sy = b, b += a.dy
            }), a.targetLinks.forEach(function (a) {
                a.ty = c, c += a.dy
            })
        })
    } // end of function g

    function h(a) {
        return a.y + a.dy / 2
    }

    function i(a) {
        return a.value
    }

    var j = {}, k = 24, l = 8, m = [1, 1], n = [], o = [], p = [];


    return j.nodeWidth = function (a) {
        return arguments.length ? (k = +a, j) : k
    },
    j.nodePadding = function (a) {
         return arguments.length ? (l = +a, j) : l
    },
    j.nodes = function (a) {
         return arguments.length ? (n = a, j) : n
    },
    j.links = function (a) {
         return arguments.length ? (o = a, j) : o
    },
    j.size = function (a) {
         return arguments.length ? (m = a, j) : m
    },
    j.layout = function (e) {
         return a(), b(), c(), d(), f(e), g(), j
    },
    j.relayout = function () {
         return g(), j
    },
    j.reversibleLink = function () {
         function a(a, b) {
             var d = b.source.x + b.source.dx, e = b.target.x, f = d3.interpolateNumber(d, e), g = f(c), h = f(1 - c), i = b.source.y + b.sy, j = b.target.y + b.ty, k = b.source.y + b.sy + b.dy, l = b.target.y + b.ty + b.dy;
             switch (a) {
                case 0:
                    return "M" + d + "," + i + "L" + d + "," + (i + b.dy);
                case 1:
                    return "M" + d + "," + i + "C" + g + "," + i + " " + h + "," + j + " " + e + "," + j + "L" + e + "," + l + "C" + h + "," + l + " " + g + "," + k + " " + d + "," + k + "Z";
                case 2:
                    return "M" + e + "," + j + "L" + e + "," + (j + b.dy)
                }
            }

            function b(a, b) {
                function c(a) {
                    return a.source.y + a.sy > a.target.y + a.ty ? -1 : 1
                }

                function d(a, b) {
                    return a + "," + b + " "
                }

                var e = 30, f = 15, g = c(b) * f, h = b.source.x + b.source.dx, i = b.source.y + b.sy, j = b.target.x, k = b.target.y + b.ty;
                switch (a) {
                    case 0:
                        return "M" + d(h, i) + "C" + d(h, i) + d(h + e, i) + d(h + e, i + g) + "L" + d(h + e, i + g + b.dy) + "C" + d(h + e, i + b.dy) + d(h, i + b.dy) + d(h, i + b.dy) + "Z";
                    case 1:
                        return "M" + d(h + e, i + g) + "C" + d(h + e, i + 3 * g) + d(j - e, k - 3 * g) + d(j - e, k - g) + "L" + d(j - e, k - g + b.dy) + "C" + d(j - e, k - 3 * g + b.dy) + d(h + e, i + 3 * g + b.dy) + d(h + e, i + g + b.dy) + "Z";
                    case 2:
                        return "M" + d(j - e, k - g) + "C" + d(j - e, k) + d(j, k) + d(j, k) + "L" + d(j, k + b.dy) + "C" + d(j, k + b.dy) + d(j - e, k + b.dy) + d(j - e, k + b.dy - g) + "Z"
                }
            }

            var c = .5;
            return function (c) {
                return function (d) {
                    return d.source.x < d.target.x ? a(c, d) : b(c, d)
                }
            }
    },
    j.link = function () {
         function a(a) {
            var c = a.source.x + a.source.dx, d = a.target.x, e = d3.interpolateNumber(c, d), f = e(b), g = e(1 - b), h = a.source.y + a.sy + a.dy / 2, i = a.target.y + a.ty + a.dy / 2;
               return "M" + c + "," + h + "C" + f + "," + h + " " + g + "," + i + " " + d + "," + i
            }

            var b = .5;
            return a.curvature = function (c) {
                return arguments.length ? (b = +c, a) : b
            }, a
    }, j
};

/*
function getData() {
    return {
        "nodes": [{
            "node": 0,
            "name": "CDE: Loan_Amount",
            "isCDE": "Yes",
            "isOrphan": "No",
            "isHighestConf": "Yes"
        }, {
            "node": 1,
            "name": "Sys5.schm.tbl.attr1",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "Yes"
        }, {
            "node": 2,
            "name": "Sys4.schm.tbl.attr2",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "No"
        }, {
            "node": 3,
            "name": "Sys4.schm.tbl.attr3",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "Yes"
        }, {
            "node": 4,
            "name": "Sys4.schm.tbl.attr4",
            "isCDE": "No",
            "isOrphan": "Yes",
            "isHighestConf": "No"
        }, {
            "node": 5,
            "name": "Sys3.schm.tbl.attr5",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "No"
        }, {
            "node": 6,
            "name": "Sys3.schm.tbl.attr6",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "Yes"
        }, {
            "node": 7,
            "name": "Sys3.schm.tbl.attr7",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "Yes"
        }, {
            "node": 8,
            "name": "Sys2.schm.tbl.attr8",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "Yes"
        }, {
            "node": 9,
            "name": "Sys2.schm.tbl.attr9",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "Yes"
        }, {
            "node": 10,
            "name": "Sys1.schm.tbl.attr10",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "No"
        }, {
            "node": 11,
            "name": "Sys1.schm.tbl.attr11",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "Yes"
        }, {
            "node": 12,
            "name": "Sys1.schm.tbl.attr12",
            "isCDE": "No",
            "isOrphan": "No",
            "isHighestConf": "No"
        }],
        "links": [{
            "source": 1,
            "target": 0,
            "value": 100,
            "isHighestConf": "Yes",
            "transformation": "None"
        }, {
            "source": 2,
            "target": 1,
            "value": 38,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 3,
            "target": 1,
            "value": 97,
            "isHighestConf": "Yes",
            "transformation": "None"
        }, {
            "source": 4,
            "target": 1,
            "value": 42,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 5,
            "target": 2,
            "value": 40,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 6,
            "target": 2,
            "value": 20,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 7,
            "target": 2,
            "value": 20,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 5,
            "target": 3,
            "value": 39,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 6,
            "target": 3,
            "value": 91,
            "isHighestConf": "Yes",
            "transformation": "None"
        }, {
            "source": 7,
            "target": 3,
            "value": 4,
            "confidence": 43,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 8,
            "target": 5,
            "value": 37,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 9,
            "target": 5,
            "value": 4,
            "confidence": 39,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 8,
            "target": 6,
            "value": 40,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 8,
            "target": 7,
            "value": 40,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 9,
            "target": 7,
            "value": 10,
            "isHighestConf": "Yes",
            "transformation": "None"
        }, {
            "source": 10,
            "target": 8,
            "value": 42,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 11,
            "target": 8,
            "value": 10,
            "isHighestConf": "Yes",
            "transformation": "None"
        }, {
            "source": 12,
            "target": 8,
            "value": 40,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 10,
            "target": 9,
            "value": 40,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 11,
            "target": 9,
            "value": 40,
            "isHighestConf": "No",
            "transformation": "None"
        }, {
            "source": 12,
            "target": 9,
            "value": 20,
            "isHighestConf": "Yes",
            "transformation": "None"
        }]
    };
}

buildSankeyDiagram();
function buildSankeyDiagram() {
    var graphData = getData();
    buildSankey(graphData);
}
    */