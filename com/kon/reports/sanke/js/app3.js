window.utils = {
    loadTemplate: function(a, b) {
        var c = [];
        $.each(a, function(a, b) {
            window[b] ?
                c.push($.get("tpl/" + b + ".html", function(a) {window[b].prototype.template = _.template(a)}))
                : alert(b + " not found")
        }),
        $.when.apply(null , c).done(b)
    },
    displayValidationErrors: function(a) {
        for (var b in a)
            a.hasOwnProperty(b) && this.addValidationError(b, a[b]);
        this.showAlert("Warning!", "Fix validation errors and try again", "alert-warning")
    },
    addValidationError: function(a, b) {
        var c = $("#" + a).parent().parent();
        c.addClass("error"),
        $(".help-inline", c).html(b)
    },
    removeValidationError: function(a) {
        var b = $("#" + a).parent().parent();
        b.removeClass("error"),
        $(".help-inline", b).html("")
    },
    showAlert: function(a, b, c) {
        $(".alert").removeClass("alert-error alert-warning alert-success alert-info"),
        $(".alert").addClass(c),
        $(".alert").html("<strong>" + a + "</strong> " + b),
        $(".alert").show()
    },
    hideAlert: function() {
        $(".alert").hide()
    }
},
window.MdDbStat = Backbone.Model.extend({
    urlRoot: "/stat/0",
    idAttribute: "type_nm"
}),
window.MdDbStatCollection = Backbone.Collection.extend({
    url: "/stat/0",
    model: MdDbStat
}),
window.MdStat = Backbone.Model.extend({
    urlRoot: "/stat/1",
    idAttribute: "type_id"
}),
window.MdStatCollection = Backbone.Collection.extend({
    url: "/stat/1",
    model: MdStat
}),
window.MdTreeObject = Backbone.Model.extend({
    urlRoot: "/tree",
    idAttribute: "object_id"
}),
window.MdTreeObjectCollection = Backbone.Collection.extend({
    initialize: function(a, b) {
        this.url = b.cd >= 0 ? "/tree/" + b.id + "/" + b.cd : "/tree/" + b.id
    },
    model: MdTreeObject
}),
window.MdSearchObject = Backbone.Model.extend({
    urlRoot: "/search",
    idAttribute: "object_id"
}),
window.MdSearchCollection = Backbone.Collection.extend({
    initialize: function(a, b) {
        this.url = "/search/" + b.name
    },
    model: MdSearchObject
}),
window.MdObject = Backbone.Model.extend({
    urlRoot: "/objects",
    initialize: function(a, b) {
        this.url = b.id > 0 ? "edit" == b.edit ? "/objects/edit/" + b.id : "/objects/" + b.id : "/objects"
    },
    idAttribute: "object_id",
    validateAll: function() {
        var a = {};
        for (var b in this.validators)
            if (this.validators.hasOwnProperty(b)) {
                var c = this.validators[b](this.get(b));
                c.isValid === !1 && (a[b] = c.message)
            }
        return _.size(a) > 0 ? {
            isValid: !1,
            messages: a
        } : {
            isValid: !0
        }
    }
}),
window.MdObjectCollection = Backbone.Collection.extend({
    model: MdObject,
    url: "/objects"
}),
window.MdProperty = Backbone.Model.extend({
    urlRoot: "/properties",
    idAttribute: "property_id"
}),
window.MdPropertyCollection = Backbone.Collection.extend({
    initialize: function(a, b) {
        this.url = "/properties/" + b.id
    },
    model: MdProperty
}),
window.MdRelation = Backbone.Model.extend({
    urlRoot: "/relations",
    idAttribute: "relation_id"
}),
window.MdRelationCollection = Backbone.Collection.extend({
    initialize: function(a, b) {
        this.url = "/relations/" + b.id
    },
    model: MdRelation
}),
window.MdObjectPath = Backbone.Model.extend({
    urlRoot: "/path",
    idAttribute: "object_id"
}),
window.MdObjectPathCollection = Backbone.Collection.extend({
    model: MdObjectPath,
    initialize: function(a, b) {
        this.url = "/path/" + b.id
    }
}),
window.MdGlossary = Backbone.Model.extend({
    urlRoot: "/glossary",
    idAttribute: "object_id",
    initialize: function(a, b) {
        this.url = b.id > 0 ? "edit" == b.edit ? "/glossary/edit/" + b.id : "/glossary/" + b.id : "/glossary"
    }
}),
window.MdGlossaryCollection = Backbone.Collection.extend({
    model: MdGlossary,
    initialize: function(a, b) {
        this.url = "/glossaries/" + b.id
    }
}),
window.MdConcept = Backbone.Model.extend({
    urlRoot: "/concept",
    idAttribute: "object_id",
    initialize: function(a, b) {
        this.url = b.id > 0 ? "edit" == b.edit ? "/concept/edit/" + b.id : "/concept/" + b.id : "/concept"
    }
}),
window.MdConceptCollection = Backbone.Collection.extend({
    model: MdConcept,
    initialize: function(a, b) {
        this.url = "/concepts/" + b.id
    }
}),
window.MdDepFrom = Backbone.Model.extend({
    urlRoot: "/dependencies",
    idAttribute: "object_id"
}),
window.MdDepFromCollection = Backbone.Collection.extend({
    model: MdDepFrom,
    initialize: function(a, b) {
        this.url = "/dependencies/" + b.dir + "/" + b.rcd + "/" + b.cd + "/" + b.id
    }
}),
window.MdDepTo = Backbone.Model.extend({
    urlRoot: "/dependencies",
    idAttribute: "object_id"
}),
window.MdDepToCollection = Backbone.Collection.extend({
    model: MdDepTo,
    initialize: function(a, b) {
        this.url = "/dependencies/" + b.dir + "/" + b.rcd + "/" + b.cd + "/" + b.id
    }
}),
window.MdTransf = Backbone.Model.extend({
    urlRoot: "/treegraph",
    idAttribute: "id"
}),
window.MdTransfCollection = Backbone.Collection.extend({
    model: MdTransf,
    initialize: function(a, b) {
        this.url = "/treegraph/" + b.dir + "/" + b.rcd + "/" + b.cd + "/" + b.id
    }
}),
window.MdGraph = Backbone.Model.extend({
    urlRoot: "/graph",
    idAttribute: "id"
}),
window.MdGraphCollection = Backbone.Collection.extend({
    model: MdGraph,
    initialize: function(a, b) {
        this.url = "/graph/" + b.rcd + "/" + b.cd + "/" + b.pid
    }
}),
window.AboutView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        return $(this.el).html(this.template()),
        this
    }
}),
window.AdminAppView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        $(this.el).html(this.template())
    }
}),
window.AdminAppHomeView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        $(this.el).html(this.template())
    }
}),
window.AdminDatamapView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        return $(this.el).html(this.template($.extend({
            cnt: this.options.cnt
        }, {
            txt: this.options.txt
        }, {
            object_id: this.options.object_id
        }))),
        this
    }
}),
window.DepGraphHeadView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = "icon-" + this.options.title.toLowerCase().replace(" ", "-");
        cdList = this.options.cd,
        graphType = this.options.rcd,
        "1" == graphType && (graphName = "",
        relName = "Lineage"),
        "2" == graphType && (graphName = "",
        relName = "Impact");
        for (var b = cdList.split(","), c = 0; c < depTab.length; c++)
            for (var d = 0; d < b.length; d++)
                if (depTab[c].cd == b[d]) {
                    depTab[c].isChecked = !0;
                    break
                }
        return $(this.el).html(this.template($.extend({
            cnt: this.options.cnt
        }, {
            title: this.options.title
        }, {
            parent: this.options.parent
        }, {
            name: this.options.name
        }, {
            object_id: this.options.object_id
        }, {
            cd: this.options.cd
        }, {
            rcd: this.options.rcd
        }, {
            iconName: a
        }))),
        this
    },
    events: {
        "click .reload": "clickReload",
        "click .lineage": "clickLineage",
        "click .impact": "clickImpact"
    },
    clickReload: function() {
        console.log("Click Reload..."),
        console.log("Types Checked #: ", $(".ObjectTypeDropdown").dropdownCheckbox("checked").length),
        cdList = null ;
        for (var a = 0; a < $(".ObjectTypeDropdown").dropdownCheckbox("checked").length; a++)
            cdList = null  == cdList ? $(".ObjectTypeDropdown").dropdownCheckbox("checked")[a].cd : cdList + "," + $(".ObjectTypeDropdown").dropdownCheckbox("checked")[a].cd;
        console.log("Types Checked: ", cdList),
        app.navigate("#graph/" + graphType + "/" + cdList + "/" + selId, {
            trigger: !0
        })
    },
    clickLineage: function() {
        console.log("Click Lineage..."),
        1 != graphType && app.navigate("#graph/1/" + cdList + "/" + selId, {
            trigger: !0
        })
    },
    clickImpact: function() {
        console.log("Click Impact..."),
        2 != graphType && app.navigate("#graph/2/" + cdList + "/" + selId, {
            trigger: !0
        })
    }
}),
window.DepGraphView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        function a(a) {
            d3.select(this).attr("transform", "translate(" + a.x + "," + (a.y = Math.max(0, Math.min(j - a.dy, d3.event.y))) + ")"),
            m.relayout(),
            p.attr("d", o)
        }
        function b(a) {
            n.transition().duration(200).style("opacity", .95),
            n.html("<div class='popup-label'>" + relName.toUpperCase() + "</div><div class='popup-line'><span class='popup-label'>Source</span><span class='popup-value'>" + a.source.parent_nm + "." + a.source.object_nm + "</span></div><div class='popup-line'><span class='popup-label'>Target</span><span class='popup-value'>" + a.target.parent_nm + "." + a.target.object_nm + "</span></div><div class='popup-line'><span class='popup-label'>Weight </span><span class='popup-value'>" + a.value.toFixed(1) + "</span></div><div class='popup-line'><span class='popup-label'>ID </span><span class='popup-value'>" + a.source.name + " -> " + a.target.name + "</span></div><div class='popup-line'><span class='popup-label'>Conditions </span><span class='popup-value'>" + a.condition_ds + "</span></div>").style("left", d3.event.pageX + 15 + "px").style("top", d3.event.pageY - 28 + "px")
        }
        function c(a) {
            n.transition().duration(200).style("opacity", .95),
            n.html("<div class='popup-label'>" + a.type_nm.toUpperCase() + " (" + a.type_cd + ")</div><div class='popup-line'><span class='popup-title'>" + a.parent_nm + "." + a.object_nm + "</span></div><div class='popup-line'><span class='popup-label'>ID</span><span class='popup-value'>" + a.name + "</span></div><div class='popup-line'><span class='popup-label'>Weight </span><span class='popup-value'>" + a.value.toFixed(0) + "</span></div>").style("left", d3.event.pageX + 15 + "px").style("top", d3.event.pageY - 28 + "px")
        }
        function d() {
            n.transition().duration(500).style("opacity", 0)
        }
        var e = this.model.models
          , f = (e.length,
        e[0].get("nodes"))
          , g = e[0].get("links");
        console.log("Qraph Query JSON Length (KB): " + JSON.stringify(e).length / 1024),
        console.log("Qraph Nodes: " + f.length),
        console.log("Qraph Links: " + g.length),
        $(".graphSize").html("(" + f.length + "," + g.length + ")");
        var h = {
            top: 5,
            right: 300,
            bottom: 5,
            left: 200
        }
          , i = 1300 - h.left - h.right
          , j = 10 * f.length - h.top - h.bottom
          , k = (d3.format(",.0f"),
        d3.scale.category20())
          , l = d3.select(this.el).append("svg").attr("width", i + h.left + h.right).attr("height", j + h.top + h.bottom).append("g").attr("transform", "translate(" + h.left + "," + h.top + ")")
          , m = d3.sankey().nodeWidth(10).nodePadding(10).size([i, j])
          , n = d3.select(this.el).append("div").attr("class", "popup").style("opacity", 0)
          , o = m.link();
        m.nodes(f).links(g).layout(32);
        var p = l.append("g").selectAll(".link").data(g).enter().append("path").attr("class", "link").attr("d", o).style("stroke-width", function(a) {
            return Math.max(1, a.dy)
        }
        ).sort(function(a, b) {
            return b.dy - a.dy
        }
        ).on("mouseover", function(a) {
            b(a)
        }
        ).on("mouseout", function(a) {
            d(a)
        }
        )
          , q = l.append("g").selectAll(".node").data(f).enter().append("g").attr("class", "node").attr("transform", function(a) {
            return "translate(" + a.x + "," + a.y + ")"
        }
        ).call(d3.behavior.drag().origin(function(a) {
            return a
        }
        ).on("dragstart", function() {
            this.parentNode.appendChild(this)
        }
        ).on("drag", a)).on("click", function(a) {
            window.open("#graph/" + graphType + "/" + cdList + "/" + a.name, "_self", !0)
        }
        ).on("mouseover", function(a) {
            c(a)
        }
        ).on("mouseout", function(a) {
            d(a)
        }
        ).on("contextmenu", function(a) {
            window.open("/#objects/" + a.name, "_self", !0),
            d3.event.preventDefault()
        }
        );
        return q.append("rect").attr("height", function(a) {
            return a.dy
        }
        ).attr("width", m.nodeWidth()).style("fill", function(a) {
            return a.color = k(a.type_cd.toString().replace(/ .*/, ""))
        }
        ).style("stroke", function(a) {
            return d3.rgb(a.color).darker(2)
        }
        ),
        q.append("text").attr("x", 16).attr("y", function(a) {
            return a.dy / 2
        }
        ).attr("dy", ".35em").attr("text-anchor", "start").attr("transform", null ).text(function(a) {
            return a.object_nm
        }
        ).filter(function(a) {
            return a.x < i / 2
        }
        ).attr("x", 0 - m.nodeWidth()).attr("text-anchor", "end"),
        $(this.el).append(this.template()),
        this
    }
}),
window.DepNavView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        $(this.el).html(this.options.id > 0 ? '<div class="well sidebar-nav"><ul class="nav nav-list"><li><a href="#dependencies/t/2/163,1013,1015,1603/' + this.options.id + '"><i class="icon-chevron-left icon-black"></i><strong>' + this.options.nm + '</strong></a></li><li class="active"><a href="#dependencies/t/2/163,1013,1015,1603/' + a[0].get("parent_id").toString() + '"><i class="icon-current icon-white"></i><strong>' + a[0].get("parent_nm").toString() + "</strong></a></li></ul></div>" : a[0].get("parent_id") > 0 ? '<div class="well sidebar-nav"><ul class="nav nav-list"><li><a href="#dep/0"><i class="icon-home icon-black"></i><strong>Root Objects</strong></a></li><li class="active"><a href="#dependencies/t/2/163,1013,1015,1603/' + a[0].get("parent_id").toString() + '"><i class="icon-current icon-white"></i><strong>' + a[0].get("parent_nm").toString() + "</strong></a></li></ul></div>" : '<div class="well sidebar-nav"><ul class="nav nav-list"><li class="active"><a href="#dep/0"><i class="icon-home icon-black"></i><strong>Root Objects</strong></a></li></ul></div>');
        for (var c = "", d = 0; b > d; d++)
            a[d].get("type_id") >= 1e3 && a[d].get("type_id") <= 2e3 && (c != a[d].get("type_nm").toString() && $(".nav-list", this.el).append('<li class="nav-header">' + a[d].get("type_nm").toString() + "</li>"),
            c = a[d].get("type_nm").toString(),
            $(".nav-list", this.el).append(new DepNavItemView({
                model: a[d],
                objectId: this.options.objectId
            }).render().el));
        return this
    }
}),
window.DepNavItemView = Backbone.View.extend({
    tagName: "li",
    initialize: function() {
        this.model.bind("change", this.render, this),
        this.model.bind("destroy", this.close, this)
    },
    render: function() {
        var a = this.model.get("object_id").toString()
          , b = this.model.get("object_nm").toString()
          , c = b
          , d = this.model.get("type_id").toString()
          , e = this.model.get("type_nm").toString()
          , f = "icon-" + e.toLowerCase().replace(" ", "-") + " icon-black"
          , g = this.model.get("count").toString();
        return b.length >= 27 && 0 == g && (b = b.substring(0, 28) + ".."),
        b.length >= 23 && g > 0 && (b = b.substring(0, 24) + ".."),
        this.options.objectId == a ? $(this.el).addClass("active").html(g > 0 ? '<a href="#dependencies/t/2/' + d + ",163,1013,1015,1603/" + a + '" title="' + c + '"><i class="' + f + '"></i>' + b + "(" + g + ")</a>" : '<a href="#dependencies/t/2/' + d + ",163,1013,1015,1603/" + a + '" title="' + c + '"><i class="' + f + '"></i>' + b + "</a>") : $(this.el).html(g > 0 ? '<a href="#dependencies/t/2/' + d + ",163,1013,1015,1603/" + a + '" title="' + c + '"><i class="' + f + '"></i>' + b + "(" + g + ")</a>" : '<a href="#dependencies/t/2/' + d + ",163,1013,1015,1603/" + a + '" title="' + c + '"><i class="' + f + '"></i>' + b + "</a>"),
        this
    }
});
var cdList = null ;
window.DepTreeHeadView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = "icon-" + this.options.title.toLowerCase().replace(" ", "-");
        return console.log("DepTreeHeadView: ", this.options.title),
        $(this.el).html(this.template($.extend({
            cnt: this.options.cnt
        }, {
            title: this.options.title
        }, {
            parent: this.options.parent
        }, {
            name: this.options.name
        }, {
            object_id: this.options.object_id
        }, {
            cd: this.options.cd
        }, {
            rcd: this.options.rcd
        }, {
            dir: this.options.dir
        }, {
            iconName: a
        }))),
        this
    },
    events: {
        "click .reload": "clickReload",
        "click .lineage": "clickLineage",
        "click .impact": "clickImpact"
    },
    clickReload: function() {
        console.log("Click Reload..."),
        console.log("Types Checked #: ", $(".ObjectTypeDropdown").dropdownCheckbox("checked").length),
        cdList = null ;
        for (var a = 0; a < $(".ObjectTypeDropdown").dropdownCheckbox("checked").length; a++)
            cdList = null  == cdList ? $(".ObjectTypeDropdown").dropdownCheckbox("checked")[a].cd : cdList + "," + $(".ObjectTypeDropdown").dropdownCheckbox("checked")[a].cd;
        console.log("Types Checked: ", cdList),
        app.navigate("#treegraph/" + this.options.dir + "/" + this.options.rcd + "/" + cdList + "/" + this.options.object_id, {
            trigger: !0
        })
    },
    clickLineage: function() {
        console.log("Click Lineage...", this.options.rcd),
        1 != this.options.rcd && app.navigate("#treegraph/" + this.options.dir + "/1/" + this.options.cd + "/" + this.options.object_id, {
            trigger: !0
        })
    },
    clickImpact: function() {
        console.log("Click Impact...", this.options.rcd),
        2 != this.options.rcd && app.navigate("#treegraph/" + this.options.dir + "/2/" + this.options.cd + "/" + this.options.object_id, {
            trigger: !0
        })
    }
}),
window.DepTreeView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        function a(a) {
            if (a.children) {
                v = (a.y ? n - 40 : n) / (1 - a.y),
                w = o / a.dx,
                p.domain([a.y, 1]).range([a.y ? 40 : 0, n]),
                q.domain([a.x, a.x + a.dx]);
                var c = u.transition().duration(d3.event.altKey ? 7500 : 750).attr("transform", function(a) {
                    return "translate(" + p(a.y) + "," + q(a.x) + ")"
                }
                );
                c.select("rect").attr("width", a.dy * v).attr("height", function(a) {
                    return a.dx * w
                }
                ),
                c.select("text").attr("transform", b).style("opacity", function(a) {
                    return a.dx * w > 8 ? 1 : 0
                }
                ),
                d3.event.stopPropagation()
            }
        }
        function b(a) {
            return "translate(8," + a.dx * w / 2 + ")"
        }
        var c = this.model.models
          , d = (c.length,
        this.options.rcd)
          , e = this.options.id
          , f = (this.options.cd,
        this.options.dir)
          , g = (e.split(",").length,
        c[0].get("pid").children.length)
          , h = JSON.stringify(c[0].get("pid")).match(/\"name\"\:/g).length;
        if (cdList = this.options.cd,
        "s" == f)
            ;if ("t" == f)
            ;if ("1" == d)
            var i = "";
        if ("2" == d)
            var i = "";
        for (var j = [{
            id: "1",
            label: "ETL Package",
            isChecked: !1,
            cd: 1400
        }, {
            id: "2",
            label: "ETL Task",
            isChecked: !1,
            cd: 1401
        }, {
            id: "3",
            label: "Mapping Group",
            isChecked: !1,
            cd: 150
        }, {
            id: "4",
            label: "Mapping",
            isChecked: !1,
            cd: 151
        }, {
            id: "5",
            label: "Schema",
            isChecked: !1,
            cd: 1004
        }, {
            id: "6",
            label: "File",
            isChecked: !1,
            cd: 163
        }, {
            id: "7",
            label: "Table",
            isChecked: !1,
            cd: 1015
        }, {
            id: "8",
            label: "View",
            isChecked: !1,
            cd: 1013
        }, {
            id: "9",
            label: "Column",
            isChecked: !1,
            cd: 1016
        }, {
            id: "10",
            label: "BI Folder",
            isChecked: !1,
            cd: 1601
        }, {
            id: "11",
            label: "BI Report",
            isChecked: !1,
            cd: 1603
        }, {
            id: "12",
            label: "BI Object",
            isChecked: !1,
            cd: 1604
        }], k = cdList.split(","), l = 0; l < j.length; l++)
            for (var m = 0; m < k.length; m++)
                if (j[l].cd == k[m]) {
                    j[l].isChecked = !0;
                    break
                }
        $(".ObjectTypeDropdown").dropdownCheckbox({
            data: j,
            autosearch: !1,
            title: "Filter by object types",
            hideHeader: !0,
            showNbSelected: !0,
            templateButton: '<button class="dropdown-checkbox-toggle btn btn-mini" data-toggle="dropdown-checkbox" href="#"> Object Types                                 <span class="dropdown-checkbox-nbselected"></span>                                 <b class="caret"></b>                               </button>'
        }),
        console.log("Types Checked #: ", $(".ObjectTypeDropdown").dropdownCheckbox("checked").length),
        $(".graphType").html(i),
        $(".graphSize").html("(" + g + "," + h + ")");
        {
            var n = 1200
              , o = 650
              , p = d3.scale.linear().range([0, n])
              , q = d3.scale.linear().range([0, o])
              , r = d3.select(this.el).append("div").attr("class", "chart").style("width", n + "px").style("height", o + "px").append("svg:svg").attr("width", n).attr("height", o)
              , s = d3.layout.partition().value(function(a) {
                return a.size
            }
            )
              , t = c[0];
            root = t.get("pid")
        }
        root.name = "Selection";
        var u = r.selectAll("g").data(s.nodes(root)).enter().append("svg:g").attr("transform", function(a) {
            return "translate(" + p(a.y) + "," + q(a.x) + ")"
        }
        ).on("click", a)
          , v = n / root.dx
          , w = o / 1;
        return u.append("svg:rect").attr("width", root.dy * v).attr("height", function(a) {
            return a.dx * w
        }
        ).attr("class", function(a) {
            return a.children ? "parent" : "child"
        }
        ),
        u.append("svg:text").attr("transform", b).attr("dy", ".35em").style("opacity", function(a) {
            return a.dx * w > 8 ? 1 : 0
        }
        ).text(function(a) {
            return a.name
        }
        ),
        d3.select(window).on("click", function() {
            a(root)
        }
        ),
        $(this.el).append(this.template()),
        this
    }
}),
window.DepAppView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        $(this.el).html(this.template())
    }
}),
window.DepAppHomeView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        $(this.el).html(this.template())
    }
}),
window.DepHeadView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = "icon-" + this.options.title.toLowerCase().replace(" ", "-");
        cdList = this.options.cd,
        cdList = this.options.cd,
        graphType = this.options.rcd,
        "1" == graphType && (graphName = "",
        relName = "Lineage"),
        "2" == graphType && (graphName = "",
        relName = "Impact");
        for (var b = cdList.split(","), c = 0; c < depTab.length; c++)
            for (var d = 0; d < b.length; d++)
                if (depTab[c].cd == b[d]) {
                    depTab[c].isChecked = !0;
                    break
                }
        return $(this.el).html(this.template($.extend({
            cnt: this.options.cnt
        }, {
            title: this.options.title
        }, {
            parent: this.options.parent
        }, {
            name: this.options.name
        }, {
            object_id: this.options.object_id
        }, {
            cd: this.options.cd
        }, {
            rcd: this.options.rcd
        }, {
            iconName: a
        }))),
        this
    },
    events: {
        "click .reload": "clickReload",
        "click .lineage": "clickLineage",
        "click .impact": "clickImpact"
    },
    clickReload: function() {
        console.log("Click Reload..."),
        console.log("Types Checked #: ", $(".ObjectTypeDropdown").dropdownCheckbox("checked").length),
        cdList = null ;
        for (var a = 0; a < $(".ObjectTypeDropdown").dropdownCheckbox("checked").length; a++)
            cdList = null  == cdList ? $(".ObjectTypeDropdown").dropdownCheckbox("checked")[a].cd : cdList + "," + $(".ObjectTypeDropdown").dropdownCheckbox("checked")[a].cd;
        console.log("Types Checked: ", cdList),
        app.navigate("dependencies/s/" + this.options.rcd + "/" + cdList + "/" + this.options.object_id, {
            trigger: !0
        })
    },
    clickLineage: function() {
        console.log("Click Lineage..."),
        1 != this.options.rcd && app.navigate("dependencies/s/1/" + this.options.cd + "/" + this.options.object_id, {
            trigger: !0
        })
    },
    clickImpact: function() {
        console.log("Click Impact..."),
        2 != this.options.rcd && app.navigate("dependencies/s/2/" + this.options.cd + "/" + this.options.object_id, {
            trigger: !0
        })
    }
}),
window.DepSubHeadView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        return $(this.el).html(this.template($.extend({
            cnt: this.options.cnt
        }, {
            txt: this.options.txt
        }, {
            object_id: this.options.object_id
        }, {
            cd: this.options.cd
        }))),
        this
    }
}),
window.DepFromView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        if (1 > b)
            var c = 0;
        else
            var c = b;
        $(".srcSize").html(b),
        $(this.el).append(new DepSubHeadView({
            txt: '<i class="icon-chevron-left icon-black"></i> Dependent Sources',
            cnt: c,
            object_id: this.options.id,
            cd: this.options.cd
        }).render().el);
        for (var d = 0; b > d; d++)
            "" != a[d].get("object_nm").toString() && $(".table", this.el).append(new DepItemView({
                model: a[d],
                dir: this.options.dir,
                rcd: this.options.rcd,
                cd: this.options.cd
            }).render().el);
        return this
    }
}),
window.DepToView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        if (1 > b)
            var c = 0;
        else
            var c = b;
        $(".tgtSize").html(b),
        $(this.el).append(new DepSubHeadView({
            txt: '<i class="icon-chevron-right icon-black"></i> Dependent Targets',
            cnt: c,
            object_id: this.options.id,
            cd: this.options.cd
        }).render().el);
        for (var d = 0; b > d; d++)
            "" != a[d].get("object_nm").toString() && $(".table", this.el).append(new DepItemView({
                model: a[d],
                dir: this.options.dir,
                rcd: this.options.rcd,
                cd: this.options.cd
            }).render().el);
        return this
    }
}),
window.DepItemView = Backbone.View.extend({
    tagName: "tr",
    initialize: function() {
        this.model.bind("change", this.render, this),
        this.model.bind("destroy", this.close, this)
    },
    render: function() {
        var a = "icon-" + this.model.get("object_type_nm").toString().toLowerCase().replace(" ", "-")
          , b = this.model.get("query_id").split(",").length;
        return $(this.el).html(this.template($.extend(this.model.toJSON(), {
            queryCnt: b
        }, {
            iconName: a
        }, {
            dir: this.options.dir
        }, {
            rcd: this.options.rcd
        }, {
            cd: this.options.cd
        }))),
        this
    }
}),
window.GlossaryHomeView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        $(this.el).html(this.template())
    }
}),
window.GlossaryHeadView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {}
}),
window.GlossaryRootView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        $(this.el).append('<ul class="nav nav-list"></ul>');
        for (var c = "", d = 0; b > d; d++)
            c != a[d].get("type_nm").toString() && $(".nav-list", this.el).append('<li class="nav-header">' + a[d].get("type_nm").toString() + " GLOSSARY</li>"),
            c = a[d].get("type_nm").toString(),
            "" != a[d].get("object_nm").toString() && $(".nav-list", this.el).append('<li><a href="#glossary/' + a[d].get("object_id").toString() + '" title="' + a[d].get("object_ds") + '""><i class="icon-conceptsystem"></i>' + a[d].get("object_nm").toString().substr(0, 25) + "(" + a[d].get("glossary_cnt").toString() + "/" + a[d].get("concept_cnt").toString() + ")</a></li>")
    }
}),
window.GlossaryTreeView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        $(this.el).html(0 == this.options.pid ? a[0].get("parent_object_id") > 0 ? '<ul class="nav nav-list"><li class="active"><a href="#glossary/' + a[0].get("parent_object_id").toString() + '"><i class="icon-current icon-white"></i><strong>' + a[0].get("parent_object_nm").toString() + "</strong></a></li></ul>" : '<ul class="nav nav-list"></ul>' : '<ul class="nav nav-list"><li><a href="#glossary/0"><i class="icon-chevron-left icon-black"></i><strong>Root</strong></a></li><li class="active"><a href="#glossary/' + a[0].get("parent_object_id").toString() + '"><i class="icon-current icon-white"></i><strong>' + a[0].get("parent_object_nm").toString() + "</strong></a></li></ul>");
        for (var c = "", d = 0; b > d; d++)
            c != a[d].get("type_nm").toString() && $(".nav-list", this.el).append('<li class="nav-header">' + a[d].get("type_nm").toString() + "</li>"),
            c = a[d].get("type_nm").toString(),
            "" != a[d].get("object_nm").toString() && $(".nav-list", this.el).append(new GlossaryTreeItemView({
                model: a[d],
                id: this.options.objectId
            }).render().el);
        return this
    }
}),
window.GlossaryTreeItemView = Backbone.View.extend({
    tagName: "li",
    initialize: function() {
        this.model.bind("change", this.render, this),
        this.model.bind("destroy", this.close, this)
    },
    render: function() {
        var a = this.model.get("object_id").toString()
          , b = this.model.get("object_nm").toString()
          , c = (this.model.get("type_nm").toString(),
        "icon-conceptsystem icon-black")
          , d = this.model.get("glossary_cnt").toString()
          , e = this.model.get("concept_cnt").toString();
        return b.length >= 28 && 0 == d && (b = b.substring(0, 28) + ".."),
        b.length >= 24 && d > 0 && (b = b.substring(0, 24) + ".."),
        this.options.id == a ? $(this.el).addClass("active").html(d > 0 || e > 0 ? '<a href="#glossary/' + a + '"><i class="' + c + '"></i>' + b + "(" + d + "/" + e + ")</a>" : '<a href="#glossary/' + a + '"><i class="' + c + '"></i>' + b + "</a>") : $(this.el).html(d > 0 || e > 0 ? '<a href="#glossary/' + a + '"><i class="' + c + '"></i>' + b + "(" + d + "/" + e + ")</a>" : '<a href="#glossary/' + a + '"><i class="' + c + '"></i>' + b + "</a>"),
        this
    }
}),
window.GlossaryView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length
          , c = a[0].get("parent_object_nm");
        if (null  != c && "" != c && null  != this.options.nm)
            var c = this.options.nm + c;
        else
            var c = this.options.nm;
        $("#GlossaryName").html(c.toString().replace("ROOT", "")),
        $(this.el).append('<table class="table table-condensed"></table>'),
        $(".table", this.el).append('<thead><tr><th style="width: 30%">Concept</th><th style="width: 55%">Definition</th><th style="width: 15%">Concept Usage</th></tr></thead>');
        for (var d = 0; b > d; d++)
            "" != a[d].get("object_id").toString() && $(".table", this.el).append('<tr><td><i class="icon-concept"></i> <a href="#objects/' + a[d].get("object_id").toString() + '" title=" Last changed at ' + a[d].get("changed_dt").toString() + " by " + a[d].get("changed_by").toString() + '""><strong>' + a[d].get("object_nm").toString().substring(0, 35) + "</strong></a></td><td>" + a[d].get("object_ds").toString().substr(0, 200) + "</td><td>" + a[d].get("relation_cnt") + "</td></tr>");
        return this
    }
}),
window.HeaderView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        return $(this.el).html(this.template()),
        this
    },
    selectMenuItem: function(a) {
        $(".nav li").removeClass("active"),
        a && $("." + a).addClass("active"),
        $("#search-input").on("submit", function(a) {
            var b = $(".navbar-search #search-input").val();
            return app.navigate("#search/" + b, {
                trigger: !0
            }),
            a.preventDefault(),
            !1
        }
        )
    }
}),
window.HomeView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        return $(this.el).html(this.template()),
        this
    }
}),
window.ObjectEditView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        this.model.models;
        $(this.el).append(this.template(this.model.toJSON()))
    },
    events: {
        change: "change",
        "click .save": "beforeSave",
        "click .cancel": "cancelEdit"
    },
    change: function(a) {
        utils.hideAlert();
        var b = a.target
          , c = {};
        c[b.name] = b.value,
        this.model.set(c);
        var d = this.model.validateItem(b.id);
        d.isValid === !1 ? utils.addValidationError(b.id, d.message) : utils.removeValidationError(b.id)
    },
    beforeSave: function() {
        var a = this.model.validateAll();
        return a.isValid === !1 ? (utils.displayValidationErrors(a.messages),
        !1) : (this.saveObject(),
        !1)
    },
    saveObject: function() {
        console.log("Edit:before save"),
        this.model.save(null , {
            success: function() {
                utils.showAlert("Success!", "Object saved successfully", "alert-success"),
                window.history.back()
            },
            error: function() {
                utils.showAlert("Error", "An error occurred while trying to save this item", "alert-error")
            }
        })
    },
    cancelEdit: function() {
        window.history.back()
    }
}),
window.DbStatView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        $(this.el).html('<ul class="list"><li class="nav-header"><strong>Data Statistics</strong></li></ul>');
        for (var c = 0; b > c; c++)
            $(".list", this.el).append('<li><i class="text-info">' + a[c].get("cnt").toString() + ' </i> <abbr title="Last statistics at ' + a[c].get("changed_dt").toString() + '"  >' + a[c].get("type_nm").toString() + '</abbr> rows, size of <i class="text-info"> ' + a[c].get("size") + "</i> MB</li>");
        return this
    }
}),
window.ObjectStatView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        $(this.el).html('<ul class="list"><li class="nav-header"><strong>Metadata statistics</strong></li></ul>');
        for (var c = 0; b > c; c++)
            $(".list", this.el).append('<li title="Last changed at ' + a[c].get("changed_dt") + '">' + a[c].get("gen_type_nm") + ' (<i class="text-info">' + a[c].get("type_cnt").toString().trim() + '</i>)<a href="#objects/' + a[c].get("object_id") + '" title="jump to first one"> <i class="icon-' + a[c].get("type_nm").toString().toLowerCase().replace(" ", "-") + '"></i></a></li>');
        return this
    }
}),
window.ObjectPageView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        $(this.el).html(this.template())
    }
}),
window.ObjectRootView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        $(this.el).html('<ul class="list"></ul>');
        for (var c = "", d = 0, e = "", f = 0, g = 0; b > g; g++)
            "" != e && c != a[g].get("gen_type_nm").toString() && $(".list", this.el).append('<li class="nav-header">' + a[g].get("gen_type_nm").toString() + "</li>"),
            "" != e && e != a[g].get("type_nm").toString() && ($(".list", this.el).append(new ObjectRootItemView({
                type_id: d,
                type_nm: e,
                type_cnt: f
            }).render().el),
            f = 0),
            f++,
            c = a[g].get("gen_type_nm").toString(),
            e = a[g].get("type_nm").toString(),
            d = a[g].get("type_id").toString();
        return $(".list", this.el).append(new ObjectRootItemView({
            type_id: d,
            type_nm: e,
            type_cnt: f
        }).render().el),
        this
    }
}),
window.ObjectRootItemView = Backbone.View.extend({
    tagName: "li",
    initialize: function() {},
    render: function() {
        return $(this.el).html('<a href="#tree/0/' + this.options.type_id + '">' + this.options.type_nm + " (" + this.options.type_cnt + ")</a>"),
        this
    }
}),
window.ObjectTreeView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        $(this.el).html(this.options.id > 0 ? '<div class="well sidebar-nav"><ul class="nav nav-list"><li><a href="#objects/' + this.options.id + '"><i class="icon-chevron-left icon-black"></i><strong>' + this.options.nm + '</strong></a></li><li class="active"><a href="#objects/' + a[0].get("parent_id").toString() + '"><i class="icon-current icon-white"></i><strong>' + a[0].get("parent_nm").toString() + "</strong></a></li></ul></div>" : a[0].get("parent_id") > 0 ? '<div class="well sidebar-nav"><ul class="nav nav-list"><li><a href="#tree/0"><i class="icon-home icon-black"></i><strong>Root Objects</strong></a></li><li class="active"><a href="#objects/' + a[0].get("parent_id").toString() + '"><i class="icon-current icon-white"></i><strong>' + a[0].get("parent_nm").toString() + "</strong></a></li></ul></div>" : '<div class="well sidebar-nav"><ul class="nav nav-list"><li class="active"><a href="#tree/0"><i class="icon-home icon-black"></i><strong>Root Objects</strong></a></li></ul></div>');
        for (var c = "", d = 0; b > d; d++)
            c != a[d].get("type_nm").toString() && $(".nav-list", this.el).append('<li class="nav-header">' + a[d].get("type_nm").toString() + "</li>"),
            c = a[d].get("type_nm").toString(),
            $(".nav-list", this.el).append(new ObjectTreeItemView({
                model: a[d],
                objectId: this.options.objectId
            }).render().el);
        return this
    }
}),
window.ObjectTreeItemView = Backbone.View.extend({
    tagName: "li",
    initialize: function() {
        this.model.bind("change", this.render, this),
        this.model.bind("destroy", this.close, this)
    },
    render: function() {
        var a = this.model.get("object_id").toString()
          , b = this.model.get("object_nm").toString()
          , c = b
          , d = this.model.get("type_nm").toString()
          , e = "icon-" + d.toLowerCase().replace(" ", "-") + " icon-black"
          , f = this.model.get("count").toString();
        return b.length >= 27 && 0 == f && (b = b.substring(0, 28) + ".."),
        b.length >= 24 && f > 0 && (b = b.substring(0, 24) + ".."),
        this.options.objectId == a ? $(this.el).addClass("active").html(f > 0 ? '<a href="#objects/' + a + '" title="' + c + '"><i class="' + e + '"></i>' + b + "(" + f + ")</a>" : '<a href="#objects/' + a + '" title="' + c + '"><i class="' + e + '"></i>' + b + "</a>") : $(this.el).html(f > 0 ? '<a href="#objects/' + a + '" title="' + c + '"><i class="' + e + '"></i>' + b + "(" + f + ")</a>" : '<a href="#objects/' + a + '" title="' + c + '"><i class="' + e + '"></i>' + b + "</a>"),
        this
    }
}),
window.ObjectView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model
          , b = "icon-" + a.get("object_type_nm").toString().toLowerCase().replace(" ", "-")
          , c = 100
          , d = 0
          , e = 15
          , f = a.get("object_txt").length
          , g = a.get("notes_txt").length
          , h = (a.get("object_txt").match(/\n/g) || []).length
          , i = Math.round(f / c) + 1
          , j = (a.get("notes_txt").match(/\n/g) || []).length
          , k = Math.round(g / c) + 1;
        if (i > h && (h = i),
        k > j && (j = k),
        h > e)
            var h = e;
        if (null  == h || d > h)
            var h = d;
        if (j > e)
            var j = e;
        if (null  == j || d > j)
            var j = d;
        return $(this.el).html(this.template($.extend(this.model.toJSON(), {
            parentNm: this.options.parentNm,
            txtLineCnt: h,
            ntsLineCnt: j,
            iconName: b
        }))),
        this
    }
}),
window.ObjectHomeView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        return $(this.el).html(this.template()),
        this
    }
}),
window.Paginator = Backbone.View.extend({
    className: "pagination  pagination-centered",
    initialize: function() {
        this.model.bind("reset", this.render, this),
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length
          , c = Math.ceil(b / 20);
        $(this.el).html("<ul />");
        for (var d = 0; c > d; d++)
            $("ul", this.el).append("<li" + (d + 1 === this.options.page ? " class='active'" : "") + "><a href='#search/" + this.options.name + "/page/" + (d + 1) + "'>" + (d + 1) + "</a></li>");
        return this
    }
}),
window.PropertyView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        if (b > 0 && "" != a[0].get("property_type_nm").toString()) {
            $(this.el).html('<div class="property-head"></div>'),
            $(this.el).append('<table class="table table-condensed"><thead class="property-head"><tr><th style="width: 20%">Property Name</th><th style="width: 70%">Description Text</th><th style="width: 5%">Lang</th><th style="width: 5%">Unit</th></thead></table>');
            for (var c = 0; b > c; c++)
                "" != a[c].get("property_type_nm").toString() && $(".table", this.el).append(new PropertyItemView({
                    model: a[c]
                }).render().el)
        }
        return this
    }
}),
window.PropertyItemView = Backbone.View.extend({
    tagName: "tr",
    initialize: function() {
        this.model.bind("change", this.render, this),
        this.model.bind("destroy", this.close, this)
    },
    render: function() {
        return $(this.el).html(this.template(this.model.toJSON())),
        this
    }
}),
window.RelationView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        if (b > 0 && "" != a[0].get("relation_type_nm").toString()) {
            $(this.el).html('<div class="relation-head"></div>'),
            $(this.el).append('<table class="table table-condensed"></table>');
            for (var c = -1, d = 0; b > d; d++) {
                var e = "icon-" + a[d].get("related_object_type_nm").toString().toLowerCase().replace(" ", "-")
                  , f = "icon-" + a[d].get("object_type_nm").toString().toLowerCase().replace(" ", "-");
                "" != a[d].get("relation_type_nm").toString() && (c != a[d].get("reverse_ind") && 0 == a[d].get("reverse_ind") && $(".table", this.el).append('<tr class="relation-head"><td style="width: 20%"><i class="icon-chevron-right icon-black"></i><strong>Relation To</strong></td><td style="width: 50%"><strong>Object Name</strong></td><td style="width: 20%"><strong>Description</strong></td><td style="width: 10%"><strong>Weight</strong></td></tr>'),
                c != a[d].get("reverse_ind") && 1 == a[d].get("reverse_ind") && $(".table", this.el).append('<tr class="relation-head"><td style="width: 20%"><i class="icon-chevron-left icon-black"></i><strong>Relation From</strong></td><td style="width: 50%"><strong>Object Name</strong></td><td style="width: 20%"><strong>Description</strong></td><td style="width: 10%"><strong>Weight</strong></td></tr>'),
                0 == a[d].get("reverse_ind") && $(".table", this.el).append('<tr><td><strong title="[' + a[d].get("relation_type_cd").toString() + ']">' + a[d].get("relation_type_nm").toString() + '</strong>:</td><td><i class="' + e + '" title="' + a[d].get("related_object_type_nm") + '"></i> <a href="#objects/' + a[d].get("related_parent_object_id").toString() + '">' + a[d].get("related_parent_object_nm").substring(0, 20) + '</a> / <a href="#objects/' + a[d].get("related_object_id").toString() + '">' + a[d].get("related_object_nm").substring(0, 30) + '</a> </td><td><abbr title="' + a[d].get("relation_ds") + '">' + a[d].get("relation_ds").substring(0, 30) + "</abbr></td><td>" + a[d].get("relation_weight_pct").toString() + "</td></tr>"),
                1 == a[d].get("reverse_ind") && $(".table", this.el).append('<tr><td><strong title="[' + a[d].get("relation_type_cd").toString() + ']">' + a[d].get("related_relation_type_nm") + '</strong>:</td><td><i class="' + f + '" title="' + a[d].get("object_type_nm") + '"></i> <a href="#objects/' + a[d].get("parent_object_id").toString() + '">' + a[d].get("parent_object_nm").substring(0, 20) + '</a> / <a href="#objects/' + a[d].get("object_id").toString() + '">' + a[d].get("object_nm").substring(0, 30) + '</a> </td><td><abbr title="' + a[d].get("relation_ds") + '">' + a[d].get("relation_ds").substring(0, 30) + "</abbr></td><td>" + a[d].get("relation_weight_pct").toString() + "</td></tr>"),
                c = a[d].get("reverse_ind"))
            }
        }
        return this
    }
}),
window.RelationItemView = Backbone.View.extend({
    tagName: "tr",
    initialize: function() {
        this.model.bind("change", this.render, this),
        this.model.bind("destroy", this.close, this)
    },
    render: function() {
        return $(this.el).html(this.template(this.model.toJSON())),
        this
    }
}),
window.RelationBarView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = this.model.models
          , b = a.length;
        b > 0 && $(this.el).html('<div class="well sidebar-nav"><ul class="nav nav-list">');
        for (var c = "", d = -1, e = 0; b > e; e++)
            d != a[e].get("reverse_ind") && 0 == a[e].get("reverse_ind") && $(".nav-list", this.el).append('<li class="active"><a><i class="icon-chevron-right icon-white"></i><strong>RelatedTo</strong></a></li>'),
            d != a[e].get("reverse_ind") && 1 == a[e].get("reverse_ind") && $(".nav-list", this.el).append('<li class="active"><a><i class="icon-chevron-right icon-white"></i><strong>RelatedFrom</strong></a></li>'),
            c != a[e].get("relation_type_nm").toString() && $(".nav-list", this.el).append('<li class="nav-header">' + a[e].get("relation_type_nm") + "</li>"),
            0 == a[e].get("reverse_ind") && $(".nav-list", this.el).append('<li><a href="#objects/' + a[e].get("related_object_id") + '">' + a[e].get("related_object_nm").substring(0, 30) + "</a></li>"),
            1 == a[e].get("reverse_ind") && $(".nav-list", this.el).append('<li><a href="#objects/' + a[e].get("object_id") + '">' + a[e].get("object_nm").substring(0, 30) + "</a></li>"),
            c = a[e].get("relation_type_nm"),
            d = a[e].get("reverse_ind");
        return this
    }
}),
window.SearchResultView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = 20
          , b = this.model.models
          , c = b.length
          , d = (this.options.page - 1) * a
          , e = Math.min(d + a, c)
          , f = ""
          , g = "";
        if (c > 0)
            var h = b[1].get("count");
        else
            var h = 0;
        $(this.el).html("<legend>Search Results: " + h + ' matches found for "' + this.options.name + '"</legend><table class="table table-condensed"></table>');
        for (var i = d; e > i; i++)
            if (f = DepTypeList.toString().indexOf(b[i].get("object_type_cd")) >= 0 ? ', Apps: ( <a href="#graph/2/' + b[i].get("object_type_cd") + ",163,1015,1013,1603/" + b[i].get("object_id") + '" title="Jump to Dependency Graph..."><img src="img/graph-right-small.png"></a> |                             <a href="#dependencies/t/2/' + b[i].get("object_type_cd") + ",163,1015,1013,1603/" + b[i].get("object_id") + '" title="Jump to Dependency Table..."><img src="img/table-small.png"></a> )' : "",
            g = BusTypeList.toString().indexOf(b[i].get("object_type_cd")) >= 0 ? 170 == b[i].get("object_type_cd") ? ', Apps: ( <a href="#glossary/' + b[i].get("parent_object_id") + '" title="Jump to Business..."><img src="img/business-small.png"></a> )' : ', Apps: ( <a href="#glossary/' + b[i].get("object_id") + '" title="Jump to Business..."><img src="img/business-small.png"></a> )' : "",
            "" != b[i].get("object_nm").toString()) {
                var j = "icon-" + b[i].get("object_type_nm").toString().toLowerCase().replace(" ", "-");
                $(".table", this.el).append('<p><strong class="text-info">' + (i + 1) + ')</strong> <i class="' + j + '"></i>                         <a href="#objects/' + b[i].get("object_id").toString() + '"> <strong> ' + b[i].get("object_nm").toString() + "</strong></a>                          <br>                         Path: <strong>" + b[i].get("path_nm").toString() + "</strong><br>Type: <strong>" + b[i].get("object_type_nm").toString() + "</strong> ,                         Rank: <strong>" + b[i].get("rank").toString() + "</strong>" + f + g + "<br>" + b[i].get("object_ds").toString().substring(0, 500) + "</p>")
            }
        return c > a && ($(this.el).append(new Paginator({
            model: this.model,
            name: this.options.name,
            page: this.options.page
        }).render().el),
        $(this.el).append("* Results limited with first " + c + " matches. Ordered and ranked by better match and shorter title/name.")),
        this
    }
}),
window.SubHeaderView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        this.options.id;
        return $(this.el).html(this.template()),
        this
    },
    selectMenuItem: function(a) {
        $(".nav li").removeClass("active"),
        a && $("." + a).addClass("active")
    }
}),
window.ObjectPathView = Backbone.View.extend({
    initialize: function() {
        this.render()
    },
    render: function() {
        var a = "#objects/"
          , b = this.model.models
          , c = b.length;
        $(this.el).html('<ol class="submenu"><li><a href="#">&nbsp;&nbsp;<i class="icon-home"></i></a></li></ol>');
        for (var d = 0; c > d; d++)
            $(".submenu", this.el).append(0 != b[d].get("level_id") ? '<li class="divider">/</li><li><a href="' + a + b[d].get("object_id") + '">' + b[d].get("object_nm") + "</a></li>" : '<li class="divider">/</li><li>' + b[d].get("object_nm") + "</li>");
        return this
    }
});
var DepTypeList = [1003, 1004, 1010, 1013, 1015, 1016, 1017, 150, 151, 1603, 1607, 1608, 1609]
  , BusTypeList = [169, 170]
  , depTab = [{
    id: "1",
    label: "ETL Package",
    isChecked: !1,
    cd: 1400
}, {
    id: "2",
    label: "ETL Task",
    isChecked: !1,
    cd: 1401
}, {
    id: "3",
    label: "Schema",
    isChecked: !1,
    cd: 1004
}, {
    id: "4",
    label: "File",
    isChecked: !1,
    cd: 163
}, {
    id: "5",
    label: "Table",
    isChecked: !1,
    cd: 1015
}, {
    id: "6",
    label: "View",
    isChecked: !1,
    cd: 1013
}, {
    id: "7",
    label: "Column",
    isChecked: !1,
    cd: 1016
}, {
    id: "8",
    label: "BI Folder",
    isChecked: !1,
    cd: 1601
}, {
    id: "9",
    label: "BI Report",
    isChecked: !1,
    cd: 1603
}, {
    id: "10",
    label: "BI Object",
    isChecked: !1,
    cd: 1604
}]
  , glossaryId = 20408793
  , graphType = "2"
  , selId = 2
  , cdList = "1004,1013,1015,1601,1603"
  , graphName = ""
  , relName = ""
  , AppRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        "tree/:id": "tree",
        "tree/:id/:cd": "tree",
        "path/:id": "path",
        "objects/:id": "objectDetails",
        "objects/page/:page": "list",
        "search/:name": "search",
        "search/:name/page/:page": "search",
        "properties/:id": "objectProperties",
        "objects/:edit/:id": "objectEdit",
        "objects/add": "addObject",
        about: "about",
        "glossaries/:id": "glossaries",
        "glossary/:id": "glossaryHome",
        "concept/:id": "concept",
        "dep/:id": "dep",
        "dependencies/:dir/:rcd/:cd/:id": "depTable",
        "treegraph/:dir/:rcd/:cd/:id": "depTree",
        "graph/:rcd/:cd/:pid": "depGraph",
        admin: "admin"
    },
    initialize: function() {
        this.headerView = new HeaderView,
        $(".header").html(this.headerView.el)
    },
    home: function() {
        this.homeView = new HomeView,
        $("#content").html(this.homeView.el),
        this.headerView.selectMenuItem()
    },
    path: function(a) {
        var b = new MdObjectPathCollection([],{
            id: a
        });
        b.fetch({
            id: a,
            success: function() {
                $("ObjectPath").html(new ObjectPathView({
                    model: b,
                    id: a
                }).el)
            }
        })
    },
    tree: function(a, b) {
        this.subHeaderView = new SubHeaderView({
            id: a
        }),
        $("#content").html(this.subHeaderView.el),
        this.headerView.selectMenuItem("tech-menu"),
        this.subHeaderView.selectMenuItem("tech-menu"),
        $("#content").append((new ObjectPageView).el),
        $(".ObjectHome").append((new ObjectHomeView).el);
        var c = new MdTreeObjectCollection([],{
            id: a,
            cd: b
        });
        c.fetch({
            id: a,
            cd: b,
            success: function() {
                $(".ObjectTree").append(new ObjectTreeView({
                    model: c
                }).el)
            }
        });
        var d = new MdStatCollection([]);
        d.fetch({
            success: function() {
                $(".Statistics").html(new ObjectStatView({
                    model: d
                }).el)
            }
        })
    },
    search: function(a, b) {
        var c = b ? parseInt(b, 10) : 1
          , d = new MdSearchCollection([],{
            name: a
        });
        d.fetch({
            success: function() {
                $("#content").html(new SearchResultView({
                    model: d,
                    name: a,
                    page: c
                }).el)
            }
        }),
        this.headerView.selectMenuItem()
    },
    list: function(a) {
        var b = a ? parseInt(a, 10) : 1
          , c = new MdObjectCollection;
        c.fetch({
            success: function() {
                $("#content").html(new ObjectListView({
                    model: c,
                    page: b
                }).el)
            }
        }),
        this.headerView.selectMenuItem("bus-menu")
    },
    objectDetails: function(a) {
        this.subHeaderView = new SubHeaderView({
            id: a
        }),
        $("#content").html(this.subHeaderView.el),
        this.headerView.selectMenuItem("tech-menu"),
        this.subHeaderView.selectMenuItem("tech-menu");
        var b = new MdObjectPathCollection([],{
            id: a
        });
        if (b.fetch({
            id: a,
            success: function() {
                $("#ObjectPath").html(new ObjectPathView({
                    model: b,
                    id: a
                }).el)
            }
        }),
        $("#content").append((new ObjectPageView).el),
        a >= 0)
            var c = a;
        else
            var c = 0
              , a = 0;
        selId = a;
        var d = new MdObject([],{
            id: c
        });
        d.fetch({
            success: function() {
                if (d.get("child_cnt") > 0)
                    var b = d.get("object_id")
                      , c = d.get("parent_object_nm");
                else
                    var b = d.get("parent_object_id")
                      , c = "BACK";
                var e = d.get("parent_object_id");
                $(".ObjectDetail").html(new ObjectView({
                    model: d,
                    parentNm: d.get("parent_object_nm")
                }).el);
                var f = new MdTreeObjectCollection([],{
                    id: b
                });
                f.fetch({
                    success: function() {
                        $(".ObjectTree").append(new ObjectTreeView({
                            model: f,
                            objectId: a,
                            id: e,
                            nm: c
                        }).el)
                    }
                });
                var g = new MdPropertyCollection([],{
                    id: a
                });
                g.fetch({
                    success: function() {
                        $(".ObjectProperty").append(new PropertyView({
                            model: g
                        }).el)
                    }
                });
                var h = new MdRelationCollection([],{
                    id: a
                });
                h.fetch({
                    success: function() {
                        $(".ObjectRelation").append(new RelationView({
                            model: h
                        }).el)
                    }
                })
            }
        })
    },
    objectEdit: function(a, b) {
        var c = new MdObject([],{
            id: b,
            edit: a
        });
        c.fetch({
            success: function() {
                $(".ObjectDetail").html(new ObjectEditView({
                    model: c
                }).el),
                $(".ObjectRelation").html()
            }
        }),
        this.headerView.selectMenuItem()
    },
    addObject: function() {
        var a = new MdObject;
        $("#content").html(new ObjectView({
            model: a
        }).el),
        this.headerView.selectMenuItem("add-menu")
    },
    about: function() {
        this.aboutView || (this.aboutView = new AboutView),
        $("#content").html(this.aboutView.el),
        this.headerView.selectMenuItem("about-menu")
    },
    glossaryHome: function(a) {
        this.subHeaderView = new SubHeaderView({
            id: a
        }),
        $("#content").html(this.subHeaderView.el),
        this.headerView.selectMenuItem("bus-menu"),
        this.subHeaderView.selectMenuItem("bus-menu");
        var b = new MdObjectPathCollection([],{
            id: a
        });
        if (b.fetch({
            id: a,
            success: function() {
                $("#ObjectPath").html(new ObjectPathView({
                    model: b,
                    id: a
                }).el)
            }
        }),
        $("#content").append((new GlossaryHomeView).el),
        null  == a || 0 == a) {
            var c = new MdGlossaryCollection([],{
                id: a
            });
            c.fetch({
                success: function() {
                    $("#GlossaryHead").append((new GlossaryHeadView).el),
                    $("#GlossaryTree").html(new GlossaryRootView({
                        model: c,
                        id: a
                    }).el)
                }
            })
        }
        if (a > 0) {
            var d = 0
              , e = ""
              , f = 0
              , g = ""
              , h = new MdGlossary([],{
                id: a
            });
            h.fetch({
                success: function() {
                    h.get("glossary_cnt") > 0 ? (d = h.get("object_id").toString(),
                    e = h.get("object_nm").toString(),
                    f = h.get("parent_object_id").toString(),
                    g = h.get("parent_object_nm").toString()) : (d = 0,
                    e = "");
                    var b = new MdGlossaryCollection([],{
                        id: d
                    });
                    b.fetch({
                        success: function() {
                            $("#GlossaryTree").html(new GlossaryTreeView({
                                model: b,
                                objectId: a,
                                id: d,
                                nm: e,
                                pid: f,
                                pnm: g
                            }).el)
                        }
                    })
                }
            })
        }
        if (null  != a && 0 != a) {
            var i = new MdConceptCollection([],{
                id: a
            });
            i.fetch({
                success: function() {
                    $("#GlossaryBody").html(new GlossaryView({
                        model: i,
                        id: a,
                        id: d,
                        nm: e
                    }).el)
                }
            })
        }
    },
    admin: function() {
        this.headerView.selectMenuItem("tech-menu"),
        $("#content").html((new AdminAppView).el),
        $(".AdminHome").append((new AdminAppHomeView).el)
    },
    dep: function(a, b) {
        selId = a,
        this.subHeaderView = new SubHeaderView({
            id: a
        }),
        $("#content").html(this.subHeaderView.el),
        this.headerView.selectMenuItem("analytics-menu"),
        this.subHeaderView.selectMenuItem("dep-tbl-menu");
        var c = new MdObjectPathCollection([],{
            id: a
        });
        c.fetch({
            id: a,
            success: function() {
                $("#ObjectPath").html(new ObjectPathView({
                    model: c,
                    id: a
                }).el)
            }
        }),
        $("#content").append((new DepAppView).el),
        $(".DepHome").append((new DepAppHomeView).el);
        var d = new MdTreeObjectCollection([],{
            id: a,
            cd: b
        });
        d.fetch({
            id: a,
            cd: b,
            success: function() {
                $(".DepNav").append(new DepNavView({
                    model: d
                }).el)
            }
        }),
        this.headerView.selectMenuItem("analytics-menu")
    },
    depTable: function(a, b, c, d) {
        selId = d,
        this.subHeaderView = new SubHeaderView({
            id: d
        }),
        $("#content").html(this.subHeaderView.el),
        this.headerView.selectMenuItem("analytics-menu"),
        this.subHeaderView.selectMenuItem("dep-tbl-menu");
        var e = new MdObjectPathCollection([],{
            id: d
        });
        if (e.fetch({
            id: d,
            success: function() {
                $("#ObjectPath").html(new ObjectPathView({
                    model: e,
                    id: d
                }).el)
            }
        }),
        $("#content").append((new DepAppView).el),
        d >= 0)
            var f = d;
        else
            var f = 0
              , d = 0;
        var g = new MdObject([],{
            id: f
        });
        g.fetch({
            success: function() {
                if (g.get("child_cnt") > 0)
                    var a = g.get("object_id")
                      , e = g.get("parent_object_nm");
                else
                    var a = g.get("parent_object_id")
                      , e = "BACK";
                var f = g.get("parent_object_id");
                console.log("DepNav: Id:", d, " ParentId:", f);
                var h = new MdTreeObjectCollection([],{
                    id: a
                });
                h.fetch({
                    success: function() {
                        console.log("Msg: DepNavView content..."),
                        $(".DepNav").html(new DepNavView({
                            model: h,
                            objectId: d,
                            id: f,
                            nm: e
                        }).el)
                    }
                });
                var i = g.get("parent_object_nm")
                  , j = g.get("object_nm")
                  , k = g.get("object_type_nm");
                $(".DepHead").html(new DepHeadView({
                    parent: i,
                    name: j,
                    title: k,
                    cnt: 0,
                    object_id: d,
                    cd: c,
                    rcd: b
                }).render().el),
                $(".ObjectTypeDropdown").dropdownCheckbox({
                    data: depTab,
                    autosearch: !1,
                    title: "Filter by object types",
                    hideHeader: !0,
                    showNbSelected: !0,
                    templateButton: '<div class="btn-group">                                   <button class="dropdown-checkbox-toggle btn btn-mini" data-toggle="dropdown-checkbox" href="#">Selected                                     <span class="dropdown-checkbox-nbselected"></span><b class="caret"></b>                                   </button>                                   <button class="btn dropdown-toggle btn-mini reload" title="Reload graph with changed object types">                                   <i class="icon-repeat"></i></button>                                 </div>'
                })
            }
        });
        var h = new MdDepFromCollection([],{
            dir: "s",
            rcd: b,
            cd: c,
            id: d
        });
        h.fetch({
            success: function() {
                console.log("Msg: DepFromView content..."),
                $(".DepFrom").html(new DepFromView({
                    model: h,
                    dir: "s",
                    rcd: b,
                    cd: c,
                    id: d
                }).el)
            }
        });
        var i = new MdDepToCollection([],{
            dir: "t",
            rcd: b,
            cd: c,
            id: d
        });
        i.fetch({
            success: function() {
                console.log("Msg: DepToView content..."),
                $(".DepTo").append(new DepToView({
                    model: i,
                    dir: "t",
                    rcd: b,
                    cd: c,
                    id: d
                }).el)
            }
        }),
        this.headerView.selectMenuItem("analytics-menu")
    },
    depTree: function(a, b, c, d) {
        selId = d,
        this.subHeaderView = new SubHeaderView({
            id: d
        }),
        $("#content").html(this.subHeaderView.el),
        this.headerView.selectMenuItem("analytics-menu"),
        this.subHeaderView.selectMenuItem("dep-tree-menu");
        var e = new MdObjectPathCollection([],{
            id: d
        });
        e.fetch({
            id: d,
            success: function() {
                $("#ObjectPath").html(new ObjectPathView({
                    model: e,
                    id: d
                }).el)
            }
        });
        var f = new MdObject([],{
            id: d
        });
        f.fetch({
            success: function() {
                if (null  != f.get("object_nm"))
                    var e = f.get("object_nm");
                else
                    var e = "";
                if (null  != f.get("parent_object_nm"))
                    var g = f.get("parent_object_nm");
                else
                    var g = "";
                if (null  != f.get("object_type_nm"))
                    var h = f.get("object_type_nm");
                else
                    var h = "unknown";
                console.log("Msg: DepTreeView content...", h),
                $("#content").append(new DepTreeHeadView({
                    parent: g,
                    name: e,
                    title: h,
                    cnt: 0,
                    object_id: d,
                    cd: c,
                    rcd: b,
                    dir: a
                }).render().el),
                $(".ObjectTypeDropdown").dropdownCheckbox({
                    data: depTab,
                    autosearch: !1,
                    title: "Filter by object types",
                    hideHeader: !0,
                    showNbSelected: !0,
                    templateButton: '<div class="btn-group">                                   <button class="dropdown-checkbox-toggle btn btn-mini" data-toggle="dropdown-checkbox" href="#">Selected                                     <span class="dropdown-checkbox-nbselected"></span><b class="caret"></b>                                   </button>                                   <button class="btn dropdown-toggle btn-mini reload" title="Reload graph with changed object types">                                   <i class="icon-repeat"></i></button>                                 </div>'
                });
                var i = new MdTransfCollection([],{
                    dir: a,
                    rcd: b,
                    cd: c,
                    id: d
                });
                i.fetch({
                    success: function() {
                        $("#content").append(new DepTreeView({
                            model: i,
                            dir: a,
                            rcd: b,
                            cd: c,
                            id: d,
                            nm: e,
                            pnm: g,
                            tnm: h
                        }).el)
                    }
                })
            }
        }),
        this.headerView.selectMenuItem("analytics-menu")
    },
    depGraph: function(a, b, c) {
        selId = c,
        this.subHeaderView = new SubHeaderView({
            id: c
        }),
        $("#content").html(this.subHeaderView.el),
        this.headerView.selectMenuItem("analytics-menu"),
        this.subHeaderView.selectMenuItem("dep-graph-menu");
        var d = new MdObjectPathCollection([],{
            id: c
        });
        d.fetch({
            id: c,
            success: function() {
                $("#ObjectPath").html(new ObjectPathView({
                    model: d,
                    id: c
                }).el)
            }
        });
        var e = new MdObject([],{
            id: c
        });
        e.fetch({
            success: function() {
                if (null  != e.get("object_nm"))
                    var d = e.get("object_nm");
                else
                    var d = "";
                if (null  != e.get("parent_object_nm"))
                    var f = e.get("parent_object_nm");
                else
                    var f = "";
                if (null  != e.get("object_type_nm"))
                    var g = e.get("object_type_nm");
                else
                    var g = "unknown";
                $("#content").append(new DepGraphHeadView({
                    parent: f,
                    name: d,
                    title: g,
                    cnt: 0,
                    object_id: c,
                    cd: b,
                    rcd: a
                }).render().el),
                $(".ObjectTypeDropdown").dropdownCheckbox({
                    data: depTab,
                    autosearch: !1,
                    title: "Filter by object types",
                    hideHeader: !0,
                    showNbSelected: !0,
                    templateButton: '<div class="btn-group">                                   <button class="dropdown-checkbox-toggle btn btn-mini" data-toggle="dropdown-checkbox" href="#">Selected                                     <span class="dropdown-checkbox-nbselected"></span><b class="caret"></b>                                   </button>                                   <button class="btn dropdown-toggle btn-mini reload" title="Reload graph with changed object types">                                   <i class="icon-repeat"></i></button>                                 </div>'
                });
                var h = new MdGraphCollection([],{
                    rcd: a,
                    cd: b,
                    pid: c
                });
                h.fetch({
                    success: function() {
                        $("#content").append(new DepGraphView({
                            model: h,
                            rcd: a,
                            cd: b,
                            pid: c,
                            nm: d,
                            pnm: f,
                            tnm: g
                        }).el)
                    }
                })
            }
        }),
        this.headerView.selectMenuItem("analytics-menu")
    }
});
utils.loadTemplate(["HomeView", "HeaderView", "SubHeaderView", "AboutView", "ObjectPageView", "ObjectHomeView", "ObjectView", "PropertyItemView", "ObjectEditView", "GlossaryHomeView", "DepAppView", "DepAppHomeView", "DepSubHeadView", "DepHeadView", "DepItemView", "DepTreeHeadView", "DepTreeView", "DepGraphHeadView", "DepGraphView"], function() {
    app = new AppRouter,
    Backbone.history.start()
}
),
d3.sankey = function() {
    function a() {
        n.forEach(function(a) {
            a.sourceLinks = [],
            a.targetLinks = []
        }
        ),
        o.forEach(function(a) {
            var b = a.source
              , c = a.target;
            "number" == typeof b && (b = a.source = n[a.source]),
            "number" == typeof c && (c = a.target = n[a.target]),
            b.sourceLinks.push(a),
            c.targetLinks.push(a)
        }
        )
    }
    function b() {
        n.forEach(function(a) {
            a.value = Math.max(d3.sum(a.sourceLinks, i), d3.sum(a.targetLinks, i))
        }
        )
    }
    function c() {
        function a(d) {
            if (d.index = c++,
            d.lowIndex = d.index,
            d.onStack = !0,
            b.push(d),
            d.sourceLinks && (d.sourceLinks.forEach(function(b) {
                var c = b.target;
                c.hasOwnProperty("index") ? c.onStack && (d.lowIndex = Math.min(d.lowIndex, c.index)) : (a(c),
                d.lowIndex = Math.min(d.lowIndex, c.lowIndex))
            }
            ),
            d.lowIndex === d.index)) {
                var e, f = [];
                do
                    e = b.pop(),
                    e.onStack = !1,
                    f.push(e);
                while (e != d);p.push({
                    root: d,
                    scc: f
                })
            }
        }
        var b = []
          , c = 0;
        n.forEach(function(b) {
            b.index || a(b)
        }
        ),
        p.forEach(function(a, b) {
            a.index = b,
            a.scc.forEach(function(a) {
                a.component = b
            }
            )
        }
        )
    }
    function d() {
        function a() {
            for (var a, b, c = p, d = 0; c.length; )
                a = [],
                b = {},
                c.forEach(function(c) {
                    c.x = d,
                    c.scc.forEach(function(d) {
                        d.sourceLinks.forEach(function(d) {
                            b.hasOwnProperty(d.target.component) || d.target.component == c.index || (a.push(p[d.target.component]),
                            b[d.target.component] = !0)
                        }
                        )
                    }
                    )
                }
                ),
                c = a,
                ++d
        }
        function b(a, b) {
            for (var c = [a], d = 1, e = 0, f = 0; d > 0; ) {
                var g = c.shift();
                if (d--,
                !g.hasOwnProperty("x")) {
                    g.x = f,
                    g.dx = k;
                    var h = b(g);
                    c = c.concat(h),
                    e += h.length
                }
                0 == d && (f++,
                d = e,
                e = 0)
            }
        }
        a(),
        p.forEach(function(a, c) {
            b(a.root, function(a) {
                var b = a.sourceLinks.filter(function(a) {
                    return a.target.component == c
                }
                ).map(function(a) {
                    return a.target
                }
                );
                return b
            }
            )
        }
        );
        var c = 0
          , d = d3.nest().key(function(a) {
            return a.x
        }
        ).sortKeys(d3.ascending).entries(p).map(function(a) {
            return a.values
        }
        )
          , c = -1
          , f = -1;
        d.forEach(function(a) {
            a.forEach(function(a) {
                a.x = c + 1,
                a.scc.forEach(function(b) {
                    b.x = a.x + b.x,
                    f = Math.max(f, b.x)
                }
                )
            }
            ),
            c = f
        }
        ),
        n.filter(function(a) {
            var b = a.sourceLinks.filter(function(a) {
                return a.source.name != a.target.name
            }
            );
            return 0 == b.length
        }
        ).forEach(function(a) {
            a.x = c
        }
        ),
        e((m[0] - k) / Math.max(c, 1))
    }
    function e(a) {
        n.forEach(function(b) {
            b.x *= a
        }
        )
    }
    function f(a) {
        function b() {
            var a = d3.min(g, function(a) {
                return (m[1] - (a.length - 1) * l) / d3.sum(a, i)
            }
            );
            g.forEach(function(b) {
                b.forEach(function(b, c) {
                    b.y = c,
                    b.dy = b.value * a
                }
                )
            }
            ),
            o.forEach(function(b) {
                b.dy = b.value * a
            }
            )
        }
        function c(a) {
            function b(a) {
                return h(a.source) * a.value
            }
            g.forEach(function(c) {
                c.forEach(function(c) {
                    if (c.targetLinks.length) {
                        var d = d3.sum(c.targetLinks, b) / d3.sum(c.targetLinks, i);
                        c.y += (d - h(c)) * a
                    }
                }
                )
            }
            )
        }
        function d(a) {
            function b(a) {
                return h(a.target) * a.value
            }
            g.slice().reverse().forEach(function(c) {
                c.forEach(function(c) {
                    if (c.sourceLinks.length) {
                        var d = d3.sum(c.sourceLinks, b) / d3.sum(c.sourceLinks, i);
                        c.y += (d - h(c)) * a
                    }
                }
                )
            }
            )
        }
        function e() {
            g.forEach(function(a) {
                var b, c, d, e = 0, g = a.length;
                for (a.sort(f),
                d = 0; g > d; ++d)
                    b = a[d],
                    c = e - b.y,
                    c > 0 && (b.y += c),
                    e = b.y + b.dy + l;
                if (c = e - l - m[1],
                c > 0)
                    for (e = b.y -= c,
                    d = g - 2; d >= 0; --d)
                        b = a[d],
                        c = b.y + b.dy + l - e,
                        c > 0 && (b.y -= c),
                        e = b.y
            }
            )
        }
        function f(a, b) {
            return a.y - b.y
        }
        var g = d3.nest().key(function(a) {
            return a.x
        }
        ).sortKeys(d3.ascending).entries(n).map(function(a) {
            return a.values
        }
        );
        b(),
        e();
        for (var j = 1; a > 0; --a)
            d(j *= .99),
            e(),
            c(j),
            e()
    }
    function g() {
        function a(a, b) {
            return a.source.y - b.source.y
        }
        function b(a, b) {
            return a.target.y - b.target.y
        }
        n.forEach(function(c) {
            c.sourceLinks.sort(b),
            c.targetLinks.sort(a)
        }
        ),
        n.forEach(function(a) {
            var b = 0
              , c = 0;
            a.sourceLinks.forEach(function(a) {
                a.sy = b,
                b += a.dy
            }
            ),
            a.targetLinks.forEach(function(a) {
                a.ty = c,
                c += a.dy
            }
            )
        }
        )
    }
    function h(a) {
        return a.y + a.dy / 2
    }
    function i(a) {
        return a.value
    }
    var j = {}
      , k = 24
      , l = 8
      , m = [1, 1]
      , n = []
      , o = []
      , p = [];
    return j.nodeWidth = function(a) {
        return arguments.length ? (k = +a,
        j) : k
    }
    ,
    j.nodePadding = function(a) {
        return arguments.length ? (l = +a,
        j) : l
    }
    ,
    j.nodes = function(a) {
        return arguments.length ? (n = a,
        j) : n
    }
    ,
    j.links = function(a) {
        return arguments.length ? (o = a,
        j) : o
    }
    ,
    j.size = function(a) {
        return arguments.length ? (m = a,
        j) : m
    }
    ,
    j.layout = function(e) {
        return a(),
        b(),
        c(),
        d(),
        f(e),
        g(),
        j
    }
    ,
    j.relayout = function() {
        return g(),
        j
    }
    ,
    j.reversibleLink = function() {
        function a(a, b) {
            var d = b.source.x + b.source.dx
              , e = b.target.x
              , f = d3.interpolateNumber(d, e)
              , g = f(c)
              , h = f(1 - c)
              , i = b.source.y + b.sy
              , j = b.target.y + b.ty
              , k = b.source.y + b.sy + b.dy
              , l = b.target.y + b.ty + b.dy;
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
            var e = 30
              , f = 15
              , g = c(b) * f
              , h = b.source.x + b.source.dx
              , i = b.source.y + b.sy
              , j = b.target.x
              , k = b.target.y + b.ty;
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
        return function(c) {
            return function(d) {
                return d.source.x < d.target.x ? a(c, d) : b(c, d)
            }
        }
    }
    ,
    j.link = function() {
        function a(a) {
            var c = a.source.x + a.source.dx
              , d = a.target.x
              , e = d3.interpolateNumber(c, d)
              , f = e(b)
              , g = e(1 - b)
              , h = a.source.y + a.sy + a.dy / 2
              , i = a.target.y + a.ty + a.dy / 2;
            return "M" + c + "," + h + "C" + f + "," + h + " " + g + "," + i + " " + d + "," + i
        }
        var b = .5;
        return a.curvature = function(c) {
            return arguments.length ? (b = +c,
            a) : b
        }
        ,
        a
    }
    ,
    j
}
,
!function(a) {
    "use strict";
    var b = '    <button class="dropdown-checkbox-toggle" data-toggle="dropdown" href="#">Dropdown trigger </button>    <div class="dropdown-checkbox-content">      <div class="dropdown-checkbox-header">        <input class="checkbox-all" type="checkbox"><input type="text" placeholder="Search" class="search"/>      </div>      <ul class="dropdown-checkbox-menu"></ul>    </div>'
      , c = '<li><div class="layout"><input type="checkbox"/><label></label></div></li>'
      , d = '<li><div class="layout"><label>No results.</label></div></li>'
      , e = ' <span class="dropdown-checkbox-nbselected"></span>'
      , f = function(c, d) {
        a(c).html(b),
        a(c).addClass("dropdown-checkbox dropdown"),
        this.$element = a(c).find(".dropdown-checkbox-toggle"),
        this.$parent = a(c),
        this.$list = this.$parent.find("ul"),
        this.elements = [],
        this.hasChanges = !1,
        this.showNbSelected = !1,
        "object" == typeof d && (this.$element.text(d.title),
        this.$element.addClass(d.btnClass),
        this.autosearch = d.autosearch,
        this.elements = d.data || [],
        this._sort = d.sort || this._sort,
        this.sortOptions = d.sortOptions,
        this.hideHeader = d.hideHeader || void 0 === d.hideHeader ? !0 : !1,
        this.templateButton = d.templateButton,
        this.showNbSelected = d.showNbSelected || !1),
        this.$element.append(e),
        this.templateButton && (this.$element.remove(),
        this.$parent.prepend(this.templateButton),
        this.$element = this.$parent.find(".dropdown-checkbox-toggle")),
        this.$element.attr("data-toggle", "dropdown"),
        this.hideHeader && this.$parent.find(".dropdown-checkbox-header").remove(),
        this.$parent.find(".dropdown-checkbox-content").on("click.dropdown-checkbox.data-api", function(a) {
            a.stopPropagation()
        }
        ),
        this.$element.on("click.dropdown-checkbox.data-api", a.proxy(function() {
            var b = this.$parent.hasClass("open");
            return a(".dropdown").removeClass("open"),
            b && this.$parent.addClass("open"),
            this.$parent.toggleClass("open"),
            this.hasChanges && this.$parent.trigger("change:dropdown-checkbox"),
            this.hasChanges = !1,
            !1
        }
        , this)),
        this.$parent.find(".checkbox-all").on("change.dropdown-checkbox.data-api", a.proxy(function(a) {
            this.onClickCheckboxAll(a),
            this._showNbSelected()
        }
        , this)),
        a(document).on("click.dropdown-checkbox.data-api", a.proxy(function() {
            this.$parent.removeClass("open"),
            this.hasChanges && this.$parent.trigger("change:dropdown-checkbox"),
            this.hasChanges = !1
        }
        , this)),
        this.$parent.find(".dropdown-checkbox-header").on("keyup.dropdown-checkbox.data-api", a.proxy(f.prototype.onKeyup, this)),
        this.$parent.find("ul").delegate("li input[type=checkbox]", "click.dropdown-checkbox.data-api", a.proxy(function(a) {
            this.onClickCheckbox(a),
            this._showNbSelected()
        }
        , this)),
        this._reset(this.elements),
        this._showNbSelected()
    }
    ;
    f.prototype = {
        constructor: f,
        _sort: function(a) {
            return a
        },
        _removeElements: function(a) {
            this._isValidArray(a);
            for (var b = [], c = !0, d = 0; d < this.elements.length; d++) {
                for (var e = 0; e < a.length; e++)
                    a[e] === parseInt(this.elements[d].id, 10) && (c = !1);
                c && b.push(this.elements[d]),
                c = !0
            }
            this.elements = b
        },
        _getCheckbox: function(a, b) {
            for (var c = [], d = 0; d < this.elements.length; d++)
                (a === this.elements[d].isChecked || b) && c.push(this.elements[d]);
            return c
        },
        _isValidArray: function(b) {
            if (!a.isArray(b))
                throw "[DropdownCheckbox] Requires array."
        },
        _findMatch: function(a, b) {
            for (var c = [], d = 0; d < b.length; d++)
                -1 !== b[d].label.toLowerCase().search(a.toLowerCase()) && c.push(b[d]);
            return c
        },
        _setCheckbox: function(a, b) {
            for (var c = 0; c < this.elements.length; c++)
                if (b == this.elements[c].id) {
                    this.elements[c].isChecked = a;
                    break
                }
        },
        _refreshCheckboxAll: function() {
            var b, c = this.$element.parents(".dropdown-checkbox").find("ul li input[type=checkbox]");
            c.each(function() {
                b = b || a(this).prop("checked")
            }
            ),
            this.$element.parents(".dropdown-checkbox").find(".checkbox-all").prop("checked", b)
        },
        _resetSearch: function() {
            this.$parent.find(".search").val(""),
            this._reset(this.elements)
        },
        _appendOne: function(a) {
            var b = a.id
              , d = a.label
              , e = a.isChecked
              , f = (new Date).getTime() * Math.random();
            this.$list.append(c);
            var g = this.$list.find("li").last();
            g.data("id", b);
            var h = g.find("input");
            h.attr("id", f),
            e && h.attr("checked", "checked");
            var i = g.find("label");
            i.text(d),
            i.attr("for", f),
            this._showNbSelected()
        },
        _append: function(b) {
            if (a.isArray(b)) {
                b = this._sort(b, this.sortOptions);
                for (var c = 0; c < b.length; c++)
                    this._appendOne(b[c])
            } else
                this._appendOne(b)
        },
        _reset: function(a) {
            this._isValidArray(a),
            this.$list.empty(),
            this._append(a),
            this._refreshCheckboxAll()
        },
        _showNbSelected: function() {
            this.showNbSelected && this.$element.find(".dropdown-checkbox-nbselected").html("(" + this._getCheckbox(!0, !1).length + ")")
        },
        onKeyup: function(b) {
            var c = b.keyCode
              , e = a(b.target).val();
            if (e.length < 1 && 8 === c)
                return this._reset(this.elements);
            if (27 === c)
                return this._resetSearch();
            if (this.autosearch || 13 === c) {
                var f = this._findMatch(e, this.elements);
                return f.length > 0 ? this._reset(f) : this.$list.html(d)
            }
        },
        onClickCheckboxAll: function(b) {
            var c = a(b.target).is(":checked")
              , d = this.$parent.find("ul li")
              , e = this;
            d.each(function() {
                a(this).find("input[type=checkbox]").prop("checked", c),
                e._setCheckbox(c, a(this).data("id"))
            }
            ),
            this.$parent.trigger("checked:all", c),
            this.$parent.trigger(c ? "check:all" : "uncheck:all"),
            this.hasChanges = !0
        },
        onClickCheckbox: function(b) {
            this._setCheckbox(a(b.target).prop("checked"), a(b.target).parent().parent().data("id")),
            this._refreshCheckboxAll(),
            this.$parent.trigger("checked", a(b.target).prop("checked")),
            this.$parent.trigger(a(b.target).prop("checked") ? "check:checkbox" : "uncheck:checkbox"),
            this.hasChanges = !0
        },
        checked: function() {
            return this._getCheckbox(!0)
        },
        unchecked: function() {
            return this._getCheckbox(!1)
        },
        items: function() {
            return this._getCheckbox(void 0, !0)
        },
        append: function(b) {
            if (a.isArray(b))
                for (var c = 0; c < b.length; c++)
                    this.elements.push(b[c]);
            else
                this.elements.push(b);
            this._append(b),
            this.hasChanges = !0
        },
        remove: function(a) {
            this._isValidArray(a),
            this._removeElements(a),
            this._reset(this.elements),
            this.hasChanges = !0
        },
        reset: function(b) {
            this.elements = a.isArray(b) ? b : [b],
            this._reset(b),
            this.hasChanges = !0
        }
    },
    a.fn.dropdownCheckbox = function(b, c) {
        var d = a(this)
          , e = d.data("dropdownCheckbox")
          , g = "object" == typeof b && b;
        return e || d.data("dropdownCheckbox", e = new f(this,g)),
        "string" == typeof b ? e[b](c) : this
    }
    ,
    a.fn.dropdownCheckbox.Constructor = f
}
(window.jQuery);
