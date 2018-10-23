import React, { Component } from 'react'
import {Legend, AreaChart,Area,Brush,CartesianAxis,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import moment from  'moment'
import './DashboardFrequencyChart.css';
//import 'moment/locale/es'

class DashboardFrequencyChart extends Component{

    constructor(props) {
      super(props);
      this.state = {visibility:[false,false,false,false],names:[]
      }
      this.changeVisibility = this.changeVisibility.bind(this);
      this.renderLines = this.renderLines.bind(this);
//      moment.locale('es')
    }

    componentDidMount(){

      var tops='{"topics":[{	"topic_name": "Topico 1",	"topic_id": 2,"weeks":[{"week": "10/10/2018",				"count": 60},{			"week": "17/10/2018","count": 80	}]},	{	"topic_name": "Topico 2",	"topic_id": 5,	"weeks":[{"week": "10/10/2018","count": 30},{"week": "17/10/2018","count": 50}]}]}';

      var topics = JSON.parse(tops).topics;
      console.log(topics);
      var data2=[];
      var item = {};

      for (var i = 0; i < topics[0].weeks.length; i++) {
        item = {};
        for (var j = 0; j < topics.length; j++) {
          item.date=moment(topics[j].weeks[i].week,'DD/MM/YYYY').valueOf();
          item["count"+j]= topics[j].weeks[i].count;
        }
        data2.push(item)
      }


      for (var i = 0; i < topics.length; i++) {
        this.state.names[i]=topics[i].topic_name;
      }
      this.setState({data2:data2,topicsNumber:topics.length});

    }

    changeVisibility(event){
      console.log(event);
      const newVisibility=this.state.visibility;
      if (newVisibility[event.payload.id]==true) {
        newVisibility[event.payload.id]=false;
      }
      else if (newVisibility.filter(Boolean).length< this.state.topicsNumber-1) {
        newVisibility[event.payload.id]=true;
      }
      console.log(newVisibility.filter(Boolean));
      this.setState({visibility: newVisibility});


    }

    renderLines(){
      var out=[];
      var colors=["#F63141","#40A7C2","#73DB9A","#FFB744"]

      for (var i = 0; i < 2 ; i++) {
        out.push(
          <Area
            type="monotoneX"
            dataKey={"count"+i}
            stroke={colors[i]}
            strokeWidth={2}
            name={this.state.names[i]}
            fillOpacity={0}
            id={i}
            hide={this.state.visibility[i]}
          />
      );
      }



      return out;
    }

    render(){
    return (
              <div>
              <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={this.state.data2}
                margin={{ top: 30, right: 50, left: -18, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(tick) => moment(tick).format('MMM')}
                  allowDecimals={true}
                  allowDataOverflow={true}
                  domain={['dataMin', 'dataMax']}
                  padding={{left:10}}
                  stroke="#5C7582"
                  interval={3}
                />
                <YAxis
                  axisLine={false}
                  stroke="#5C7582"
                  domain={[dataMin => 0, dataMax => Math.round(dataMax * 0.11)*10]}
                  interval={"preserveStart"}
                />
                <CartesianAxis />
                <CartesianGrid
                  vertical={false}
                  stroke="#3A4D5A"
                  opacity="0,2" />
                <Tooltip
                  cursor={false}
                  labelFormatter={(tick) => moment(tick).format('[Semana:] w [-] DD/MMM/YY')}
                />

                {this.renderLines()}

                <Legend
                  align="right"
                  layout="vertical"
                  margin={{ top: 0, left: 20, right: 0, bottom: 0 }}
                  wrapperStyle={{"color":"white",paddingLeft: "20px",paddingBottom: "30px"}}
                  onClick={this.changeVisibility}
                  iconType="circle"
                  />

                <Brush
                  height={25}
                  dataKey="date"
                  tickFormatter={(tick) => moment(tick).format('MMM')}
                  fill={"rgba(88,114,124,0.02)"}
                  wrapperStyle={{ color: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>

            </div>

    );
  }
}

export default DashboardFrequencyChart;
