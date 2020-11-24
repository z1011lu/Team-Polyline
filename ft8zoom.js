function init(elements) {


    let canvasW = 1600;
    let canvasH = 800;
  
    let margin = 50;
    let w = canvasW - (margin * 2);
    let h = canvasH - (margin * 2);
    let xScale = d3.scaleLinear()
      .domain([0,12000])
      .range([0,1600])
    let yScale = d3.scaleLinear()
      .domain([0,3000])
      .range([800,0])
    let xinc = w / 100;
    let yinc = h / 10;
  
    let svg = d3.select("body")
    .append("svg")
      .attr("width", canvasW)
      .attr("height", canvasH)
      //.call(d3.zoom().on("zoom", function () {svg.attr("transform", d3.event.transform)}))
      .style("background-color", d3.color("rgba(12,35, 64, 1)") );
      

      let jsonLocations = elements;
      //let jsonDistance = elements.filter( e => {  return e.distanceTo  } );
      //console.log(jsonDistance);

      let circles = svg.selectAll()
      .data(jsonLocations)
      .enter() 
        .append("circle") 
          .attr("fill", d3.color("rgba(253,165,15,1)")  )
          .attr("cx", d => { return margin + xScale(d.distanceTo)})
          .attr("cy", d => { return yScale(d.numberOfCalls)})
          .attr("r", 5) 
          .attr("stroke", d3.color("rgba(0,0,0,0.5)") )
          .attr("stroke-width", 2)


          const xAxis = svg.append("g")
          .style("stroke","white")
          .attr("transform","translate(0,750)")
          d3.axisBottom(xScale)(xAxis)
          
          const yAxis = svg.append("g")
          .style("stroke","white")
          .attr("transform","translate(50,0)")
          d3.axisLeft(yScale)(yAxis)


          let zoom = d3.zoom()
          zoom.on("zoom", function(e) {
            //console.log(e);
            let newXScale = e.transform.rescaleX(xScale)
            let newYScale = e.transform.rescaleY(yScale)
          
            //console.log(d3.selectAll("circle"));
            
            d3.selectAll("circle")
            .data(jsonLocations)
            .join()
            .attr("cx", d => newXScale(d.distanceTo))
            .attr("cy", d => newYScale(d.numberOfCalls))
            
          })
          svg.call(zoom);

/*
          let text = svg.selectAll()
          .data(jsonLocations)
          .enter();
      
      
        text
          .append("text")
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "white")
          .attr("x", d => { return -30 + margin + ((d.distanceTo/150) * xinc)- 200 + 30; })
          .attr("y", d => { return -60 + canvasH - (margin + ((d.numberOfCalls/7) * yinc)) + 30; })
          .text(d => {return d.location});
      
        text 
          .append("text")
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "lightBlue")
          .attr("x", d => { return -30 + margin + ((d.distanceTo/150) * xinc)- 200 + 30; })
          .attr("y", d => { return -48 + canvasH - (margin + ((d.numberOfCalls/7) * yinc)) + 30; })
          .text(d => {return d.numberOfCalls + " Call(s)"})

          text 
          .append("text")
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "pink")
          .attr("x", d => { return -30 + margin + ((d.distanceTo/150) * xinc)- 200 + 30; })
          .attr("y", d => { return -36 + canvasH - (margin + ((d.numberOfCalls/7) * yinc)) + 30; })
          .text(d => {return d.distanceTo + " mi"})


        const xText = svg.append("text")
          .attr("x",  canvasW / 2)
          .attr("y", canvasH - 20)
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "20px")
          .attr("fill", "white")
          .text("Distance from LA (in kilometers)");
      
        const yText = svg.append("text")
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "20px")
          .attr("fill", "white")
          .attr("transform", "translate(20,"+(canvasH/2)+") rotate(90)")
          .text("Number of RX (Receiving) Calls");

let zoom = d3.zoom()
zoom.on("zoom", function() {
  let newXScale = d3.event.transform.rescaleX(xScale)
  let newYScale = d3.event.transform.rescaleY(yScale)

})
*/

svg.call(zoom);


//Title, No idea how to do stacked text like this other than individual blocks. oh well.

        const Title1 = svg.append("text")
          .attr("x",  (canvasW * 9) / 10)
          .attr("y", canvasH + (-canvasH + 50))
          .attr("text-anchor","right")
          .attr("font-family", "sans-serif")
          .attr("font-size", "24px")
          .attr("fill", "lightBlue")
          .text("12 Hours of");


          const Title2 = svg.append("text")
          .attr("x",  (canvasW * 9) / 10)
          .attr("y", canvasH + (-canvasH + 110))
          .attr("text-anchor","right")
          .attr("font-family", "sans-serif")
          .attr("font-size", "72px")
          .attr("fill", d3.color("rgba(253,165,15,1)") )
          .text("FT8");


          const Title3 = svg.append("text")
          .attr("x",  (canvasW * 9) / 10)
          .attr("y", canvasH + (-canvasH + 136))
          .attr("text-anchor","right")
          .attr("font-family", "sans-serif")
          .attr("font-size", "24px")
          .attr("fill", "lightBlue")
          .text("Digital Mode");

          const Title4 = svg.append("text")
          .attr("x",  (canvasW * (9) / 10) + 1)
          .attr("y", canvasH + (-canvasH + 160))
          .attr("text-anchor","right")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "white")
          .text("by Kai Turner - KN6KXG");

    csv('FT8dataset.csv').then(data => {
        console.log(data);
    });
}

