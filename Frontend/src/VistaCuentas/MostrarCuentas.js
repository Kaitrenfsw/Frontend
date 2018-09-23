import React, { Component } from 'react'
import profile from '../Assets/profile.png';
import { NavLink } from 'react-router-dom';

class MostrarCuentas extends Component{
  state = {
      cuentas: [{"id":1,"nombre":"Michael","apellido":"Jackson","Bloqueada":1,"email":"MJ@cl", "telefono":"+98762517","user_type":"idm"},{"id":2,"nombre":"Elvis","apellido":"Presley","Bloqueada":0,"email":"EP@cl", "telefono":"+98762517","user_type":"owner"},{"id":3,"nombre":"John","apellido":"Lenon","Bloqueada":1,"email":"JL@cl", "telefono":"+98762517","user_type":"idm"},{"id":3,"nombre":"John","apellido":"Lenon","Bloqueada":1,"email":"JL@cl", "telefono":"+98762517","user_type":"owner"}]

  };




  componentDidMount() {
      fetch('http://localhost:4000/api/users', { /*http://10.6.42.104:4000/api/user_content*/
       method: "get",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjIiLCJleHAiOjE1Mzc1ODE0NjgsImlhdCI6MTUzNzMyMjI2OCwiaXNzIjoibnVyc29mdC5hdXRoIiwianRpIjoiZmI1MjM3ZWYtMTRlMS00ODljLThiM2YtMTMyMDNlZjNhYWU2IiwicGVtIjp7fSwic3ViIjoiVXNlcjoyIiwidHlwIjoiYWNjZXNzIn0.h7dAs9a9cspHzCZagwKyGzrtSzh6Qr6hyza7Xks9mriCTVLH7R64D6tyx9uVs2zTvGHzmDL7zu6TIifLBjX90g'
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
            this.setState({cuentas:res.data})
          });

        } else {
          console.log('bad request');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });

  }



  DesplegarCuentasDDS(cuenta,search){

    var ClaseEstado = "";
    var TextoEstado = "";
    if(cuenta.Bloqueada ===0){ClaseEstado = "estado-f";TextoEstado = "Activa";}
    if(cuenta.Bloqueada ===1) {ClaseEstado = "estado-md";TextoEstado = "Bloqueada";}
    if (cuenta.user_type==="owner" && String(cuenta.nombre + " " + cuenta.apellido).toLowerCase().includes(this.props.search.toString().toLowerCase())) {
      return (
            <div key = {cuenta.id } className="row cuenta no-margin" >
              <div className="col-md-12 no-padding"  /*onClick={ (event) => this.props.HandleDetalleTopico(event,'SI',topico)}*/ >
                <div className= {"div-estado " + ClaseEstado}>
                  <p className = "titulo-estado">Estado</p>
                  <h5 className={ClaseEstado}>{TextoEstado}</h5>
                </div>
                <div className="div-datos"  /*onClick={ (event) => this.props.HandleDetalleTopico(event,'SI',topico)}*/ >
                  <h4 className="nombre-cuenta">{cuenta.nombre} {cuenta.apellido}</h4>
                  <h5 className="email-cuenta">{cuenta.email}</h5>
                  <NavLink   className="gradient-button gradient-button-3" to={{ pathname: '/cuentas/'+cuenta.id, cuenta: cuenta}} >Ver</NavLink>
                </div>
              </div>
            </div>

        )
    }
  }




  OrdenarTopicos(orden) {
    if(orden ==='Nombre'){
        var topicos_ordenados = this.state.topicos.sort(this.OrdenarNombre);
        this.setState({topicos: topicos_ordenados});
    }
  }


  OrdenarNombre(a,b) {
    if(!a.name){
      return -1;
    }
    if(!b.name){
      return 1;
    }
    if(a.name && b.name){
      var nameA=a.name.toLowerCase();
      var nameB=b.name.toLowerCase();
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
    if(tipo_cuentas === "idm"){
      return (
        <div></div>
      );

    }
    else {
      return (
        <div className ="lista-cuentas">
           {this.state.cuentas.map((cuenta,i,arr) => (
            this.DesplegarCuentasDDS(cuenta,search)
          ))}
        </div>
      );

    }
  }
}

export default MostrarCuentas;
