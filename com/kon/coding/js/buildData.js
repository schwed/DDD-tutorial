/**
 * Created by kshevchuk on 7/9/2015.
 */
var nodesData = orientdb.query("select from DNSVertex",10000);

var linksData = orientdb.query('SELECT EXPAND( $c ) LET $a = ( SELECT FROM DNSEdge ), $b = (SELECT FROM Feeds), $c = UNIONALL( $a, $b )',10000);

var tempData = '{"links": [';

for (var i = 0; i < linksData.result.length; i++) {

    tempData +='{"source": '.concat('"').concat(linksData.result[i].in).concat('"')
        .concat(', "target": ').concat('"').concat(linksData.result[i].out).concat('"')
        .concat(', "value": ').concat('"').concat(linksData.result[i].out).concat('"').concat('}, ');
}

tempData += '] "nodes": [';

for (var i = 0; i < nodesData.result.length; i++) {

    tempData += '{"name": '.concat('"').concat(nodesData.result[i].name).concat('"').concat('}, ');
}


tempData += ']}';

console.log(tempData);



