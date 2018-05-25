import React, { Component } from 'react'



class Header extends Component{
  render(){
    return ( 
      <header>
	  <div className="wrap">
	    <div className="conten nav" style={{'backgroundColor': '#444444'}}>
	    	<div className="navbar-header">
	      		<a className="navbar-brand" style={{color: 'white',fontsize: '25px', margin: '3% 20%'}} >  Kompaz</a>
	    	</div>
		 
	    </div>
	  </div>
	</header>
    );
  }
}

export default Header;