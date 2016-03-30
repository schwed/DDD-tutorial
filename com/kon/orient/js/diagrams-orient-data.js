/**
 * Created by kshevchuk on 7/7/2015.
 */

// connect
d3.json('http://USMDCKDDB6042:2480/connect/VisualDNS');

queue()
    .defer(d3.json()) // Syatems
    .defer(d3.json, 'cities.json') // FileShares
    .await(makeDataMap); // function that uses files

function makeDataMap(error, states, cities) {
    svg.append('path')
        .datum(topojson.feature(states, states.objects.usStates))
        .attr('d', path)
        .attr('class', 'states');
    svg.selectAll('.cities')
        .data(cities.features)
        .enter()
        .append('path')
        .attr('d', path.pointRadius(5))
        .attr('class', 'cities');
}


// disconnect
d3.json('http://USMDCKDDB6042:2480/disconnect');