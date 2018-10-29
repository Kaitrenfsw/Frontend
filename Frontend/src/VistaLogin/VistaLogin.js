import React, { Component } from 'react'
import logo from '../Assets/kom2.svg';
import lineas from '../Assets/linea.png';
import config from '../config.js';
import { toast } from 'react-toastify';
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import './VistaLogin.css';

class VistaLogin extends Component{


  constructor(props){
    super(props);
    this.state={
    username:'',
    password:'',
    validate:false,
    EmailError:true,
    PasswordError:true
    }
  }


  notify_error = (texto) => {
        toast.error(texto, {
          position: toast.POSITION.TOP_CENTER
        });
  }

  handleKeyPress(event){
    if(event.key === 'Enter'){
      this.handleClick(event);
    }
  }

   handleClick(event){
    this.setState({validate:true});
    //console.log(this.state.EmailError);
    if (this.state.EmailError) {console.log("Mail error ");}
    else if (this.state.PasswordError){console.log("Pwd error ");}
    else {
      fetch("http://" + config.base_url + ":" + config.port + "/api/login", { /*http://10.6.42.104:4000/api/user_content*/
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
          this.props.HandleUserLogIn(res.data.user);
        });
      } else {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
          if(res.data.errors.detail==="Cuenta bloqueada"){
            this.notify_error("Cuenta bloqueada")}
          else{
            this.notify_error("Email o contraseña incorrecta")
          }
        });
      }
    })
    .catch(error => {
    });
    }
   }



  render(){
    return (
      <div className="ContenidoVistaLogin">
        <div className="row row-no-padding">
           <div className ="max-width">
           	<img id = "logo" src={logo} alt="logo" />
            <h4 id="texto-inica-sesion">Para continuar, inicia sesión</h4>
            <div className="form-group">
              <label>E-mail</label>

                <Textbox
                  tabIndex="1" //Optional.[String or Number].Default: -1.
                  id={'email'} //Optional.[String].Default: "".  Input ID.
                  name="email" //Optional.[String].Default: "". Input name.
                  type="text" //Optional.[String].Default: "text". Input type [text, password, phone, number].
                  value={this.state.username} //Optional.[String].Default: "".
                  onKeyPress={this.handleKeyPress.bind(this)}
                  className="form-control"
                  validate={this.state.validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                  validationCallback={res => this.setState({ EmailError: res, validate: false })}

                  onChange={(username, e) => {
                    this.setState({ username });
                  }} //Required.[Func].Default: () => {}. Will return the value.
                  onBlur={(e) => {console.log(e)}} //Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.



                  validationOption={{
                    name: 'Email', //Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                    check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                    required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                    reg : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    msgOnError: "Ingrese un Email válido",
                  }}
                />

          </div>
            <div className="form-group">
              <label>Contraseña</label>

                <Textbox
                  tabIndex="2" //Optional.[String or Number].Default: -1.
                  id={'contraseña'} //Optional.[String].Default: "".  Input ID.
                  name="password" //Optional.[String].Default: "". Input name.
                  type="password" //Optional.[String].Default: "text". Input type [text, password, phone, number].
                  value={this.state.password} //Optional.[String].Default: "".
                  onKeyPress={this.handleKeyPress.bind(this)}
                  className="form-control"

                  validate={this.state.validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                  validationCallback={res => this.setState({ PasswordError: res, validate: false })}

                  onChange={(password, e) => {
                    this.setState({ password });
                  }} //Required.[Func].Default: () => {}. Will return the value.
                  onBlur={(e) => {console.log(e)}} //Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.



                  validationOption={{
                    name: 'Password', //Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                    check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                    required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                    msgOnError: "La contraseña no puede estar vacía",
                  }}
                />



            </div>
            <a      id = "log-button" className="gradient-button gradient-button-1" onClick={this.handleClick.bind(this)}  >Ingresar</a>
          </div>
        </div>
        <img alt = "grafico linea" id ="lineas" src={lineas}/>
     </div>
    );
  }
}

export default VistaLogin;
