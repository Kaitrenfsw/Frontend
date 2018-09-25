import React, { Component } from 'react'
import Modal from '../Modal';



class Entrenamiento extends Component{


  HandleModalConfirm(event,action) {
    if(action==="entrenar"){
      fetch('http://localhost:4000/api/processing/model', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjIiLCJleHAiOjE1Mzc1ODE0NjgsImlhdCI6MTUzNzMyMjI2OCwiaXNzIjoibnVyc29mdC5hdXRoIiwianRpIjoiZmI1MjM3ZWYtMTRlMS00ODljLThiM2YtMTMyMDNlZjNhYWU2IiwicGVtIjp7fSwic3ViIjoiVXNlcjoyIiwidHlwIjoiYWNjZXNzIn0.h7dAs9a9cspHzCZagwKyGzrtSzh6Qr6hyza7Xks9mriCTVLH7R64D6tyx9uVs2zTvGHzmDL7zu6TIifLBjX90g'
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
            console.log(res.data,res.status)
          });

        } else {
          console.log('bad request');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
    }
  }




  render(){
    return (
          <div className="Entrenamiento">
          <h3 id ="subtitulo-vista">Entrenamiento</h3>
          <div className="div-wrap-entrenamiento col-sm-8">
          <h4 className = "texto-entrenamiento">¡ADVERTENCIA!, El realizar un nuevo entrenamiento del modelo clasificador impactará al componente clasificador de noticias, pudiendo afectar el periodo de actualización de nuevas recomendaciones dentro de Kompaz.</h4>

          <a   data-toggle="modal" data-target="#ModalEntrenar"  className="gradient-button gradient-button-1 boton_entrenar" >Entrenar</a>
          </div>
          <Modal action = {"entrenar"} modal_content = {"¿Estas seguro que deseas continuar?"} modal_id = {"ModalEntrenar"} HandleModalConfirm= {this.HandleModalConfirm.bind(this)} />
          </div>
      );
    }
}

export default Entrenamiento;
