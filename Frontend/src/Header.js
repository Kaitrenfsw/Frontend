import React, { Component } from 'react'
import logo from './Assets/kom2.svg';
import { NavLink, withRouter } from 'react-router-dom';

class MyLink extends Component {
   render () {
     console.log(this.props.history.location.pathname);
       if(this.props.history.location.pathname === this.props.to){
           return <a className="active">{this.props.children}</a>
       }
       return <NavLink exact to={this.props.to}>{this.props.children}</ NavLink>
   }
}


class Header extends Component{


 handleClick(event){
   localStorage.setItem('user', null);
   this.props.history.push('/login');
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
						<li  ><MyLink history ={this.props.history}exact to='/'>Home</MyLink></li>
						<li  ><MyLink history ={this.props.history}to='/dashboard'>Dashboard</MyLink></li>
						<li  ><MyLink history ={this.props.history}to='/topicos'>Temas</MyLink></li>
						<li  ><MyLink history ={this.props.history}to='/configuracion'>Configuración</MyLink></li>
						</ul>
			    <ul  className="nav navbar-nav navbar-right">
          	<li ><a href = "/ "onClick={this.handleClick.bind(this) }>Salir</a></li>
			    </ul>
			  </div>
			</nav>
		</div>
    );
  }
}

export default withRouter(Header);
