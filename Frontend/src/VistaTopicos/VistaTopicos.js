import React, { Component } from 'react'
import NavTabs from '../NavTabs';
import Paginacion from '../Paginacion';
import MostrarTopicos from './MostrarTopicos';
import './VistaTopicos.css';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

class VistaTopicos extends Component{
	state = {
	      activo: 'Explorar temas',
        search: '',
        orden: "Nombre",
        topicos: [],
        usrTopics: [],
	 };
  HandleNavTabs(event,valor) {
    if(this.state.activo !== valor){
	     this.setState({ activo: valor });
     }
  }
  HandleDetalleTopico(event,valor, valor2) {
	  this.setState({ ver_detalle: valor, topico: valor2 });
  }
  HandleSearch(event) {
    if (true) {
       const target = event.target;
       const valor_busqueda = target.value;
       this.setState({ search: valor_busqueda });
    }
  }
  HandleOrden(event,valor) {
       if(this.state.orden !== valor){ this.setState({ orden: valor }); }
   }
  render(){
    return (
      <div className="container-fluid ContenidoVistaTopicos">
        <h2 className = "titulo-vista">Temas de interés</h2>
        <ul className="ListasTopicos">
          <NavTabs activo = {this.state.activo} HandleNavTabs= {this.HandleNavTabs.bind(this)} tabs= {["Mis temas","Explorar temas"]} />
          <Paginacion  search_text= {"busca un tema"} HandleSearch= {this.HandleSearch.bind(this)} HandleOrden= {this.HandleOrden.bind(this)} orden = {this.state.orden} options = {['Nombre','Coherencia']}/>
        </ul>
        <TransitionGroup appear={true} exit={false}>
           <CSSTransition
             key = {this.state.activo}
             timeout={500}
             classNames="fade"
           >
           <MostrarTopicos user_id = {this.props.user.id} usrTopics = {this.state.usrTopics} topicos = {this.state.topicos} HandleDetalleTopico= {this.HandleDetalleTopico.bind(this)} activo = {this.state.activo}  search = {this.state.search} orden = {this.state.orden}/>
          </CSSTransition>
        </TransitionGroup>
     </div>
    );
  }
}

export default VistaTopicos;
