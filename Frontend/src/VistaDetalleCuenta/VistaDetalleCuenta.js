import React, { Component } from 'react'
import SideNavBar from '../SideNavBar';
import Datos from './Datos';
import Contrasena from './Contrasena';
import Logs from './Logs';
import TemasUsuario from './TemasUsuario';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import './VistaDetalleCuenta.css';
import left_icon from '../Assets/left.png';
import { NavLink } from 'react-router-dom';

class VistaDetalleCuenta extends Component{



	state = {
	      activo: 'Suscripciones'
	 };

	 componentDidMount(){
		 if(this.props.user.permissions[0].group === "admin" && this.state.activo === 'Contraseña'){
			 this.setState({activo:'Datos'});
		 }
	 }

   HandleNavBar(event,valor) {
     if(this.state.activo !== valor){ this.setState({ activo: valor });}
   }

  RenderContent(activo){
    if(activo === 'Contraseña'){
      return <Contrasena id = {this.props.match.params.id} user = {this.props.user} />
    }
    if(activo === 'Datos'){
      return  <Datos  id = {this.props.match.params.id}user = {this.props.user}/>
    }
		if(activo === 'Suscripciones'){
			return  <TemasUsuario  id = {this.props.match.params.id}user = {this.props.user}/>
		}
		if(activo === 'Registro'){
			return  <Logs  id = {this.props.match.params.id}user = {this.props.user}/>
		}
  }





  render(){
		var options;
		var activo = this.state.activo;
		if(this.props.user.permissions[0].group === "admin") {options = ["Datos"]; activo = 'Datos'};
		if(this.props.user.permissions[0].group === "owner") {options = ["Suscripciones","Registro","Contraseña"]; };
    return (
      <div className = "animated fadeIn  ContenidoVistaDetalleCuenta">
        <NavLink to='/usuarios'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Cuentas</h5></NavLink>
        <h2 className="titulo-vista no-margin-top" >Cuenta {this.props.match.params.email}</h2>
        <div className="row row-no-padding">
            <div className="col-lg-2 no-padding">
              <SideNavBar HandleNavBar= {this.HandleNavBar.bind(this)}  tipo_usuario  = {1} activo = {activo} options={options}/>
            </div>
            <div className="col-lg-9 col-lg-offset-1 no-padding">
              <TransitionGroup component={null}>
                 <CSSTransition
                            key = {this.state.activo}
                             timeout={500}
                             classNames="fade"
                           >
               {this.RenderContent(this.state.activo)}
               </CSSTransition>
             </TransitionGroup>
            </div>
          </div>
     </div>
    );
  }
}

export default VistaDetalleCuenta;
