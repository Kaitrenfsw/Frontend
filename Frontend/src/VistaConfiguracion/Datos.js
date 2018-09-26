import React, { Component } from 'react'
import Modal from '../Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from "react-router-dom";



class Datos extends Component{

  state = {
    action: "",
    nombre: "",
    apellido: "",
    email: "",
    foto: "",
    telefono: "",
    activa: true,
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
            this.notify_success('Cuenta Bloqueada exitosamente');
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
  }

  HandleGuardarCambios(event){
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
                  <input value = {this.state.nombre} onChange= {(event) => this.setState({nombre:event.target.value})}  className="form-control" />
                </div>
                <div className="form-group">
                  <label>Apellidos</label>
                  <input value = {this.state.apellido} onChange= {(event) => this.setState({apellido:event.target.value})}  className="form-control" />
                </div>
              </div>
          </div>
           <div className="row no-margin">
              <div className="col-sm-4">
                <div className="form-group">
                  <label>E-mail</label>
                  <input value = {this.state.email} onChange= {(event) => this.setState({email:event.target.value})}  type = "email" className="form-control" />
                </div>
                </div>
                <div className="col-sm-4  col-sm-offset-1">
                <div className="form-group">
                  <label>Telefono</label>
                  <input  value = {this.state.telefono} onChange= {(event) => this.setState({telefono:event.target.value})}  className="form-control" type="tel" />
                </div>
                </div>
            </div>
          <a onClick={this.HandleGuardarCambios.bind(this)}  className="gradient-button gradient-button-1 boton_guardar" >Guardar cambios</a>
          <Modal action = {"eliminar"} modal_content = {"¿Estas seguro que deseas continuar?"} modal_id = {"ModalEliminar"} HandleModalConfirm= {this.HandleModalConfirm.bind(this)} />
          <Modal action = {"bloquear"} modal_content = {"¿Estas seguro que deseas continuar?"} modal_id = {"ModalBloquear"} HandleModalConfirm= {this.HandleModalConfirm.bind(this)} />
          </div>
      );
    }
}

export default withRouter(Datos);
