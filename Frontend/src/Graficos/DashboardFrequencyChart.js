import React, { Component } from 'react'
import {Legend, AreaChart,Area,Brush,CartesianAxis,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import moment from  'moment'
import './DashboardFrequencyChart.css';
import config from '../config.js';
//import 'moment/locale/es'

class DashboardFrequencyChart extends Component{

    constructor(props) {
      super(props);
      this.state = {visibility:[false,false,false,false],names:[],isLoading:true
      }
      this.changeVisibility = this.changeVisibility.bind(this);
      this.renderLines = this.renderLines.bind(this);
//      moment.locale('es')
    }

    fetch(){

    }

    componentDidUpdate(prevProps) {

              if((this.props.topics !== prevProps.topics)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
                {
                    console.log(this.props.topics);
                     this.updateChart();
                }
    }

    updateChart(){

      var topicsId=[];

      for (var i = 0; i < this.props.topics.length; i++) {
        topicsId.push(this.props.topics[i].topic_id);
      }
      var date="2015-09-01"

      if(this.props.topics.length===0){
         this.setState({isLoading:true});
      }

      fetch("http://" + config.base_url +":4000/api/visualizations/multiple_frequency_curve?topics_ids="+topicsId.toString()+"&date=" + date)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
          var names = []
           this.setState({visibility:[false,false,false,false]});
           this.setState({isLoading:true});
           for (var i = 0; i < this.props.topics.length; i++) {
             names[i]=this.props.topics[i].name;
           }
           this.setState({names});

           var topics = res.data.topics;
           var data2=[];
           var item = {};

           for (i = 0; i < topics[0].weeks.length; i++) {
             item = {};
             for (var j = 0; j < topics.length; j++) {
               item.date=moment(topics[j].weeks[i].week,'DD-MM-YYYY').valueOf();
               item["count"+j]= topics[j].weeks[i].count;
             }
             data2.push(item)
           }


          var notCero=new Array(topics.length).fill(false);
          for ( i = 0; i < topics.length; i++) {
            for ( j = 0; j < data2.length; j++) {
              if (data2[j]["count"+i]!==0) {
                notCero[i]=true;
                console.log(i);
                break;
              }
            }
          }


          console.log(topics.length);
          console.log(data2);
          console.log(notCero);
          console.log(notCero.filter(Boolean).length);

          if (notCero.filter(Boolean).length>=1) {
            this.setState({data2:data2,topicsNumber:notCero.filter(Boolean).length});
            this.setState({isLoading:false});
          }
         });



       } else {
         console.log('bad request');
       }
     })
     .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message);

     });


    }


    componentDidMount(){

      /*var tops='{"topics":['+
                      '{"topic_name": "Topico 1",'+
                      '	"topic_id": 2,'+
                      ' "weeks":['+
                          '{"week": "10-10-2018","count": 15},'+
                          '{"week": "17-10-2018","count": 27},'+
                          '{"week": "24-10-2018","count": 45},'+
                          '{"week": "31-10-2018","count": 70},'+
                          '{"week": "07-11-2018","count": 57},'+
                          '{"week": "14-11-2018","count": 67},'+
                          '{"week": "21-11-2018","count": 115},'+
                          '{"week": "28-11-2018","count": 127},'+
                          '{"week": "05-12-2018","count": 95},'+
                          '{"week": "12-12-2018","count": 120},'+
                          '{"week": "19-12-2018","count": 157},'+
                          '{"week": "26-12-2018","count": 167}'+
                            ']'+
                      '},'+
                      '{"topic_name": "Topico 2",'+
                      '	"topic_id": 5,'+
                      '	"weeks":['+
                          '{"week": "10-10-2018","count": 50},'+
                          '{"week": "17-10-2018","count": 43},'+
                          '{"week": "24-10-2018","count": 32},'+
                          '{"week": "31-10-2018","count": 49},'+
                          '{"week": "07-11-2018","count": 59},'+
                          '{"week": "14-11-2018","count": 67},'+
                          '{"week": "21-11-2018","count": 185},'+
                          '{"week": "28-11-2018","count": 97},'+
                          '{"week": "05-12-2018","count": 115},'+
                          '{"week": "12-12-2018","count": 80},'+
                          '{"week": "19-12-2018","count": 167},'+
                          '{"week": "26-12-2018","count": 197}'+
                            ']'+
                      '},'+
                      '{"topic_name": "Topico 3",'+
                      '	"topic_id": 54,'+
                      '	"weeks":['+
                          '{"week": "10-10-2018","count": 150},'+
                          '{"week": "17-10-2018","count": 143},'+
                          '{"week": "24-10-2018","count": 222},'+
                          '{"week": "31-10-2018","count": 99},'+
                          '{"week": "07-11-2018","count": 149},'+
                          '{"week": "14-11-2018","count": 87},'+
                          '{"week": "21-11-2018","count": 215},'+
                          '{"week": "28-11-2018","count": 167},'+
                          '{"week": "05-12-2018","count": 115},'+
                          '{"week": "12-12-2018","count": 90},'+
                          '{"week": "19-12-2018","count": 117},'+
                          '{"week": "26-12-2018","count": 137}'+
                            ']'+
                      '},'+
                      '{"topic_name": "Topico 4",'+
                      '	"topic_id": 14,'+
                      '	"weeks":['+
                          '{"week": "10-10-2018","count": 100},'+
                          '{"week": "17-10-2018","count": 103},'+
                          '{"week": "24-10-2018","count": 222},'+
                          '{"week": "31-10-2018","count": 250},'+
                          '{"week": "07-11-2018","count": 189},'+
                          '{"week": "14-11-2018","count": 187},'+
                          '{"week": "21-11-2018","count": 195},'+
                          '{"week": "28-11-2018","count": 167},'+
                          '{"week": "05-12-2018","count": 145},'+
                          '{"week": "12-12-2018","count": 290},'+
                          '{"week": "19-12-2018","count": 187},'+
                          '{"week": "26-12-2018","count": 197}'+
                            ']'+
                      '}'+
                    ']'+
              '}';

      var topics = JSON.parse(tops).topics;
      //console.log(topics);
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
      console.log(data2);
*/

      var topicsId=[];
      var names = this.state.names;
      for (var i = 0; i < this.props.topics.length; i++) {
        names[i]=this.props.topics[i].name;
      }
      this.setState({names})
      for (i = 0; i < this.props.topics.length; i++) {
        topicsId.push(this.props.topics[i].topic_id);
      }
      var date="2015-09-01"

      fetch("http://"+ config.base_url +":4000/api/visualizations/multiple_frequency_curve?topics_ids="+topicsId.toString()+"&date=" + date)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
           var topics = res.data.topics;
           var data2=[];
           var item = {};

           for (var i = 0; i < topics[0].weeks.length; i++) {
             item = {};
             for (var j = 0; j < topics.length; j++) {
               item.date=moment(topics[j].weeks[i].week,'DD-MM-YYYY').valueOf();
               item["count"+j]= topics[j].weeks[i].count;
             }
             data2.push(item)
           }


          var notCero=new Array(topics.length).fill(false);
          for (i = 0; i < topics.length; i++) {
            for (j = 0; j < data2.length; j++) {
              if (data2[j]["count"+i]!==0) {
                notCero[i]=true;
                console.log(i);
                break;
              }
            }
          }

          console.log(topics.length);
          console.log(data2);
          console.log(notCero.filter(Boolean).length);

          if (notCero.filter(Boolean).length>=1) {
            this.setState({data2:data2,topicsNumber:notCero.filter(Boolean).length});
            this.setState({isLoading:false});
          }
         });

       } else {
         console.log('bad request');
       }
     })
     .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message);

     });

    }

    changeVisibility(event){
      console.log(event);
      const newVisibility=this.state.visibility;
      if (newVisibility[event.payload.id]===true) {
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
      for (var i = 0; i < this.state.names.length ; i++) {
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
      if (this.state.isLoading) {
        if(this.props.topics.length ===0){
          var data =[
          {date: 1158724800000, count0: 1}
          ,
          {date: 1379646000000, count0: 1}
          ,
          {date: 1600570800000, count0: 1}
          ,
          {date: 1821409200000, count0: 1}
          ,
          {date: 1098241200000, count0: 1}
          ,
          {date: 1319079600000, count0: 1}
          ,
          {date: 1540004400000, count0: 1}
          ,
          {date: 1760929200000, count0: 1}
          ,
          {date: 1006225200000, count0: 6}
          ,
          {date: 1227150000000, count0: 1}
          ,
          {date: 1447988400000, count0: 1}
          ,
          {date: 1668913200000, count0: 1}
          ,
          {date: 1889838000000, count0: 1}
          ,
          {date: 1166583600000, count0: 1}
          ,
          {date: 1387508400000, count0: 1}
          ,
          {date: 1608433200000, count0: 1}
          ,
          {date: 1829271600000, count0: 1}
          ,
          {date: 1043031600000, count0: 1}
          ,
          {date: 1263956400000, count0: 1}
          ,
          {date: 1484881200000, count0: 1}
          ,
          {date: 1705719600000, count0: 1}
          ,
          {date: 1926644400000, count0: 1}
          ,
          {date: 1171940400000, count0: 1}
          ,
          {date: 1392865200000, count0: 1}
          ,
          {date: 1613790000000, count0: 1}]
          return(<div>
<ResponsiveContainer width='100%' height={300}>
<AreaChart data={data}
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
  <Tooltip/>

  <Area
    type="monotoneX"
    dataKey="count0"
    stroke="#F63141"
    strokeWidth={0}
    name="Sin temas"
    fillOpacity={0}
  />

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



</div>);}
      else{return(null);}
      }
      else {
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
                      className="tooltip"
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
}

export default DashboardFrequencyChart;
