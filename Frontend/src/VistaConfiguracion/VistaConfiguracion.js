import React, { Component } from 'react'
import SideNavBar from '../SideNavBar';
import Contrasena from './Contrasena';
import Datos from './Datos';
import Entrenamiento from './Entrenamiento';
import Fuentes from './Fuentes';
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
    activo:'Datos personales'
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
      return <Contrasena/>
    }
    if(activo === 'Datos personales'){
      return <Datos user = {this.props.user}/>
    }
    if(activo === 'Entrenamiento'){
      return <Entrenamiento/>
    }
    if(activo === 'Fuentes'){
      return <Fuentes user = {this.props.user}/>
    }
  }





  render(){

    var activo = this.state.activo;
    var options = [];
    if(this.props.user.permissions[0].group === 'admin'){
      options = ['Datos personales','Entrenamiento','Fuentes'];
    }
    if(this.props.user.permissions[0].group === 'owner'){
      options =  ['Datos personales','Fuentes'];
    }
    if(this.props.user.permissions[0].group === 'idm'){
      options =  ['Datos personales','Fuentes'];
    }
    return (
      <div className = "animated fadeIn container-fluid ContenidoVistaConfiguracion">
      <h2 className="titulo-vista" >Configuración</h2>
        <div className="row row-no-padding no-margin">
          <div className="col-sm-2 no-padding">
          <SideNavBar HandleNavBar= {this.HandleNavBar.bind(this)}  user_type  = {this.props.user.permissions[0].group} activo = {activo} options={options}/>
          </div>
          <div className="col-sm-9 col-sm-offset-1 no-padding">

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
