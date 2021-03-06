import React, { Component } from 'react'
import cloud from 'd3-cloud';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection'


class WordCloud extends Component{

     constructor(props){
        super(props)
        this.createWordCloud = this.createWordCloud.bind(this)
     }

     componentDidMount() {
        this.createWordCloud()
     }

     createWordCloud() {
       var keywords = this.props.words;
       var frequency_list = [];
       var max = 0,min=10;
       for( var i = 0; i < keywords.length ; i++){
         if(keywords[i].weight>max) { max = keywords[i].weight}
         if(keywords[i].weight < min){min = keywords[i].weight}
       }
       var interval = [15,60];
       for(i = 0; i < keywords.length ; i++){

         const w = ((interval[1] - interval[0]) * (keywords[i].weight - min) / (max - min)) + interval[0];
         frequency_list.push({"text" : keywords[i].name, "size":w});
       }


      var color = scaleLinear()
           .domain([0,1,2,3,4,5,6,10,15,20,100])
           .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

      const node = this.node


     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .enter()
        .append('rect')



     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .exit()
        .remove()

     select(node)
        .selectAll('rect')
        .data(this.props.data)
         cloud().size([550, 380])
            .words(frequency_list)
            .rotate(0)
            .padding(3)
            .font('IBM Plex Sans')
            .fontSize(function(d) { return d.size  ; })
            .on("end", draw)
            .start();


            function draw(words) {
            select(node).append("svg")

                     .attr("class", "wordcloud")
                     .attr("text-anchor", "middle")
                     .append("g")
                     // without the transform, words words would get cutoff to the left and top, they would
                     // appear outside of the SVG area
                     .attr("transform", "translate(240,180)")
                     .selectAll("text")
                     .data(words)
                     .enter().append("text")

                     .style("font-size", function(d) { return d.size })
                     .style("fill", function(d, i) { return color(i); })

                     .attr("transform", function(d) {
                         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                     })
                     .text(function(d) { return d.text; });
     }

     }
  render() {
        return <svg  ref={node => this.node = node}
        width={550} height={320}>
        </svg>
     }
  }
  export default WordCloud;
