import React, { Component } from 'react'
import logo from './Assets/kom2.svg';
import { NavLink, withRouter } from 'react-router-dom';

class MyLink extends Component {
   render () {
       if(this.props.history.location.pathname === this.props.to){
           return <a className="active">{this.props.children}</a>
       }
       return <NavLink exact to={this.props.to}>{this.props.children}</ NavLink>
   }
}


class Header extends Component{
 handleClick(event){
   this.props.HandleUserLogIn(null);
   localStorage.setItem('user', null);

 }




  render(){
    var usuarios = null;
    if(this.props.user.permissions[0].group === 'owner' || this.props.user.permissions[0].group === 'admin' ){
       usuarios =   <li  ><MyLink history ={this.props.history}to='/usuarios'>Usuarios</MyLink></li> ;
    }
    return (
     	<div className="main">
			<nav className="navbar navbar-default" >
      	<img id = "logo" src={logo} alt="kompaz" />
			    <div className="navbar-header">
			       <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			       <span className="icon-bar"></span>
			       <span className="icon-bar"></span>
			       <span className="icon-bar"></span>
			       </button>
			    </div>
			    <div className="navbar-collapse collapse">
						<ul className="nav navbar-nav navbar-center">
						<li  ><MyLink history ={this.props.history}exact to='/'>Home</MyLink></li>
						<li  ><MyLink history ={this.props.history}to='/dashboard'>Dashboard</MyLink></li>
						<li  ><MyLink history ={this.props.history}to='/topicos'>Temas</MyLink></li>
            {usuarios}
						<li  ><MyLink history ={this.props.history}to='/configuracion'>Configuración</MyLink></li>
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

export default withRouter(Header);
