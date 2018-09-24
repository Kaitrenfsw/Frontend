import React, { Component } from 'react'
import SideNavBar from '../SideNavBar';
import Datos from '../VistaConfiguracion/Datos';
import Contrasena from '../VistaConfiguracion/Contrasena';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import './VistaDetalleCuenta.css';
import left_icon from '../Assets/left.png';
import { NavLink } from 'react-router-dom';

class VistaDetalleCuenta extends Component{



	state = {
	      activo: 'Datos'
	 };

   HandleNavBar(event,valor) {
     if(this.state.activo !== valor){ this.setState({ activo: valor });}
   }

  RenderContent(activo){
    if(activo === 'Contraseña'){
      return <Contrasena user = {this.props.user} adm_cuenta = {true}/>
    }
    if(activo === 'Datos'){
      return  <Datos  id = {this.props.match.params.id} adm_cuenta={true} user = {this.props.user}/>
    }
  }





  render(){
    return (
      <div className = "container-fluid ContenidoVistaDetalleCuenta">
        <NavLink to='/configuracion'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Cuentas</h5></NavLink>
        <h2 id="titulo-vista" >{this.props.user.name}</h2>
        <div className="row row-no-padding">
            <div className="col-lg-2 no-padding">
              <SideNavBar HandleNavBar= {this.HandleNavBar.bind(this)}  tipo_usuario  = {1} activo = {this.state.activo} options={["Datos","Contraseña"]}/>
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
             </TransitionGroup>)
            </div>
          </div>
     </div>
    );
  }
}

export default VistaDetalleCuenta;
