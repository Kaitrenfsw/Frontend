import React, { Component } from 'react'
import NavTabs from '../NavTabs';
import Paginacion from '../Paginacion';
import MostrarTopicos from './MostrarTopicos';
import './VistaTopicos.css';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

class VistaTopicos extends Component{



	state = {
	      activo: 'Explorar tópicos',
        search: '',
        orden: "Fecha",
        topicos: [],
        usrTopics: [],
	 };

   componentDidUpdate(prevProps,prevState){
     if (prevProps.orden !== this.props.orden) {
         this.OrdenarTopicos(this.props.orden);
     }
   }

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
       console.log(valor);
       if(this.state.orden !== valor){ this.setState({ orden: valor }); }
   }

  render(){

    return (
      <div className="container-fluid ContenidoVistaTopicos">
        <h2 id = "titulo-vista">Tópicos</h2>
        <ul className="ListasTopicos">
          <NavTabs activo = {this.state.activo} HandleNavTabs= {this.HandleNavTabs.bind(this)} tabs= {["Mis tópicos","Explorar tópicos"]} />
          <Paginacion  search_text= {"busca un tópico"} HandleSearch= {this.HandleSearch.bind(this)} HandleOrden= {this.HandleOrden.bind(this)} orden = {this.state.orden} options = {['Fecha','Nombre']}/>
        </ul>
        <TransitionGroup appear={true}>
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
