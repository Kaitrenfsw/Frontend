import React, { Component } from 'react'



class Header extends Component{
  render(){
    return ( 
      <header>
	  <div className="wrap">
	    <div className="navbar navbar-default navbar-fixed-top" style={{'backgroundColor': '#0B173B'}}>
	    	<div className="navbar-header">
	      		<a className="navbar-brand" > <img src="compass2.ico"  ></img>  </a><span className="name pull-left">Kompaz</span>
	    	</div>
		 
	    </div>
	  </div>
	</header>
    );
  }
}

export default Header;