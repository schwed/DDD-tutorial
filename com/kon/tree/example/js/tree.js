/**
 * Created by kshevchuk on 6/24/2015.
 */

/**
 *  BUILD THE TREE
 */
var tree = d3.layout.tree()
    .sort(null)
    .size([size.height, size.width - maxLabelLength * options.fontSize])
    .children(function(d) {return (!d.contents || d.contents.length === 0) ? null : d.contents;});

var nodes = tree.nodes(treeData);
var links = tree.links(nodes);



/**
 *  RENDER THREE
 */

    /*
        <svg>
            <g class="container" />
        </svg>
     */

var layout = d3.select(containerName)