function init(elements) {
    let canvasW = 700;
    let canvasH = 400;
    
    let margin = 50
    let w = canvasW - (margin * 2);
    let h = canvasH - (margin * 2);
    let xinc = w/10;
    let yinc = h/10;

    

    const svg = d3.select("body").append("svg")
        .attr("width", 600)
        .attr("height", 400)
        .style("background-color", "#42f5e3");

    /*
    var jsonAnxiety = elements.map(function(d) {
        return {
          anxiety: d.anxiety,
        }
      });
      */


    //let jsonAnxiety = elements.filter(e => {return e.anxiety == true});

    

    let anxietyCircles = svg.selectAll()
        .data(elements)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => i * 50 + 75)
        .attr("cy", d => 375 - d.anxiety * 30)
        .attr("r", "5")
        .style("fill", "#5555aa")
        .style("opacity", ".5")

    let sleepSquare = svg.selectAll()
      .data(elements)
      .enter()
      .append("rect")
      .attr("fill", "#f2d177")
      .attr("x", (d, i) => i * 50+ 75 + 5)
      .attr("y", d => 375 - d.sleep * 30 - 5) 
      .attr("width", 10)
      .attr("height", 10)
      
      /*
    let sleepLine = svg.selectAll()
        .data(elements)
        .enter()
        .append("line")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("x1", (d,i) => x[d.sleep] + i*5);
        .attr("x2", )
    */
   svg.append('text')
    .attr('transform', 'translate(10, 100) rotate(-90)')
    .attr('x', -200).attr('y', 25)
    .attr("font-size", "30px")
    .attr("fill", "#a8bae3")
    .text('anxiety')
    .style('white-space', 'pre')

    svg.append('text')
    .attr('transform', 'translate(10, 100) rotate(-90)')
    .attr('x', -50).attr('y', 25)
    .attr("font-size", "30px")
    .attr("fill", "#f2d177")
    .text('sleep')
    .style('white-space', 'pre')

    svg.append('text')
    .attr('transform', 'translate(0, 0)')
    .attr('x', 100).attr('y', 50)
    .attr("font-size", "40px")
    .attr("fill", "#486cbd")
    .text('Anxiety + Sleep graph')
    .style('white-space', 'pre')
    
    svg.append('text')
    .attr('transform', 'translate(0, 0)')
    .attr('x', 175).attr('y', 375)
    .attr("font-size", "30px")
    .attr("fill", "#486cbd")
    .text('November 3 to 11')
    .style('white-space', 'pre')

}
