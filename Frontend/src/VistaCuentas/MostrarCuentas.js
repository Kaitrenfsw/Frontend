import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import {withRouter} from "react-router-dom";
import config from '../config.js';
class MostrarCuentas extends Component{
  state = {
      cuentas: [{"id":1,"profile": {"name":"Michael","last_name":"Jackson", "phone": "+98762517" }, "active":1,"email":"MJ@cl","permissions": [  {  "group": "owner" } ]},{"id":2,"profile": {"name":"Michael","last_name":"Jackson", "phone": "+98762517" }, "active":1,"email":"MJ@cl","permissions": [  {  "group": "idm" } ]}],
      isLoading: true
  };

  componentDidUpdate(prevProps,prevState){
    if (prevProps.orden !== this.props.orden) {
        this.OrdenarCuentas(this.props.orden);
      }
    if(prevState.isLoading !== this.state.isLoading){
          this.OrdenarCuentas(this.props.orden);
    }
  }
  notify_success = (texto) => { toast.success(texto, { position: toast.POSITION.TOP_CENTER }); }

  fetchIdms(){
    fetch('http://' +config.base_url +':' + config.port + '/api/idms', { /*http://10.6.42.104:4000/api/user_content*/
     method: "get",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
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
          this.setState({cuentas:res.data.users, isLoading:false});

        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }
  fetchOwners(){
    fetch('http://'+config.base_url +':' + config.port + '/api/users', { /*http://10.6.42.104:4000/api/user_content*/
     method: "get",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
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
          this.setState({cuentas:res.data.users, isLoading:false});

        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }



    HandleModalConfirm(event,action) {
      fetch('http://'+config.base_url +':' + config.port + '/api/idms', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.props.user.token
          },
          body: JSON.stringify({
            'id': action,
          })
      })
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            this.notify_success('Cuenta eliminada exitosamente');
            this.props.history.push('/configuracion');
          });

        } else {
        }
      })
      .catch(function(error) {
      });

    }








  componentDidMount() {
      if(this.props.user.permissions[0].group === 'admin'){
        this.fetchOwners();

      }

      if(this.props.user.permissions[0].group === 'owner'){
        this.fetchIdms();
      }
  }



  DesplegarCuentasDDS(cuenta,search){
    var ClaseEstado = "";
    var TextoEstado = "";
    if(cuenta.active ===true){ClaseEstado = "estado-f";TextoEstado = "Activa";}
    if(cuenta.active ===false) {ClaseEstado = "estado-md";TextoEstado = "Bloqueada";}
    if (cuenta.permissions[0].group==="owner" && String(cuenta.profile.name + " " + cuenta.profile.last_name + " " + cuenta.email).toLowerCase().includes(this.props.search.toString().toLowerCase())) {
      return (
            <div key = {cuenta.id } className="row cuenta no-margin" >
              <div className="col-md-12 no-padding"  /*onClick={ (event) => this.props.HandleDetalleTopico(event,'SI',topico)}*/ >
                <div className= {"div-estado " + ClaseEstado}>
                  <p className = "titulo-estado">Estado</p>
                  <h5 className={ClaseEstado}>{TextoEstado}</h5>
                </div>
                <div className="div-datos"  /*onClick={ (event) => this.props.HandleDetalleTopico(event,'SI',topico)}*/ >
                  <h4 className="nombre-cuenta">{cuenta.profile.name} {cuenta.profile.last_name}</h4>
                  <h5 className="email-cuenta">{cuenta.email}</h5>
                  <NavLink   className="gradient-button gradient-button-3" to={{ pathname: '/cuentas/'+cuenta.id, cuenta: cuenta}} >Ver</NavLink>
                </div>
              </div>
            </div>

        )
    }
  }

DesplegarCuentasIDM(cuenta,search){
    if (cuenta.permissions[0].group==="idm" && String(cuenta.profile.name + " " + cuenta.profile.last_name + " " + cuenta.email).toLowerCase().includes(this.props.search.toString().toLowerCase())) {
      return (
        <div key = {cuenta.id } className="row row-cuenta-idm no-margin" >
          <div className="col-xs-12 no-padding"  /*onClick={ (event) => this.props.HandleDetalleTopico(event,'SI',topico)}*/ >
            <div className="div-cuenta-idm  ">
              <div className="div-datos-idm">
                <h5 className="email-idm">{cuenta.email}</h5>
                <h4 className="nombre-idm">{cuenta.profile.name} {cuenta.profile.last_name}</h4>
              </div>
              <a   data-toggle="modal" data-target={"#ModalEliminar" +cuenta.id} className="gradient-button gradient-button-3 eliminar_button"  >Eliminar</a>
              <NavLink   className="gradient-button gradient-button-3 ver_button" to={{ pathname: '/cuentas/'+cuenta.id, cuenta: cuenta}} >Ver</NavLink>
                <Modal action = {cuenta.id} modal_content = {"¿Estás seguro que deseas continuar?"} modal_id = {"ModalEliminar" +cuenta.id} HandleModalConfirm= {this.HandleModalConfirm.bind(this)} />
            </div>
          </div>
        </div>
        )
    }
  }




  OrdenarCuentas(orden) {
    var cuentas_ordenadas;
    if(orden ==='Nombre'){
        cuentas_ordenadas = this.state.cuentas.sort(this.OrdenarNombre);
        this.setState({cuentas: cuentas_ordenadas});
    }
    if(orden ==='Email'){
        cuentas_ordenadas = this.state.cuentas.sort(this.OrdenarEmail);
        this.setState({cuentas: cuentas_ordenadas});
    }
  }


  OrdenarNombre(a,b) {
    if(a.profile.name && !(b.profile.name)){
      return -1;
    }
    if(!(a.profile.name) && b.profile.name){
      return 1;
    }
    if(a.profile.name && b.profile.name){
      return 0;
    }
    if(a.profile.name && b.profile.name){
      var nameA=a.profile.name.toLowerCase();
      var nameB=b.profile.name.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    }
    return 1;
  }

  OrdenarEmail(a,b) {
    if(!a.email){
      return -1;
    }
    if(!b.email){
      return 1;
    }
    if(a.email && b.email){
      var nameA=a.email.toLowerCase();
      var nameB=b.email.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    }
    return 1;
  }








  render(){
    var tipo_cuentas = this.props.tipo_cuentas;
    var search = this.props.search;
    if(tipo_cuentas === "idm" && !(this.state.isLoading)){
      return (
        <div className="lista-cuentas">
        {this.state.cuentas.map((cuenta,i,arr) => (
         this.DesplegarCuentasIDM(cuenta,search)
          ))}
        </div>
      );

    }

    else if(!(this.state.isLoading)) {
      return (
        <div className ="lista-cuentas">
           {this.state.cuentas.map((cuenta,i,arr) => (
            this.DesplegarCuentasDDS(cuenta,search)
          ))}

        </div>
      );

    }
    else {return(null)}
  }
}

export default withRouter(MostrarCuentas);
