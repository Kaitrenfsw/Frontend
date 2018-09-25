import React, { Component } from 'react'
import logo from './Assets/kom2.svg';
import perfil from './Assets/perfil.png';
import { NavLink } from 'react-router-dom';


class Header extends Component{

 handleClick(event){
   localStorage.setItem('user', null);
   this.props.HandleNavBar(event,'LOGIN');
 }
  render(){
    return (
     	<div className="main">
			<nav className="navbar navbar-default" >
			    <div className="navbar-header">
			       <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			       <span className="icon-bar"></span>
			       <span className="icon-bar"></span>
			       <span className="icon-bar"></span>
			       </button>
			    </div>
			    <div className="navbar-collapse collapse">
			        <ul className="nav navbar-nav navbar-left ">
			        	<img id = "logo" src={logo} alt="kompaz" />
			    	</ul>
						<ul className="nav navbar-nav navbar-center">
						<li ><NavLink exact to='/'>Home</NavLink></li>
						<li><NavLink to='/dashboard'>Dashboard</NavLink></li>
						<li  ><NavLink to='/topicos'>Tópicos</NavLink></li>
						<li><NavLink to='/configuracion'>Configuración</NavLink></li>
						</ul>
			    <ul  className="nav navbar-nav navbar-right">
          	<li ><a onClick={this.handleClick.bind(this) }>Salir</a></li>

			    </ul>
			  </div>
			</nav>
		</div>
    );
  }
}

export default Header;
