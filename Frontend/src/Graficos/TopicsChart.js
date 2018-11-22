import React, { Component } from 'react'
import { BarChart,Bar ,CartesianAxis,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import EmptyBox from '../Assets/EmptyBox.png'
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
    dataCero(datos,key){
      for (var i = 0; i < datos.length; i++) {
        if (datos[i][key]!==0) return false;
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
      }
      else if ( typeof this.state.data2 !=="undefined" && this.dataCero(this.state.data2, "user_amount")){
          return(
            <div className="MensajeSinTemas">
              <img id = "EmptyBox" src={EmptyBox} alt="EmptyBox" />
              <p> Tus usuarios secundarios no se han suscrito a ningun tema todavía</p>
            </div>);

      }
      else{
      return (
                <div>
                  <h4 className="subtitulo-vista">Cantidad de suscriptores por tema</h4>
                <ResponsiveContainer width={700} height={480}>
                  <BarChart data={this.state.data2}>
                    <XAxis dataKey="topic_name" stroke="#fff"  textAnchor="start" tick={{ angle: 45, dy:5 }} height={180} interval={0}  />
                    <YAxis stroke="#fff" />
                    <Tooltip cursor={false}/>
                    <Bar dataKey="user_amount" fill="#73DB9A" name="Usuarios suscritos" />
                  </BarChart>
                </ResponsiveContainer>
                </div>

        );
      }
    }
}

export default TopicsChart;