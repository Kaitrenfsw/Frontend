import React, { Component } from 'react'
import { AreaChart,Area,Brush,CartesianAxis,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import moment from  'moment'
import './FrequencyChart.css';
//import 'moment/locale/es'

class FrequencyChart extends Component{

    constructor(props) {
      super(props);
      this.state = {
        chartData: null,
        data:null,
        isLoading: true,

      }
//      moment.locale('es')
    }

    componentDidMount(){

      var topicId=this.props.topicId; //7
      var date="2015-09-01"
      console.log("id:"+topicId);

      fetch("http://localhost:4000/api/visualizations/frequency_curve?topic_id="+topicId+"&date=" + date)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
           var obj = res.data.weeks;
           for (var i = 0; i < obj.length; i++) {
             obj[i].date=moment(obj[i].week,'YYYY-MM-DD').valueOf()
           }
           this.setState({data: obj});
           this.setState({isLoading:false});
           console.log(res);
         });
          console.log("hola");

       } else {
         console.log('bad request');
       }
     })
     .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message);

     });




    }

    render(){
    console.log(this.state.data);
    if(this.state.isLoading){
      return(null);
    }
    else{
    return (
              <div>
              <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={this.state.data}
                margin={{ top: 30, right: 50, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F63141" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#F63141" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#40A7C2" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#40A7C2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotoneX"
                  dataKey="count"
                  stroke="#F63141"
                  strokeWidth={2}
                  name="Publicaciones"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />

                <Brush
                  height={25}
                  dataKey="date"
                  tickFormatter={(tick) => moment(tick).format('MMM YY')}
                  fill={"rgba(88,114,124,0.02)"}
                />


              </AreaChart>
            </ResponsiveContainer>
            </div>

    );}
  }
}

export default FrequencyChart;
