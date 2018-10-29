import React, { Component } from 'react'
import Modal from '../Modal';
import { toast } from 'react-toastify';
import config from '../config.js';


class Entrenamiento extends Component{

  state = {isTraining:false}

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
          <h3 id ="subtitulo-vista">Entrenamiento</h3>
          <div className="div-wrap-entrenamiento col-sm-8">
          <h4 className = "texto-entrenamiento">¡ADVERTENCIA!, El realizar un nuevo entrenamiento del modelo clasificador impactará al componente clasificador de noticias, pudiendo afectar el periodo de actualización de nuevas recomendaciones dentro de Kompaz.</h4>

          {!(this.state.isTraining) && <a   data-toggle="modal" data-target="#ModalEntrenar"  className="gradient-button gradient-button-1 boton_entrenar" >Entrenar</a>}

          {this.state.isTraining && <a    className="gradient-button gradient-button-4 boton_entrenar disabled" >Entrenando...</a>  }
          </div>
          <Modal action = {"entrenar"} modal_content = {"¿Estás seguro que deseas continuar?"} modal_id = {"ModalEntrenar"} HandleModalConfirm= {this.HandleModalConfirm.bind(this)} />
          </div>
      );
    }
}

export default Entrenamiento;
