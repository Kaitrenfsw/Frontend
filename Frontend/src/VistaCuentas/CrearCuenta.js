import React, { Component } from 'react'




class CrearCuenta extends Component{
  state = {
    email:'',
    password:'',
    password_confirmation:'',
  }




  handleSubmit(event) {
    var tipo_cuenta = 'idm';
    if(this.props.user.permissions[0].group==="admin"){tipo_cuenta = 'owner'}
    let formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('password_confirmation', this.state.password_confirmation);
    formData.append('group', tipo_cuenta);
    fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjIiLCJleHAiOjE1Mzc1ODE0NjgsImlhdCI6MTUzNzMyMjI2OCwiaXNzIjoibnVyc29mdC5hdXRoIiwianRpIjoiZmI1MjM3ZWYtMTRlMS00ODljLThiM2YtMTMyMDNlZjNhYWU2IiwicGVtIjp7fSwic3ViIjoiVXNlcjoyIiwidHlwIjoiYWNjZXNzIn0.h7dAs9a9cspHzCZagwKyGzrtSzh6Qr6hyza7Xks9mriCTVLH7R64D6tyx9uVs2zTvGHzmDL7zu6TIifLBjX90g'
        },
        body: formData
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





  render(){

    return (
          <div  className="CrearCuenta">
            <form >
            <div className="form-group">
              <label id = "label-email">E-mail</label>
              <input onChange= {(event) => this.setState({email:event.target.value})} name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input onChange= {(event) => this.setState({password:event.target.value})} name="password" type="password" className="form-control" />
            </div>
            <div className="form-group">
              <label>Repetir contraseña</label>
              <input onChange= {(event) => this.setState({password_confirmation:event.target.value})} name="password_confirmation" type="password" className="form-control" />
            </div>
            <a  onClick={this.handleSubmit.bind(this)} className="gradient-button gradient-button-1 boton_crear">Crear</a>
          </form>
          </div>
      );
    }
}

export default CrearCuenta;
