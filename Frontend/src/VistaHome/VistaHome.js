import React, { Component } from 'react'
import NavTabs from '../NavTabs';
import Paginacion from '../Paginacion';
import MostrarArticulos from './MostrarArticulos';
import './VistaHome.css';

class VistaHome extends Component{



	state = {
	      activo: "Recomendados",
        search: '',
        orden: "Fecha"
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
       this.setState({
        search: valor_busqueda
       });
    }
  }

  HandleOrden(event,valor) {
       if(this.state.orden !== valor){
       this.setState({
         orden: valor
       });
     }
   }

  render(){
    return (
      <div className="container-fluid ContenidoVistaHome">
        <h2 className = "titulo-vista">Artículos</h2>
        <ul className="ListasHome">
          <NavTabs activo = {this.state.activo} HandleNavTabs= {this.HandleNavTabs.bind(this)} tabs= {["Recomendados","Guardados"]} />
          <Paginacion search_text= {"busca un artículo"} orden = {this.state.orden}  orden_text = {"Mostrar por"} HandleOrden= {this.HandleOrden.bind(this)} HandleSearch= {this.HandleSearch.bind(this)} options = {["Fecha","Fuentes Favoritas"]} />
        </ul>
        <MostrarArticulos user={this.props.user} search = {this.state.search} orden = {this.state.orden} activo = {this.state.activo}/>
     </div>
    );
  }
}

export default VistaHome;
