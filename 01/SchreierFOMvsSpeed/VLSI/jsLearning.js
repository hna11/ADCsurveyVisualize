var slider = document.getElementById("myRange");

d3.csv('01/SchreierFOMvsSpeed/VLSI/VLSI.csv', function(data) { 

    var svg = d3.select("svg"),
        margin = 200,        
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    var xScale = d3.scaleLog()
                    .domain([1e+02, 1e+12])
                    .range([0, width])

        yScale = d3.scaleLinear()                  
                   .domain([120, 190])
                   .range([height, 0])
        
    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', 70)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 25)
    .style('font-weight', 'bold')
    .text('Schreier FOM vs Speed VLSI 1997-2021');
    
    svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', height - 15 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 14)
    .style('font-weight', 'bold')
    .text('f_snyq [Hz]');
    
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(60,' + (height-50) + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 14)
    .style('font-weight', 'bold')
    .text('FOM_s,hf [dB]');

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
    
    g.append("g")
        .call(d3.axisLeft(yScale));

// *****************************************************************
    d3.csv('01/SchreierFOMvsSpeed/VLSI/line.csv', function(line1) {
    var line = d3.line()
        .x(function(n) { return xScale(n.X)}) 
        .y(function(n) { return yScale(n.Y)}) 
        .curve(d3.curveMonotoneX)        
    svg.append("path")
        .datum(line1) 
        .attr("class", "line") 
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")

        .style("stroke", "red")
        .style("stroke-width", "2")
/*
        var line2 = d3.line()
        .x(function(n) { return xScale(n.X)}) 
        .y(function(n) { return yScale(n.Y)}) 
        .curve(d3.curveMonotoneX)        
    svg.append("path")
        .datum(line1) 
        .attr("class", "line") 
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line2)
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", "2")*/

    })
// **********************************************

slider.oninput = function() {             
    var year = data.filter(function(d) { if (d.YEAR < slider.value) { return d }})
    var year2021 = data.filter(function(dd) { if (slider.value==2021) { return dd }})

svg.append('g')
    .selectAll("dot")
    .data(year)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.fsnyq_w); } )
    .attr("cy", function (d) { return yScale(d.FOMS_hf_ab); } )
    .attr("r", 3)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#2cb320")

.on("mouseover", function(d) {
        d3.select(this).attr("r", 6)
        g.append("text")
        .attr('class', 'val') 
        .attr('x',  xScale(d.fsnyq_w)-15)
        .attr('y', yScale(d.FOMS_hf_ab)-10)
        .text(d.YEAR)
    })
.on("mouseout", function(d) {
        d3.select(this).style("stroke", 'none')
        d3.select(this).attr("r", 3)
        d3.selectAll('.val').remove()
        d3.selectAll('class').remove()
    }) 

    .data(year2021)
    .enter()
    .append("rect")
    .attr("x", function (dd) { return xScale(dd.fsnyq_w); } )
    .attr("y", function (dd) { return yScale(dd.FOMS_hf_ab); } )
    .attr('width', 6)
    .attr('height', 6)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "red")

.on("mouseover", function(dd) {
        d3.select(this)
        .attr("x", function (dd) { return xScale(dd.fsnyq_w)-2; } )
        .attr("y", function (dd) { return yScale(dd.FOMS_hf_ab)-2; } )
        .attr('width', 10)
        .attr('height', 10)
        
        g.append("text")
        .attr('class', 'val') 
        .attr('x',  xScale(dd.fsnyq_w)-15)
        .attr('y', yScale(dd.FOMS_hf_ab)-10)
        .text(dd.YEAR)
    })
.on("mouseout", function(dd) {
        d3.select(this)
            .style("stroke", 'none')
            .attr("x", function (dd) { return xScale(dd.fsnyq_w); } )
            .attr("y", function (dd) { return yScale(dd.FOMS_hf_ab); } )
            .attr('width', 6)
            .attr('height', 6)
            d3.select(this)
        d3.selectAll('.val').remove()
        d3.selectAll('class').remove()
    }) 
}})