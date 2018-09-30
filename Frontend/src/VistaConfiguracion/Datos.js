import React, { Component } from 'react'
import Modal from '../Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from "react-router-dom";
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';



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
        if(this.props.adm_cuenta){
          fetch("http://localhost:4000/api/users/" + this.props.id, {
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
                console.log(res.data,res.status)
                const user = res.data.user;
                this.setState({nombre:user.profile.name,
                  apellido:user.profile.last_name,
                  telefono:user.profile.phone,
                  email:user.email,
                  activa:user.active
                })
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
           fetch("http://localhost:4000/api/profile", {
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
                 console.log(res.data,res.status)
                 const user = res.data.user;
                 this.setState({nombre:user.profile.name,
                   apellido:user.profile.last_name,
                   telefono:user.profile.phone,
                   email:user.email
                 })
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






  HandleModalConfirm(event,action) {
    if(action==="eliminar"){
      fetch('http://localhost:4000/api/users', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.props.user.token
          },
          body: JSON.stringify({
            'id': this.props.id,
          })
      })
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            console.log(res.data,res.status)
            this.notify_success('Cuenta eliminada exitosamente');
            this.props.history.push('/configuracion');
          });

        } else {
          console.log('bad request');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
    }
    if(action==="bloquear"){
      fetch('http://localhost:4000/api/account/activate', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.props.user.token
          },
          body: JSON.stringify({'user':{
            'id': this.props.id,
            'active': !(this.state.activa)
          }})
      })
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            console.log(res.data,res.status)
            var texto_bloquear = "Cuenta Bloqueada exitosamente";
            if(this.state.activa===false){texto_bloquear = "Cuenta Desbloqueada exitosamente"}
            this.notify_success(texto_bloquear);
            this.setState({activa:!(this.state.activa)});
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

  HandleGuardarCambios(event){
    this.setState({validate:true});
    //console.log(this.state.EmailError);
    if (this.state.NameError) {console.log("Name error ");}
    else if (this.state.SurnameError) {console.log("surname error ");}
    else if (this.state.EmailError) {console.log("Mail error ");}
    else if (this.state.PhoneError){console.log("phone error ");}
    else {


    if(this.props.adm_cuenta){
      fetch('http://localhost:4000/api/users', {
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
          },'id':this.props.id})
      })
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            console.log(res.data,res.status);
            this.notify_success('Datos guardados exitosamente');
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
      fetch('http://localhost:4000/api/profile', {
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
            console.log(res.data,res.status);
            this.notify_success('Datos guardados exitosamente');
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
  }





  render(){
    var user_type = this.props.user.permissions[0].group;
    var adm_cuenta = this.props.adm_cuenta;
    var bloquear = "Bloquear";
    if(this.state.activa===false) {bloquear="Desbloquear"}
    return (
          <div className="Datos">

            <h3 id ="subtitulo-vista">Datos personales</h3>
            <div className="col-sm-7 col-sm-offset-2">
            {(user_type === 'owner' || user_type === 'admin'  ) && adm_cuenta && <a    data-toggle="modal" data-target="#ModalEliminar"  className="gradient-button gradient-button-3 boton_eliminar">Eliminar</a>}
            {(user_type === 'admin'  )  && adm_cuenta && <a   data-toggle="modal" data-target="#ModalBloquear" className="gradient-button gradient-button-3 boton_bloquear">{bloquear}</a>}
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
                        console.log(e);
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
                        console.log(e);
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
                        console.log(e);
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
                        console.log(e);
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
          <Modal action = {"eliminar"} modal_content = {"¿Estás seguro que deseas continuar?"} modal_id = {"ModalEliminar"} HandleModalConfirm= {this.HandleModalConfirm.bind(this)} />
          <Modal action = {"bloquear"} modal_content = {"¿Estás seguro que deseas continuar?"} modal_id = {"ModalBloquear"} HandleModalConfirm= {this.HandleModalConfirm.bind(this)} />
          </div>
      );
    }
}

export default withRouter(Datos);
