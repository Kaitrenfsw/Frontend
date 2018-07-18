import React, { Component } from 'react'
import logo from './kom2.svg';



class Header extends Component{


	VistaActiva(vista) {
        
 		if(vista === 'TOPICOS')
 			return (
 				<ul className="nav navbar-nav navbar-center">
 				<li><a href="">Home</a></li>
			    <li><a href="">Dashboard</a></li>
			    <li className = "active" ><a href="">Tópicos</a></li>
			    <li><a href="">Fuentes</a></li>
			    </ul>
        )

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
			        	<img id = "logo" src={logo} alt="suscribirme" />
			    	</ul>
			    	{this.VistaActiva(this.props.VistaActiva)}
			    <ul className="nav navbar-nav navbar-right">
			        <li><a href="">Perfil</a></li>
			    </ul>
			  </div>
			</nav>
		</div>

    	









    );
  }
}

export default Header;