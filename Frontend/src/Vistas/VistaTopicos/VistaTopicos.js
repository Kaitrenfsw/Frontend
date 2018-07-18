import React, { Component } from 'react'
import NavBarTopicos from './NavBarTopicos';
import PaginacionTopicos from './PaginacionTopicos';
import MostrarTopicos from './MostrarTopicos';


class VistaTopicos extends Component{

  constructor(props) {
    super(props)
    this.HandleNavBar = this.HandleNavBar.bind(this)
  }

	state = {
	      activo: 'EXPLORARTOPICOS'
	 };

  HandleNavBar(event) {
    const target = event.target;
	  const nombre_elemento = target.getAttribute('name');
	  console.log(nombre_elemento);
	  this.setState({
      activo: nombre_elemento
    });
  }    

  render(){
    return (
      <div className="ContenidoVistaTopicos">
        <h2>Tópicos</h2>
        <ul className="ListasTopicos">
          <NavBarTopicos activo = {this.state.activo} HandleNavBar= {this.HandleNavBar.bind(this)} />
          <PaginacionTopicos/>
        </ul>
        <MostrarTopicos activo = {this.state.activo}/>
     </div>
    );
  }
}

export default VistaTopicos;