// insert data for sankey
var graph = getData();
// other necessary information
buildSankey(graph);

function buildSankey(graph) {
  var units = "Widgets";

  var margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var formatNumber = d3.format(",.0f"), // zero decimal places
    format = function(d) {
      return formatNumber(d) + " " + units;
    },
    color = d3.scale.category20();

  // append the svg canvas to the page
  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Set the sankey diagram properties
  var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);

  var path = sankey.link();

  // putting those information into the sankey diagram
  sankey.nodes(graph.nodes).links(graph.links).layout(32);

  // add in the links
  // add in the links
  var link = svg.append("g").selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke-width", function(d) {
      return Math.max(1, d.dy);
    })
    .sort(function(a, b) {
      return b.dy - a.dy;
    });

  // add the link titles
  link.append("title")
    .text(function(d) {
      return d.source.name + " → " +
        d.target.name + "\n" + format(d.value);
    });

  // add in the nodes
  var node = svg.append("g").selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .call(d3.behavior.drag()
      .origin(function(d) {
        return d;
      })
      .on("dragstart", function() {
        this.parentNode.appendChild(this);
      })
      .on("drag", dragmove));

  // add the rectangles for the nodes
  node.append("rect")
    .attr("height", function(d) {
      return d.dy;
    })
    .attr("width", sankey.nodeWidth())
    .style("fill", function(d) {
      return d.color = color(d.name.replace(/ .*/, ""));
    })
    .style("stroke", function(d) {
      return d3.rgb(d.color).darker(2);
    })
    .append("title")
    .text(function(d) {
      return d.name + "\n" + format(d.value);
    });

  // add in the title for the nodes
  node.append("text")
    .attr("x", -6)
    .attr("y", function(d) {
      return d.dy / 2;
    })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function(d) {
      return d.name;
    })
    .filter(function(d) {
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
};

function getData() {
  return {
    "nodes": [{
      "node": 0,
      "name": "LogicalName : Definition",
      "sampleValues": "52,25",
      "isCDE": "Yes",
      "isOrphan": "No",
      "isHighestConf": "Yes"
    }, {
      "node": 1,
      "name": "Sys5.schm.tbl.attr1",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "Yes"
    }, {
      "node": 2,
      "name": "Sys4.schm.tbl.attr2",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "No"
    }, {
      "node": 3,
      "name": "Sys4.schm.tbl.attr3",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "Yes"
    }, {
      "node": 4,
      "name": "Sys4.schm.tbl.attr4",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "Yes",
      "isHighestConf": "No"
    }, {
      "node": 5,
      "name": "Sys3.schm.tbl.attr5",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "No"
    }, {
      "node": 6,
      "name": "Sys3.schm.tbl.attr6",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "Yes"
    }, {
      "node": 7,
      "name": "Sys3.schm.tbl.attr7",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "Yes"
    }, {
      "node": 8,
      "name": "Sys2.schm.tbl.attr8",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "Yes"
    }, {
      "node": 9,
      "name": "Sys2.schm.tbl.attr9",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "Yes"
    }, {
      "node": 10,
      "name": "Sys1.schm.tbl.attr10",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "No"
    }, {
      "node": 11,
      "name": "Sys1.schm.tbl.attr11",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "Yes"
    }, {
      "node": 12,
      "name": "Sys1.schm.tbl.attr12",
      "sampleValues": "52,25",
      "isCDE": "No",
      "isOrphan": "No",
      "isHighestConf": "No"
    }],
    "links": [{
      "source": 0,
      "target": 1,
      "value": 10,
      "isHighestConf": "Yes",
      "transformation": "None",
      "desc": "LogicalName -> Sys5.schm.tbl.attr1"
    }, {
      "source": 1,
      "target": 2,
      "value": 6,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys5.schm.tbl.attr1 -> Sys4.schm.tbl.attr2"
    }, {
      "source": 1,
      "target": 3,
      "value": 10,
      "isHighestConf": "Yes",
      "transformation": "None",
      "desc": "Sys5.schm.tbl.attr1 -> Sys4.schm.tbl.attr3"
    }, {
      "source": 1,
      "target": 4,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys5.schm.tbl.attr1 -> Sys4.schm.tbl.attr4"
    }, {
      "source": 2,
      "target": 5,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys4.schm.tbl.attr2 -> Sys3.schm.tbl.attr5"
    }, {
      "source": 2,
      "target": 6,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys4.schm.tbl.attr2 -> Sys3.schm.tbl.attr6"
    }, {
      "source": 2,
      "target": 7,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys4.schm.tbl.attr2 -> Sys3.schm.tbl.attr7"
    }, {
      "source": 3,
      "target": 5,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys4.schm.tbl.attr3 -> Sys3.schm.tbl.attr5"
    }, {
      "source": 3,
      "target": 6,
      "value": 9,
      "isHighestConf": "Yes",
      "transformation": "None",
      "desc": "Sys4.schm.tbl.attr3 -> Sys3.schm.tbl.attr6"
    }, {
      "source": 3,
      "target": 7,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys4.schm.tbl.attr3 -> Sys3.schm.tbl.attr7"
    }, {
      "source": 5,
      "target": 8,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys3.schm.tbl.attr5 -> Sys2.schm.tbl.attr8"
    }, {
      "source": 5,
      "target": 9,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys3.schm.tbl.attr5 -> Sys2.schm.tbl.attr9"
    }, {
      "source": 6,
      "target": 8,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys3.schm.tbl.attr6 -> Sys2.schm.tbl.attr8"
    }, {
      "source": 7,
      "target": 8,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys3.schm.tbl.attr7 -> Sys2.schm.tbl.attr8"
    }, {
      "source": 7,
      "target": 9,
      "value": 10,
      "isHighestConf": "Yes",
      "transformation": "None",
      "desc": "Sys3.schm.tbl.attr7 -> Sys2.schm.tbl.attr9"
    }, {
      "source": 8,
      "target": 10,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys2.schm.tbl.attr8 -> Sys1.schm.tbl.attr10"
    }, {
      "source": 8,
      "target": 11,
      "value": 10,
      "isHighestConf": "Yes",
      "transformation": "None",
      "desc": "Sys2.schm.tbl.attr8 -> Sys1.schm.tbl.attr10"
    }, {
      "source": 8,
      "target": 12,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys2.schm.tbl.attr8 -> Sys1.schm.tbl.attr12"
    }, {
      "source": 9,
      "target": 10,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys2.schm.tbl.attr9 -> Sys1.schm.tbl.attr10"
    }, {
      "source": 9,
      "target": 11,
      "value": 7,
      "isHighestConf": "No",
      "transformation": "None",
      "desc": "Sys2.schm.tbl.attr9 -> Sys1.schm.tbl.attr11"
    }, {
      "source": 9,
      "target": 12,
      "value": 9,
      "isHighestConf": "Yes",
      "transformation": "None",
      "desc": "Sys2.schm.tbl.attr9 -> Sys1.schm.tbl.attr12"
    }]
  };
}
