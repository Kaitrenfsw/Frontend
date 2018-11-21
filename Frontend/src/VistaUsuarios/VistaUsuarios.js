import React, { Component } from 'react'
import SideNavBar from '../SideNavBar';
import VistaCuentas from '../VistaCuentas/VistaCuentas';
import Estadisticas from './Estadisticas'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './VistaUsuarios.css';


class VistaUsuarios extends Component{

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

    if(activo === 'Cuentas'){
      return <VistaCuentas user = {this.props.user}/>
    }
    if(activo === 'Estadísticas'){
      return  <Estadisticas user = {this.props.user}/>;
    }

  }





  render(){

    var activo = this.state.activo;
    var options = ['Cuentas','Estadísticas'];
    return (
      <div className = "container-fluid ContenidoVistaUsuarios">
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

export default VistaUsuarios;
