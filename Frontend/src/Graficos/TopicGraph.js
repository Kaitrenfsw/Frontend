import React, { Component } from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';
import {withRouter} from "react-router-dom";



class TopicGraph extends Component{
  constructor(props){
      super(props);
      this.createGraph = this.createGraph.bind(this);
      this.HandleMouseClick = this.HandleMouseClick.bind(this);
      this.resize = this.resize.bind(this);
  }
  state = {
    h:450,
    w:450
  }



  componentDidMount() {
      this.setState({
      h: document.getElementsByClassName('graph-div')[0].clientHeight,
      w: document.getElementsByClassName('graph-div')[0].clientWidth
      });
      if(this.props.dataset !=null){
          this.createGraph();
      }
      window.addEventListener('resize', this.resize);
  }


  resize() {
    if(Math.abs(this.state.w - document.getElementsByClassName('graph-div')[0].clientWidth) > 40){
     this.setState({
     h: document.getElementsByClassName('graph-div')[0].clientHeight,
     w: document.getElementsByClassName('graph-div')[0].clientWidth
   });
  }
 }


   componentWillUnmount() {
     window.removeEventListener('resize', this.resize)
   }

   componentDidUpdate(prevProps, prevState) {
     /**
       if((prevState.w !== this.state.w)){
         this.ReDrawGraph();
       }**/
       if((prevProps.dataset !== this.props.dataset)){
         this.ReDrawGraph();
       }
   }

   ReDrawGraph(){
     select(".graph").remove()
     this.createGraph();
   }

   HandleMouseClick(d){
     if(d.index !== 0){
       this.props.history.push('/topicos/' + d.id);
   }}



  createGraph(){
  const nodo = this.node;
  var svg = select(nodo).append("svg").attr("class", "graph");
  var svgWidth = this.state.w;
  var svgHeight = this.state.h;
  var responsiveCoef = Math.min(svgWidth,svgHeight)/45;
  var colores_nodos = ['#FF5C55','#ECB775', ' #87D597'];



  var dataset = {
      nodes: [
          { name: "AI"},
          { name: "Data Science" },
          { name: "Agile" },
          { name: "Iphone" },
          { name: "Apple" },
          { name: "Samsung" },
          { name: "Tesla" },
          { name: "Networking" },
          { name: "Cyber Security" },
          { name: "IOT" },
          { name: "Big Data" },
          { name: "Google" },
          { name: "Cloud" }
      ],
      edges: [
        {"source":1,"target":0,"value":20},
        {"source":2,"target":0,"value":95},
        {"source":3,"target":0,"value":30},
        {"source":4,"target":0,"value":50},
        {"source":5,"target":0,"value":65},
        {"source":6,"target":0,"value":55},
        {"source":7,"target":0,"value":11},
        {"source":8,"target":0,"value":98},
        {"source":9,"target":0,"value":60},
        {"source":10,"target":0,"value":11},
        {"source":11,"target":0,"value":98},
        {"source":12,"target":0,"value":60}
      ]
  };
  if(this.props.dataset!=null){
    dataset = this.props.dataset;
  }
  //Se calcula la posición mediante angulos.
  var    angle,x,y,i;
         for (i=0; i<dataset.nodes.length - 1; i++) {
          angle = (i / ((dataset.nodes.length - 1)/2)) * Math.PI; // Calcula el angulo
          x = (svgWidth * Math.cos(angle)) + (svgWidth/2); // Calcula la posición x
          y = (svgHeight * Math.sin(angle)) + (svgHeight/2); // Calcula la posición y
          dataset.nodes[i+1].x = x;
          dataset.nodes[i+1].y = y;
  }
  //Se centra el nodo principal.
  dataset.nodes[0].x = svgWidth/2;
  dataset.nodes[0].y = svgHeight/2;
  //Se establece la longitud  de arcos.
  var length = Math.min(svgHeight,svgWidth)/3;

  //se obtienen el max y min.
  var max = 0,min=10;
  for( i = 0; i < dataset.edges.length ; i++){
    if(dataset.edges[i].value>max) { max = dataset.edges[i].value}
    if(dataset.edges[i].value< min){min = dataset.edges[i].value}
  }
  var interval = [0.1,1];
  for(i = 0; i < dataset.edges.length ; i++){
    const w = ((interval[1] - interval[0]) * (dataset.edges[i].value - min) / (max - min)) + interval[0];
    dataset.edges[i].value =  w ;
    dataset.nodes[i +1].value =  w;
  }

  var simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d,i) {
              return i;
          }).strength (function (d) {return 0.2;}).distance(function (d) {return length ;}))
          .force("center", d3.forceCenter(svgWidth / 2,svgHeight / 2.4))
          .force('charge', function(d){
              var charge = -500;
              if (d.index === 0) charge = 10 * charge;
              return charge;
          });



  var div = select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);




  var edges = svg.append('g')
          .attr('class','links')
          .selectAll("line")
          .data(dataset.edges)
          .enter()
          .append("line")
          .style("stroke-width", function(d) { return 1; })
          .attr("stroke", function(d) {
              return "#6B828F";
            })




  var node = svg.append('g')
          .attr('class','nodes')
          .selectAll('circle')
          .data(dataset.nodes)
          .enter()
          .append("circle")
          .attr("r", function(d){
              if(d.index === 0){ return responsiveCoef * 2}
              return  d.value * responsiveCoef;
          })

            .style("stroke-width", function(d) { return 3; })
            .attr("stroke", function(d) {
            if(d.value>=0.7 ) return colores_nodos[2];
            else if(d.value>=0.4) return colores_nodos[1];
            else if(d.value>=0) return colores_nodos[0];
            else if(d.index ===0 )return '#5CACC4';
            })
          .attr('fill',function (d,i) {
              if(d.value>=0.7 ) return colores_nodos[2];
              else if(d.value>=0.4) return colores_nodos[1];
              else if(d.value>=0) return colores_nodos[0];
              else if(d.index ===0 ) return '#5CACC4';
          })
          .on("click", this.HandleMouseClick)
          .on("mouseover", mouseover)
          .on("mouseout", mouseout);
          /*
          .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended));
                  */

  var nodes_text = svg.selectAll(".nodetext")
          .data(dataset.nodes)
          .enter()
          .append("text")
          .attr("class", "nodetext slds-text-heading--label")
          .attr("text-anchor", "middle")

          .attr("dx", function(d) {
            if(d.index === (((dataset.nodes.length -1 )/4) +1)){ return 0;}
            else if(d.index === (((dataset.nodes.length -1 )*3/4) +1)){ return 0;}
            else if(d.index >= ((dataset.nodes.length )* 3/4) && d.index !== 0){ return d.name.length*1.2;}
            else if(d.index <= ((dataset.nodes.length -1) /4) && d.index !== 0 ){ return d.name.length*1.2;}
            else if(((dataset.nodes.length -1) /4) <= d.index && d.index < ((dataset.nodes.length -1) * 3/4) && d.index !== 0 ){ return -d.name.length*1.2;}
            else{ return 0;}})

          .attr("dy", function(d) {
            if(d.index === 0 ){ return 45;}
            if(d.index <= (dataset.nodes.length /2) ){ return (d.value*responsiveCoef) + responsiveCoef * 1.5;}
            else return ( - d.value *responsiveCoef) -responsiveCoef/2;})
          .style('fill', '#cfd1d1') /*#5C7582*/
          .style('font-weight', 'bold')
          .style('cursor', 'pointer')
          .style('font-size','0.9em')
          .text(function(d) {
              return  d.name;
          })
          .on("click", this.HandleMouseClick);

  simulation
          .nodes(dataset.nodes)
          .on("tick", ticked);
  simulation
          .force("link")
          .links(dataset.edges);
  function ticked() {
      edges
              .attr("x1", function (d) {
                  var xPos = d.source.x;
                  if (xPos < 0) return 0;
                  if (xPos > (svgWidth - responsiveCoef)) return (svgWidth - responsiveCoef);
                  return xPos;
              })
              .attr("y1", function (d) {
                  var yPos = d.source.y;
                  if (yPos < 0) return 0;
                  if (yPos > (svgHeight - responsiveCoef)) return (svgHeight - responsiveCoef);
                  return yPos;
              })
              .attr("x2", function (d) {
                  var xPos = d.target.x;
                  if (xPos < 0) return 0;
                  if (xPos > (svgWidth - responsiveCoef)) return (svgWidth - responsiveCoef);
                  return xPos;
              })
              .attr("y2", function (d) {
                  var yPos = d.target.y;
                  if (yPos < 0) return 0;
                  if (yPos > (svgHeight - responsiveCoef)) return (svgHeight - responsiveCoef);
                  return yPos;
              });

      node
              .attr("cx", function (d) {
                  var xPos = d.x;
                  if (xPos < 0) return 0;
                  if (xPos > (svgWidth - responsiveCoef)) return (svgWidth - responsiveCoef);
                  return xPos;
              })
              .attr("cy", function (d) {
                  var yPos = d.y;
                  if (yPos < 0) return 0;
                  if (yPos > (svgHeight - responsiveCoef)) return (svgHeight - responsiveCoef);
                  return yPos;
              });

      nodes_text
              .attr("x", function(d) {
                  var xPos = d.x;
                  if (xPos < 0) return 0;
                  if (xPos > (svgWidth - responsiveCoef)) return (svgWidth - responsiveCoef);
                  return xPos;
              })
              .attr("y", function(d) {
                  var yPos = d.y;
                  if (yPos < 0) return 0;
                  if (yPos > (svgHeight - responsiveCoef)) return (svgHeight - responsiveCoef);
                  return yPos;
              });
  }




  function mouseover(d) {
    if(d.index !== 0){
       d3.select(this).transition()
      .duration(250)
      .attr("r", function(d){return (d.value *responsiveCoef) *1.2})

      /*
          var matrix = this.getScreenCTM()
      div.style("opacity", 1)
      .style("left", (window.pageXOffset + matrix.e + 30) + "px")
      .style("top", (window.pageYOffset + matrix.f - 15) + "px")
      div.html(
            "<div class='recharts-tooltip-wrapper recharts-tooltip-wrapper-right recharts-tooltip-wrapper-bottom' style='pointer-events: none; visibility: visible; position: absolute; top: 0px;  transition: -webkit-transform 400ms ease;'>" +

            "<div class='recharts-default-tooltip-graph' style='margin: 0px; padding: 10px; background-color: rgb(255, 255, 255); border: 1px solid rgb(204, 204, 204); white-space: nowrap;'>" +
            "<p class='recharts-tooltip-label' style='margin: 0px; font-size: 14px'> " + d.name  + "</p>" +
            "<ul class='recharts-tooltip-item-list' style='padding: 0px; margin: 0px;'>" +
            "<li class='recharts-tooltip-item' style='display: block; padding-top: 4px; padding-bottom: 4px; color: #494a4c;font-size: 14px'>"+
            "<span class='recharts-tooltip-item-name'>" +
            "<span class='recharts-tooltip-item-unit'>" + "</span>" + "</li>" + "</ul>" + "</div>"+ "</div>")
            */
    }


  }

  function mouseout(d) {
    if(d.index !== 0){
       d3.select(this).transition()
      .duration(250)
      .attr("r", function(d){return d.value *responsiveCoef})
      div.style("opacity", 0);
    }

  }
  }

  render() {

    return (<svg   ref={node => this.node = node}
    width={this.state.w} height={450}>
    </svg>)
  }



  }
  export default withRouter(TopicGraph);
