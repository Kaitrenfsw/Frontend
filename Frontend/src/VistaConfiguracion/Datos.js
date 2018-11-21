import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from "react-router-dom";
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import config from '../config.js';



class Datos extends Component{

  state = {
    action: "",
    nombre: "",
    apellido: "",
    email: "",
    foto: "",
    telefono: "",
    activa: true,
    validate:false,
    NameError:true,
    SurnameError:true,
    EmailError:true,
    PhoneError:true
  }

  notify_success = (texto) => {
      toast.success(texto, {
        position: toast.POSITION.TOP_CENTER
      });
    }



  componentDidMount() {
           fetch("http://"+  config.base_url + ":" + config.port + "/api/profile", {
               method: 'GET',
               headers: {
                 'Content-Type': 'multipart/form-data',
                 'Accept': 'application/json',
                 'authorization': 'Bearer ' + this.props.user.token
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
                 const user = res.data.user;
                 this.setState({nombre:user.profile.name,
                   apellido:user.profile.last_name,
                   telefono:user.profile.phone,
                   email:user.email
                 })
               });

             } else {
             }
           })
           .catch(function(error) {
           });
    }








  HandleGuardarCambios(event){
    this.setState({validate:true});
    //console.log(this.state.EmailError);
    if (this.state.NameError) {console.log("Name error ");}
    else if (this.state.SurnameError) {console.log("surname error ");}
    else if (this.state.EmailError) {console.log("Mail error ");}
    else if (this.state.PhoneError){console.log("phone error ");}
    else {



      fetch('http://'+  config.base_url + ':' + config.port + '/api/profile', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.props.user.token
          },
          body: JSON.stringify({'profile' : {
            'name': this.state.nombre,
            'last_name': this.state.apellido,
            'phone': this.state.telefono
          }})
      })
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            this.notify_success('Datos guardados exitosamente');
          });

        } else {
        }
      })
      .catch(function(error) {
      });
  }
  }





  render(){
  
    return (
          <div className="Datos">

            <h3 id ="subtitulo-vista">Datos personales</h3>
            <div className="col-sm-7 col-sm-offset-2">
            </div>
            <div className="row row-no-padding">
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Nombre</label>

                    <Textbox
                      tabIndex="1" //Optional.[String or Number].Default: -1.
                      id={'nombre'} //Optional.[String].Default: "".  Input ID.
                      name="nombre" //Optional.[String].Default: "". Input name.
                      type="text" //Optional.[String].Default: "text". Input type [text, password, phone, number].
                      value={this.state.nombre} //Optional.[String].Default: "".
                      className="form-control"

                      validate={this.state.validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                      validationCallback={res => this.setState({ NameError: res, validate: false })}

                      onChange={(nombre, e) => {
                        this.setState({ nombre });
                      }} //Required.[Func].Default: () => {}. Will return the value.
                      onBlur={(e) => {console.log(e)}} //Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.



                      validationOption={{
                        name: 'Nombre', //Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                        check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                      }}
                    />

                </div>
                <div className="form-group">
                  <label>Apellidos</label>

                    <Textbox
                      tabIndex="1" //Optional.[String or Number].Default: -1.
                      id={'apellido'} //Optional.[String].Default: "".  Input ID.
                      name="apellido" //Optional.[String].Default: "". Input name.
                      type="text" //Optional.[String].Default: "text". Input type [text, password, phone, number].
                      value={this.state.apellido} //Optional.[String].Default: "".
                      className="form-control"

                      validate={this.state.validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                      validationCallback={res => this.setState({ SurnameError: res, validate: false })}

                      onChange={(apellido, e) => {
                        this.setState({ apellido });
                      }} //Required.[Func].Default: () => {}. Will return the value.
                      onBlur={(e) => {console.log(e)}} //Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.



                      validationOption={{
                        name: 'Apellidos', //Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                        check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                      }}
                    />

                </div>
              </div>
          </div>
           <div className="row no-margin">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>E-mail</label>
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
                </div>
                <div className="col-sm-4  col-sm-offset-1">
                <div className="form-group">
                  <label>Telefono</label>

                    <Textbox
                      tabIndex="1" //Optional.[String or Number].Default: -1.
                      id={'telefono'} //Optional.[String].Default: "".  Input ID.
                      name="telefono" //Optional.[String].Default: "". Input name.
                      type="text" //Optional.[String].Default: "text". Input type [text, password, phone, number].
                      value={this.state.telefono} //Optional.[String].Default: "".
                      className="form-control"

                      validate={this.state.validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                      validationCallback={res => this.setState({ PhoneError: res, validate: false })}

                      onChange={(telefono, e) => {
                        this.setState({ telefono });
                      }} //Required.[Func].Default: () => {}. Will return the value.
                      onBlur={(e) => {console.log(e)}} //Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.



                      validationOption={{
                        name: 'Telefono', //Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                        check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                        reg : /^(\+?56)?(\s?)(0?9)(\s?)[98765]\d{7}$/,
                        msgOnError: "Ingrese un numero valido (ex. +569 12345678)",
                      }}
                    />

                </div>
                </div>
            </div>
          <a onClick={this.HandleGuardarCambios.bind(this)}  className="gradient-button gradient-button-1 boton_guardar" >Guardar cambios</a>
          </div>
      );
    }
}

export default withRouter(Datos);
