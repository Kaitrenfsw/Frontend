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
       console.log(valor);
       if(this.state.orden !== valor){
       this.setState({
         orden: valor
       });
     }
   }

  render(){
    return (
      <div className="container-fluid ContenidoVistaHome">
        <h2 id = "titulo-vista">Artículos</h2>
        <ul className="ListasHome">
          <NavTabs activo = {this.state.activo} HandleNavTabs= {this.HandleNavTabs.bind(this)} tabs= {["Recomendados","Guardados"]} />
          <Paginacion search_text= {"busca un artículo"} orden = {this.state.orden}  HandleOrden= {this.HandleOrden.bind(this)} HandleSearch= {this.HandleSearch.bind(this)} options = {["Fecha","Tópicos","Fuentes"]} />
        </ul>
        <MostrarArticulos activo = {this.state.activo}/>
     </div>
    );
  }
}

export default VistaHome;
