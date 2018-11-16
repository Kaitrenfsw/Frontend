import React, { Component } from 'react'
import TopicsChart from '../Graficos/TopicsChart.js';
import { toast } from 'react-toastify';
import config from '../config.js';

class Estadisticas extends Component{

  state = {isTraining:false
            }

  notify_success = (texto) => {

      toast.success(texto, {
        position: toast.POSITION.TOP_CENTER
      });
    }

  componentDidMount(){
    fetch('http://'+ config.base_url + ':4000/trainingStatus/')
    .then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
          this.setState({isTraining:res.data.is_training});
        });

      } else {
      }
    })
    .catch(function(error) {
    });

  }


  HandleModalConfirm(event,action) {
    if(action==="entrenar"){
      fetch('http://'+config.base_url +':' + config.port + '/api/processing/model', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: null
      })
      this.notify_success('Ha comenzado el entrenamiento');
      this.setState({isTraining:true});
    }
  }




  render(){
    return (
          <div className="Entrenamiento">
          <h3 id ="subtitulo-vista">Estadísticas</h3>
          <div className="topics-chart-container">

          <TopicsChart/>

          </div>
          </div>
      );
    }
}

export default Estadisticas;
