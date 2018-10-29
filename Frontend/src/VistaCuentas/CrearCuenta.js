import React, { Component } from 'react'
import { toast } from 'react-toastify';

import { Textbox} from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import './CrearCuenta.css';
import config from '../config.js';


class CrearCuenta extends Component{
  state = {
    email:'',
    password:'',
    password_confirmation:'',
    showNotification: false,
    validate:false,
    EmailError:true,
    PasswordError:true,
    PasswordError2:true
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
    this.setState({validate:true});
    //console.log(this.state.EmailError);
    if (this.state.EmailError) {console.log("Mail error ");}
    else if (this.state.PasswordError){console.log("Pwd error ");}
    else if (this.state.PasswordError2){console.log("Pwd2 error ");}
    else {


    if(this.state.password && this.state.password_confirmation && this.state.email){
      if(this.state.password_confirmation === this.state.password ){
            var tipo_cuenta = 'idm';
            if(this.props.user.permissions[0].group==="admin"){tipo_cuenta = 'owner'
            fetch('http://'+config.base_url +':' + config.port + '/api/users', {
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
                  this.setState({email:'',
                  password:'',
                  password_confirmation:'',showNotification: true});
                  this.notify_success('Cuenta creada exitosamente');
                });

              } else {
                this.notify_success('Cuenta creada exitosamente');
              }
            })
            .catch(function(error) {
            });
          }
          if(this.props.user.permissions[0].group==="owner"){tipo_cuenta = 'idm'
          fetch('http://'+config.base_url +':' + config.port + '/api/idms', {
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
              })
          })
          .then((response) => {
            if(response.ok) {
              response.json().then(data => ({
                    data: data,
                    status: response.status
                })
              ).then(res => {
                this.setState({email:'',
                password:'',
                password_confirmation:'',showNotification: true});
                this.notify_success('Cuenta creada exitosamente');
              });

            } else {
            }
          })
          .catch(function(error) {
          });
        }
      }
      else{
        this.notify_error('Las contraseñas no coinciden');
      }
    }
    else {
        this.notify_error('No pueden haber datos vacios');
    }
  }
}



  render(){

    return (
          <div  className="CrearCuenta">
            <form >
            <div className="form-group">
              <label id = "label-email">E-mail</label>
                <Textbox
                  tabIndex="1" //Optional.[String or Number].Default: -1.
                  id={'email'} //Optional.[String].Default: "".  Input ID.
                  name="email" //Optional.[String].Default: "". Input name.
                  type="text" //Optional.[String].Default: "text". Input type [text, password, phone, number].
                  value={this.state.email} //Optional.[String].Default: "".
                  className="form-control"

                  validate={this.state.validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                  validationCallback={res => this.setState({ EmailError: res, validate: false })}

                  onChange={(email, e) => {
                    this.setState({ email });
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
                    min: 8,
                    max: 20,
                    msgOnError: "La contraseña debe tener entre 8 y 20 caracteres",
                  }}
                />

            </div>
            <div className="form-group">
              <label>Repetir contraseña</label>

                <Textbox
                  tabIndex="2" //Optional.[String or Number].Default: -1.
                  id={'contraseña'} //Optional.[String].Default: "".  Input ID.
                  name="password_confirmation" //Optional.[String].Default: "". Input name.
                  type="password" //Optional.[String].Default: "text". Input type [text, password, phone, number].
                  value={this.state.password_confirmation} //Optional.[String].Default: "".
                  className="form-control"

                  validate={this.state.validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                  validationCallback={res => this.setState({ PasswordError2: res, validate: false })}

                  onChange={(password_confirmation, e) => {
                    this.setState({ password_confirmation });
                  }} //Required.[Func].Default: () => {}. Will return the value.
                  onBlur={(e) => {console.log(e)}} //Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.



                  validationOption={{
                    name: 'Password', //Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                    check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                    required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                    min: 8,
                    max: 20,
                    customFunc: res => { //Optional.[Func].Default: none. Custom function. Returns true or err message
                       if (res !== this.state.password) {
                         return 'Las contraseñas no coinciden';
                       }
                       return true;
                     }
                  }}
                />



            </div>
            <a  onClick={this.handleSubmit.bind(this)} className="gradient-button gradient-button-1 boton_crear">Crear</a>
          </form>
          </div>
      );
    }
}

export default CrearCuenta;
