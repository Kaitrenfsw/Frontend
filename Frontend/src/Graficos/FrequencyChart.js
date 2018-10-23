import React, { Component } from 'react'
import { AreaChart,Area,Brush,CartesianAxis,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import moment from  'moment'
import './FrequencyChart.css';
//import 'moment/locale/es'

class FrequencyChart extends Component{

    constructor(props) {
      super(props);
      this.state = {
      }
//      moment.locale('es')
    }

    componentDidMount(){

      var topicId=this.props.topicId;
      var date="2015-10-10"
      console.log("id:"+topicId);

      fetch("http://localhost:4000/api/visualizations/frequency_curve?topic_id="+topicId+"&date=" + date)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
           this.setState({chartData:res.data.weeks});
         });

       } else {
         console.log('bad request');
       }
     })
     .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message);

     });



      var semanas='{"weeks":[{"week": "29-04-2018","count": 26},{"week": "06-05-2018","count": 32},{"week": "13-05-2018","count": 21},{"week": "20-05-2018","count": 16},{"week": "27-05-2018","count": 8},{"week": "03-06-2018","count": 20},{"week": "10-06-2018","count": 32},{"week": "17-06-2018","count": 48},{"week": "24-06-2018","count": 56},{"week": "01-07-2018","count": 50},{"week": "08-07-2018","count": 39},{"week": "15-07-2018","count": 28},{"week": "22-07-2018","count": 19},{"week": "29-07-2018","count": 14},{"week": "05-08-2018","count": 11},{"week": "12-08-2018","count": 12},{"week": "19-08-2018","count": 13},{"week": "26-08-2018","count": 16},{"week": "02-09-2018","count": 20},{"week": "09-09-2018","count": 39},{"week": "16-09-2018","count": 19},{"week": "23-09-2018","count": 41},{"week": "30-09-2018","count": 32},{"week": "05-10-2018","count": 56}]}';
      var obj = JSON.parse(semanas).weeks;

      obj=this.state.chartData;

      console.log(obj);
      if (typeof obj==="undefined") {
        console.log("Data vacia!!");
      }
      else{

        for (var i = 0; i < obj.length; i++) {
          obj[i].date=moment(obj[i].week,'DD-MM-YYYY').valueOf()
        }

        this.setState({data: obj});

      }
    }

    render(){
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
                  type="natural"
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
            {/*
            <button onClick={this.changeData}  >
              Cambiar datos
            </button>
            */}
            </div>

    );
  }
}

export default FrequencyChart;
