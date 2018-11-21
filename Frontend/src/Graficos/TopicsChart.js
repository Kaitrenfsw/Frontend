import React, { Component } from 'react'
import { BarChart,Bar ,CartesianAxis,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts';
//import './TopicsChart.css';
import config from '../config.js';
//import 'moment/locale/es'

class TopicsChart extends Component{

    constructor(props) {
      super(props);
      this.state = {
        chartData: null,
        data:null,
        isLoading: false,
        data : [
            {name: 'Topic AdsdnjA', uv: 0, pv: 300, amt: 2400},
            {name: 'Topic B', uv: 0, pv: 245, amt: 2210},
            {name: 'Topic C', uv: 0, pv: 230, amt: 2290},
            {name: 'Topic D', uv: 0, pv: 220, amt: 2000},
            {name: 'Topic E', uv: 0, pv: 210, amt: 2181},
            {name: 'Topic F', uv: 0, pv: 200, amt: 2500},
            {name: 'Topic G', uv: 0, pv: 113, amt: 2100},
            {name: 'Topic E', uv: 0, pv: 80, amt: 2181},
            {name: 'Topic F', uv: 0, pv: 66, amt: 2500},
            {name: 'Topic G', uv: 0, pv: 20, amt: 2100},
      ]

      }
    }
    dataCero(data,key){
      for (var i = 0; i < data.length; i++) {
        if (data[i][key]!==0) return false;
      }

      return true
    }

    componentDidMount(){


      var topicId=7;
      var date="2015-09-01"
      fetch("http://"+ config.base_url + ":" + config.port + "/api/idms_sources", {
          method: 'GET',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'authorization': 'Bearer ' + this.props.user.token
          },
          body: null
      })
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {

           var obj = res.data.topics;
           console.log(obj);
           this.setState({data2: obj});
           this.setState({isLoading:false});
         });
       } else {
       }
     })
     .catch(error => {
     });
    }

    render(){

      if(this.state.isLoading){
        return(null);
      }/*
      else if (this.dataCero(this.state.data2, "uv")){
        return(<p>Sin topicos para mostrar</p>)
      }*/

      else{
      return (
                <div>
                <ResponsiveContainer width={700} height={400}>
                  <BarChart data={this.state.data2}>
                    <XAxis dataKey="topic_name" stroke="#fff"  textAnchor="start" tick={{ angle: 45, dy:5 }} height={100} interval={0}  />
                    <YAxis stroke="#fff" />
                    <Tooltip cursor={false}/>
                    <Bar dataKey="count" fill="#73DB9A" name="Suscripciones" />
                  </BarChart>
                </ResponsiveContainer>
                </div>

        );
      }
    }
}

export default TopicsChart;
