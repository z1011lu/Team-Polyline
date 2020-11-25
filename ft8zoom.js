function init(elements) {


    let canvasW = 1200;
    let canvasH = 600;
  
    let margin = ({top: 50, right: 50, bottom: 50, left: 50})


    const jsonCircles = elements;
    const jsonLocations = elements;


    let w = canvasW - (margin * 2);
    let h = canvasH - (margin * 2);

    let xScale = d3.scaleLinear()
      .domain([0,12000])
      .range([margin.left, canvasW - margin.right])
    let yScale = d3.scaleLinear()
      .domain([0,3000])
      .range([canvasH - margin.bottom, margin.top])

    //let margin = 50;


    //let xinc = w / 100;
    //let yinc = h / 10;
  
    let svg = d3.select("body")
    .append("svg")
      .attr("width", canvasW)
      .attr("height", canvasH)
      .style("background-color", d3.color("rgba(12,35, 64, 1)") );
      //.call(d3.zoom().on("zoom", function () {svg.attr("transform", d3.e.transform)}))

      //let jsonDistance = elements.filter( e => {  return e.distanceTo  } );
      //console.log(jsonDistance);

      let circles = svg.selectAll()
      .data(jsonCircles)
        .enter() 
          .append("circle") 
            .attr("id", d => "c" + d.id)
            .attr("fill", d3.color("rgba(253,165,15,1)")  )
            .attr("cx", d => { return xScale(d.distanceTo)})
            .attr("cy", d => { return yScale(d.numberOfCalls)})
            .attr("r", 5) 
            .attr("stroke", d3.color("rgba(0,0,0,0.5)") )
            .attr("stroke-width", 2)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);


      function handleMouseOver() {
        //console.log(d3.select(this).attr("id"));
        circleID = d3.select(this).attr("id");
        let newText = svg.selectAll()
        .data(jsonLocations)
          .enter()
            .append("text")
            .attr("id", "t")
            .attr("text-anchor","left")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("x", 80)
            .attr("y", 40)
            .append("tspan")
              .attr("fill", d3.color("rgba(253,165,15, 1)") )
              .text(d => { if(circleID == "c" + d.id){return "Country: " + d.location}})
              .attr("id", "textLoc")
              .attr("opacity", 0.1)
            .append("tspan")
              .attr("fill", "lightBlue")
              .text(d => { if(circleID == "c" + d.id){return "# of calls: " + d.numberOfCalls}})
              .attr("dy", 20)
              .attr("x", 80)
              .attr("id", "textLoc")
            .append("tspan")
              .attr("fill", "pink")
              .text(d => { if(circleID == "c" + d.id){return "Distance(miles): " + d.distanceTo}})
              .attr("dy", 20)
              .attr("x", 80)
              .attr("id", "textLoc")
          d3.selectAll("#textLoc")
            .transition()
              .duration(300)
              .attr("opacity", 1)

              console.log(newText)
      }

      function handleMouseOut(){
      //console.log(d3.selectAll('#t').attr("id"));
      
        d3.selectAll("#textLoc")
        .transition()
          .duration(1)
          .attr("opacity", 0.0)
          .remove();
          
        //d3.selectAll("#t")
        //.delay(300)
        //.remove();
        
      }
      
          let xAxis = svg.append("g")
          .style("stroke","white")
          .attr("transform","translate(0,550)")
          d3.axisBottom(xScale)(xAxis)
          //let xAxisGroup = d3.select("#xAxis");

          let yAxis = svg.append("g")
          .style("stroke","white")
          .attr("transform","translate(50,0)")
          d3.axisLeft(yScale)(yAxis)
          //let yAxisGroup = d3.select("#yAxis");


          let text = svg.selectAll()
          .data(jsonLocations)
          .enter();
          
        text
          .append("text")
          .attr("id","t2")
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "white")
          .attr("x", d => { return xScale(d.distanceTo)})
          .attr("y", d => { return yScale(d.numberOfCalls) + 20})
          .text(d => {return d.location});
/*      
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
*/

let zoom = d3.zoom()
.scaleExtent([1, 40])
.translateExtent([[0,0],[canvasW,canvasH]]);
zoom.on("zoom", function(e) {

  let newXScale = e.transform.rescaleX(xScale)
  let newYScale = e.transform.rescaleY(yScale)

  //xAxis.scaleLinear(newXScale);
  //xAxisGroup.call(xAxis);

  //yAxis.scaleLinear(newYScale);
  //yAxisGroup.call(yAxis);
  
  d3.selectAll("circle")
  .data(jsonCircles)
  .join()
  .attr("cx", d => { return newXScale(d.distanceTo)})
  .attr("cy", d => { return newYScale(d.numberOfCalls)})


  //let jsonLocations2 = elements.filter( e => {  return e.distanceTo  } );


  d3.selectAll("#t2")
  //.data(jsonLocations)
    //.enter()
      //.join()
      .attr("x", d => { return newXScale(d.distanceTo)}) //gitchy, only applies the first of the two attributes :(
      .attr("y", d => { return newYScale(d.numberOfCalls) + 20})

  //d3.selectAll("text")
  //.data(jsonLocations2)
  //.join()
  //.attr("y", d => newYScale(d.numberOfCalls))

})
svg.call(zoom);

        const xText = svg.append("text")
          .attr("x",  canvasW / 2)
          .attr("y", canvasH - 5)
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("fill", "white")
          .text("Distance from LA (in kilometers)");
      
        const yText = svg.append("text")
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("fill", "white")
          .attr("transform", "translate(60,"+(canvasH/2)+") rotate(90)")
          .text("Number of RX (Receiving) Calls");



svg.call(zoom);


//Title, No idea how to do stacked text like this other than individual blocks. oh well. \n does not work.
const titleX = .9
        const Title1 = svg.append("text")
          .attr("x",  canvasW * titleX)
          .attr("y", canvasH + (-canvasH + 50))
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "24px")
          .attr("fill", "lightBlue")
          .text("24 Hours of");


          const Title2 = svg.append("text")
          .attr("x",  canvasW * titleX)
          .attr("y", canvasH + (-canvasH + 110))
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "72px")
          .attr("fill", d3.color("rgba(253,165,15,1)") )
          .text("FT8");


          const Title3 = svg.append("text")
          .attr("x",  canvasW * titleX)
          .attr("y", canvasH + (-canvasH + 136))
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "24px")
          .attr("fill", "lightBlue")
          .text("Digital Mode");

          const Title4 = svg.append("text")
          .attr("x",  (canvasW * titleX))
          .attr("y", canvasH  + (-canvasH + 155))
          .attr("text-anchor","middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "white")
          .text("by Kai Turner, Zach Lu, & Rick Li");

    /*csv('FT8dataset.csv').then(data => {
        console.log(data);
    });*/
}

