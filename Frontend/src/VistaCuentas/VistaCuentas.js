import React, { Component } from 'react'
import MostrarCuentas from './MostrarCuentas';
import Paginacion from '../Paginacion';
import NavTabs from '../NavTabs';
import CrearCuenta from './CrearCuenta';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import './VistaCuentas.css';

class VistaCuentas extends Component{

	state = {
        activo: 'Explorar cuentas',
        search: '',
        orden: "Email",
	 };

  HandleNavTabs(event,valor) {
     if(this.state.activo !== valor){
       this.setState({activo: valor});
     }
   }

  HandleSearch(event) {
    if (true) {
       const target = event.target;
       const valor_busqueda = target.value;
       this.setState({search: valor_busqueda});
    }

  }
	HandleOrden(event,valor) {
			 console.log(valor);
			 if(this.state.orden !== valor){
			 		this.setState({ orden: valor });
		 	 }
	 }

  RenderContent(){
		var tipo_cuentas = "";
		if(this.props.user.permissions[0].group=== "admin"){
			tipo_cuentas = "owner";
		}
		else {
			tipo_cuentas ="idm";
		}
    if(this.state.activo === 'Explorar cuentas'){
      return <div>
				<div className = "page">
			  <Paginacion search_text= {"ingresa un nombre"} HandleSearch= {this.HandleSearch.bind(this)} HandleOrden= {this.HandleOrden.bind(this)} orden = {this.state.orden} options = {["Email","Nombre"]}/>

				<MostrarCuentas user = {this.props.user} tipo_cuentas = {tipo_cuentas} search = {this.state.search} orden = {this.state.orden} />
				</div>
				</div>
    }
    if(this.state.activo === 'Crear cuenta'){

      return  <div><div className = "page"> <CrearCuenta user = {this.props.user}/></div></div>
    }
  }


  render(){

    return (
      <div className="ContenidoVistaCuentas">
          <h3 id ="subtitulo-vista">Cuentas</h3>
					<div className="margin-top">
          <NavTabs activo = {this.state.activo} HandleNavTabs= {this.HandleNavTabs.bind(this)} tabs= {["Explorar cuentas","Crear cuenta"]} />
          <TransitionGroup exit={false}>
             <CSSTransition
               key = {this.state.activo}
               timeout={400}
               classNames="fade"
             >
            {this.RenderContent.bind(this)}
            </CSSTransition>
          </TransitionGroup>
					</div>
     </div>
    );
  }
}

export default VistaCuentas;
