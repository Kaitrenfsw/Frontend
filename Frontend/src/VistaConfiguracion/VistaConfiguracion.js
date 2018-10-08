import React, { Component } from 'react'
import SideNavBar from '../SideNavBar';
import Contrasena from './Contrasena';
import Datos from './Datos';
import VistaCuentas from '../VistaCuentas/VistaCuentas';
import Entrenamiento from './Entrenamiento';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './VistaConfiguracion.css';


class VistaConfiguracion extends Component{

  constructor(props) {
    super(props);
    this.HandleNavBar = this.HandleNavBar.bind(this);
  }

  state = {
    activo:'Cuentas'
  }


   HandleNavBar(event,valor) {
     if(this.state.activo !== valor){
       this.setState({
         activo: valor
       });
     }
   }

  RenderContent(activo){
    if(activo === 'Contraseña'){
      return <Contrasena adm_cuenta={false}/>
    }
    if(activo === 'Datos personales'){
      return <Datos user = {this.props.user} adm_cuenta={false}/>
    }

    if(activo === 'Cuentas'){
      return <VistaCuentas user = {this.props.user}/>
    }
    if(activo === 'Entrenamiento'){
      return <Entrenamiento/>
    }

  }





  render(){

    var activo = this.state.activo;
    var options = [];
    if((this.props.user.permissions[0].group=== 'idm' || this.props.user.permissions[0].group==='owner') && activo === 'Cuentas'){
      activo = 'Datos personales';
    }
    if(this.props.user.permissions[0].group === 'admin'){
      options = ['Cuentas','Entrenamiento'];
    }
    if(this.props.user.permissions[0].group === 'owner'){
      options =  ['Datos personales'];
    }
    if(this.props.user.permissions[0].group === 'idm'){
      options =  ['Datos personales'];
    }
    return (
      <div className = "container-fluid ContenidoVistaConfiguracion">
      <h2 id="titulo-vista" >Configuración</h2>
        <div className="row row-no-padding no-margin">
          <div className="col-lg-2 no-padding">
          <SideNavBar HandleNavBar= {this.HandleNavBar.bind(this)}  user_type  = {this.props.user.permissions[0].group} activo = {activo} options={options}/>
          </div>
          <div className="col-lg-9 col-lg-offset-1 no-padding">

          <TransitionGroup>
           <CSSTransition
                      key = {this.state.activo}
                       timeout={400}
                       classNames="fade"
                     >
      {this.RenderContent(activo)}
         </CSSTransition>
         </TransitionGroup>
          </div>
        </div>
     </div>
    );
  }
}

export default VistaConfiguracion;
