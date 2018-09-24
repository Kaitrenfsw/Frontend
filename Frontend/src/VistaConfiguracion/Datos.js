import React, { Component } from 'react'
import profile from '../Assets/profile.png';
import Modal from '../Modal';



class Datos extends Component{

  state = {
    action: "",
    nombre: "",
    apellido: "",
    email: "",
    foto: "",
    telefono: ""
  }



  componentDidMount() {
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
               this.setState({nombre:res.data.profile.name,
                 apellido:res.data.profile.last_name,
                 telefono:res.data.profile.phone
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






  HandleModalConfirm(event,action) {
    if(action==="eliminar"){
      let formData = new FormData();
      formData.append('id', this.props.id);
      fetch('http://localhost:4000/api/users', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'authorization': 'Bearer ' + this.props.user.token
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
    if(action==="bloquear"){
      let formData = new FormData();
      formData.append('id', this.props.id);
      formData.append('active', false);
      fetch('localhost:4001/api/account/activate', {
          method: 'Post',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'authorization': 'Bearer ' + this.props.user.token
          },
          body: formData
      })
    }
  }

  HandleGuardarCambios(event){
    let formData = new FormData();
    formData.append('id', this.props.user.id);
    formData.append('name', this.state.nombre);
    formData.append('last_name', this.state.apellido);
    formData.append('phone', this.state.telefono);
    fetch('http://localhost:4000/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + this.props.user.token
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
    var user_type = this.props.user.permissions[0].group;
    var adm_cuenta = this.props.adm_cuenta;

    return (
          <div className="Datos">

            <h3 id ="subtitulo-vista">Datos personales</h3>
            <div className="col-sm-7 col-sm-offset-2">
            {(user_type === 'owner' || user_type === 'admin'  ) && adm_cuenta && <a    data-toggle="modal" data-target="#ModalEliminar"  className="gradient-button gradient-button-3 boton_eliminar">Eliminar</a>}
            {(user_type === 'admin'  )  && adm_cuenta && <a   data-toggle="modal" data-target="#ModalBloquear" className="gradient-button gradient-button-3 boton_bloquear">Bloquear</a>}
            </div>
            <div className="row row-no-padding">
              <div className="col-sm-3 col-imagen-perfil">
                <label>Foto Perfil</label>
                <br/>
                <img id = "imagen-profile" src={profile}  alt="foto-perfil" />
                <br/>
                <br/>
                <a id="subir-foto">Subir foto</a>
              </div>
              <div className="col-sm-6">
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

export default Datos;
