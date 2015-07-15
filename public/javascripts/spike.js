require(['d3'], function(d3) {
    var data = [4, 8, 15, 16, 23, 42];

    stages = {
        'DEV' : 25,
        'QA'  : 50,
        'UAT' : 75,
        'PROD': 100
    };

    var data = [
        {name: "1.0.0",    value:  'DEV'},
        {name: "2.0.0",    value:  'PROD'}
    ];

    var width = 420,
        barHeight = 20;

    var x = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return stages[d.value]; })])
        .range([0, width]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d) { return x(stages[d.value]); })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(stages[d.value]) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });

});
