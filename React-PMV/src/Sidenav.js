import React, { Component } from 'react'



class Sidenav extends Component{
  render(){
    return ( 
      <div className="sidebar">
		<div className="navbar navbar-inverse navbar-fixed-left">
		  <ul className="nav navbar-nav">
		   <li><a ><span className="glyphicon glyphicon-home" ></span> Home</a></li>
		   <li><a ><span className="glyphicon glyphicon-dashboard" ></span> Dashboard</a></li>
		   <li><a ><span className="glyphicon glyphicon-check" ></span> Topicos</a></li>
		   <li><a ><span className="glyphicon glyphicon-search" ></span> Fuentes</a></li>
		  </ul>
		</div>	
    </div>
    );
  }
}

export default Sidenav;