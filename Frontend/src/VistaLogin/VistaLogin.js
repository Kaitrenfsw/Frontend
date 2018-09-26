import React, { Component } from 'react'
import logo from '../Assets/kom2.svg';
import lineas from '../Assets/linea.png';
import './VistaLogin.css';
import { toast } from 'react-toastify';

class VistaLogin extends Component{


  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
  }
  notify_error = (texto) => {
        toast.error(texto, {
          position: toast.POSITION.TOP_CENTER
        });
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.handleClick(event)
    }
  }

   handleClick(event){

     fetch("http://localhost:4000/api/login", { /*http://10.6.42.104:4000/api/user_content*/
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": this.state.username,
        "password": this.state.password
      })
    })
    .then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {

          localStorage.setItem('user', JSON.stringify(res.data.user));
          console.log(res.data.user);
          this.props.HandleUser(res.data.user);
          this.props.HandleNavBar(event,'LOGGED');
        });

      } else {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
          if(res.data.errors.detail=="Cuenta bloqueada"){
            this.notify_error("Cuenta bloqueada")}
          else{
            this.notify_error("Email o contraseña incorrecta")
          }
          console.log(res.data,res.status);

        });

        console.log('bad request');
      }
    })
    .catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
   }
  render(){
    return (
      <div className="ContenidoVistaLogin">
        <div className="row row-no-padding">
          <div className="col-xs-4 col-xs-offset-4">
           <div className ="max-width">
           	<img id = "logo" src={logo} alt="logo" />
            <h4 id="texto-inica-sesion">Para continuar, inicia sesión</h4>
            <div className="form-group">
              <label>E-mail</label>
              <input name="email" onKeyPress={this.handleKeyPress.bind(this)} onChange = {(event) => this.setState({username:event.target.value})} id = "email" type = "email" className="form-control" />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input name="password" onKeyPress={this.handleKeyPress.bind(this)} onChange = {(event) => this.setState({password:event.target.value})} id= "contraseña" type = "password" className="form-control" />
            </div>
            <label className="container1"><h5 id = "recordarme"> Recordame</h5>
            <input type="checkbox" />
            <span className="checkmark"></span>
            </label>
            <h5 id = "olvidaste">¿Olvidaste tu contraseña?</h5>
            <a   id = "log-button" className="gradient-button gradient-button-1" onClick={this.handleClick.bind(this)} /*onClick={(event) => this.props.HandleNavBar(event,'LOGGED')}*/ >Ingresar</a>
          </div>
          </div>
        </div>
        <img alt = "grafico linea" id ="lineas" src={lineas}/>
     </div>
    );
  }
}

export default VistaLogin;
