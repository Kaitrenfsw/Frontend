import React, { Component } from 'react'
import { toast } from 'react-toastify';



class CrearCuenta extends Component{
  state = {
    email:'',
    password:'',
    password_confirmation:'',
    showNotification: false
  }

  notify_success = (texto) => {

      toast.success(texto, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  notify_error = (texto) => {
        toast.error(texto, {
          position: toast.POSITION.TOP_CENTER
        });
      }




  handleSubmit(event) {
    if(this.state.password && this.state.password_confirmation && this.state.email){
      if(this.state.password_confirmation === this.state.password ){
            var tipo_cuenta = 'idm';
            if(this.props.user.permissions[0].group==="admin"){tipo_cuenta = 'owner'}
            console.log(this.props.user.token,tipo_cuenta);
            fetch('http://localhost:4000/api/users', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'authorization': 'Bearer ' + this.props.user.token
                },
                body: JSON.stringify({
                  'email': this.state.email,
                  'password': this.state.password,
                  'password_confirmation': this.state.password_confirmation,
                  'group': tipo_cuenta
                })
            })
            .then((response) => {
              if(response.ok) {
                response.json().then(data => ({
                      data: data,
                      status: response.status
                  })
                ).then(res => {
                  console.log(res.data,res.status);
                  this.setState({email:'',
                  password:'',
                  password_confirmation:'',showNotification: true});
                  this.notify_success('Cuenta creada exitosamente');
                });

              } else {
                console.log('bad request');
              }
            })
            .catch(function(error) {
              console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
      }
      else{
        this.notify_error('Las contraseñas no coinciden');
      }
    }
    else {
        this.notify_error('No pueden haber datos vacios');
    }
  }





  render(){

    return (
          <div  className="CrearCuenta">
            <form >
            <div className="form-group">
              <label id = "label-email">E-mail</label>
              <input value = {this.state.email} onChange= {(event) => this.setState({email:event.target.value})} name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input  value = {this.state.password} onChange= {(event) => this.setState({password:event.target.value})} name="password" type="password" className="form-control" />
            </div>
            <div className="form-group">
              <label>Repetir contraseña</label>
              <input value = {this.state.password_confirmation} onChange= {(event) => this.setState({password_confirmation:event.target.value})} name="password_confirmation" type="password" className="form-control" />
            </div>
            <a  onClick={this.handleSubmit.bind(this)} className="gradient-button gradient-button-1 boton_crear">Crear</a>
          </form>
          </div>
      );
    }
}

export default CrearCuenta;
