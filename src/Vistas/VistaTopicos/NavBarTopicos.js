import React, { Component } from 'react'




class NavBarTopicos extends Component{
  render(){
  	var activo = this.props.activo; 
    return ( 
    	<div className="NavBarTopicos">
        	{activo === 'EXPLORARTOPICOS' ?
        		(<div className="row">
          			<div className="col-lg-6">
             			<li><a   onClick={this.props.HandleNavBar.bind(this)}  name="MISTOPICOS" >Mis tópicos</a></li>
          			</div>
          		<div className="col-lg-6">
            		<li className="active" ><a  onClick={this.props.HandleNavBar.bind(this)} name="EXPLORARTOPICOS"  >Explorar tópicos</a> </li>
          		</div>
        		</div>
        	) : activo === 'MISTOPICOS' ? (
                <div className="row">
                  	<div className="col-lg-6">
                     	<li className="active" ><a name="MISTOPICOS" onClick={this.props.HandleNavBar.bind(this)} >Mis tópicos</a></li>
                  	</div>
                  	<div className="col-lg-6">
                    	<li ><a name="EXPLORARTOPICOS" onClick={this.props.HandleNavBar.bind(this)} >Explorar tópicos</a></li>
                  	</div>
                </div>
        ) : null}
        </div>
    );
  }
}

export default NavBarTopicos;