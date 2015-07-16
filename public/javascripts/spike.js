const dev = 'DEV';
const uat = 'UAT';
const prod = 'PROD';

require(['d3'], function(d3) {

    var data = {
        'ecc': [
            {name: "1.0.0",    value:  'DEV'},
            {name: "1.3.1",    value:  'QA'},
            {name: "3.1.3",    value:  'UAT'}
        ],
        'support': [
            {name: "1.1.1",    value:  'UAT'},
            {name: "4.0.0",    value:  'DEV'},
            {name: "3.0.0",    value:  'QA'}
        ],
        'demo': [
            {name: "1.0.0",    value:  'DEV'},
            {name: "2.0.0",    value:  'UAT'},
            {name: "3.0.0",    value:  'PROD'}
        ]
    };

    drawPipeline(data['ecc'], 'ecc');
    drawPipeline(data['support'], 'support');
    drawPipeline(data['demo'], 'demo');
    function drawPipeline(data, env) {

        var margin = {top: 20, right: 30, bottom: 30, left: 40},
            width = 760 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .domain(["DEV", "QA", "UAT", "PROD"])
            .rangeBands([0, width]);

        var y = d3.scale.ordinal()
            .domain(data.map(function(d) { return d.name; }))
            .rangeBands([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var chart = d3.selectAll("#" + env + "-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width)
            .attr("dy", "3em")
            .style("text-anchor", "end")
            .text("Enviroments");

        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("x", -40)
            .attr("x", -40)
            .attr("y", 0)
            .attr("dy", "1em")
            .attr("dx", "3em")
            .style("text-anchor", "end")
            .text("Builds");

        chart.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", function(d) { return fixType(y(d.name)) + 30; })
            .attr("height", 20)
            .attr("width", 0)
            .transition()
            .attr("width", function(d) { return x(d.value) + 80; })
            .attr("env", function(d) { return d.value; })
            .duration(1000) // this is 1s;
            .delay(100)
            .ease("elastic").each("end", function () {
                var b = d3.select(this);
                if(b.attr("env") === prod) {
                    b.style("fill", "steelblue");
                }
            })
        ;
    }

    function fixType(d) {
        d.value = +d.value; // coerce to number
        return d;
    }
});