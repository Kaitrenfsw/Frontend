import React, { Component } from 'react'




class Contrasena extends Component{
  state = {
    old_password: "",
    new_password: "",
    new_password_confirmation: ""
  }
  HandleGuardarCambios(event){
    if(this.props.adm_cuenta){
      let formData = new FormData();
      formData.append('id', this.props.user.id);
      formData.append('new_password', this.state.new_password);
      formData.append('new_password_confirmation', this.state.new_password_confirmation);
      fetch('http://localhost:4000/api/users', {
          method: 'Post',
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
    else{

      let formData = new FormData();
      formData.append('id', this.props.user.id);
      formData.append('old_password', this.state.old_password);
      formData.append('new_password', this.state.new_password);
      formData.append('new_password_confirmation', this.state.new_password_confirmation);
      fetch('http://localhost:4000/api/users', {
          method: 'Post',
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

  }


  render(){
    var adm_cuenta = this.props.adm_cuenta;
    return (
          <div className="Contrasena">
            <h3 id ="subtitulo-vista">Contraseña</h3>
            <form>
            {adm_cuenta === false &&
            <div className="form-group">
              <label>Contraseña actual</label>
              <input onChange= {(event) => this.setState({old_password:event.target.value})} type="password" className="form-control" />
            </div>}
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

export default Contrasena;
