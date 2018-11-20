import React, { Component } from 'react'
import { toast } from 'react-toastify';
import {withRouter} from "react-router-dom";
import config from '../config.js';

class Contrasena extends Component{

  constructor(props){
      super(props);

      this.HandleGuardarCambios = this.HandleGuardarCambios.bind(this);

  }
  state = {
    old_password: "",
    new_password: "",
    new_password_confirmation: ""
  }
  notify_success = (texto) => { toast.success(texto, { position: toast.POSITION.TOP_CENTER }); }
  HandleGuardarCambios(event){
      fetch('http://'+  config.base_url + ':' + config.port + '/api/idms/password', {
          method: 'Put',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.props.user.token
          },
          body: JSON.stringify({
            'id': this.props.id,
            'password': this.state.new_password,
            'password_confirmation': this.state.new_password_confirmation
          })
      })
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            this.notify_success('Contraseña Reestablecida');
            this.props.history.push('/usuarios');
          });

        } else {
        }
      })
      .catch(function(error) {
      });
  }


  render(){
    return (
          <div className="Contrasena">
            <h3 id ="subtitulo-vista">Contraseña</h3>
            <form>
            <div className="form-group">
              <label>Contraseña nueva</label>
              <input onChange= {(event) => this.setState({new_password:event.target.value})} type="password" className="form-control" />
            </div>
            <div className="form-group">
              <label>Repetir contraseña</label>
              <input onChange= {(event) => this.setState({new_password_confirmation:event.target.value})} type="password" className="form-control" />
            </div>

            <a  onClick= {this.HandleGuardarCambios.bind(this)} className="gradient-button gradient-button-1 boton_guardar">Guardar cambios</a>
          </form>
          </div>
      );
    }
}

export default withRouter(Contrasena);
