import React, { Component } from 'react'




class NavTabs extends Component{
  render(){
  	var activo = this.props.activo;
    var tabs = this.props.tabs;
    var first_tab = 	<li className={"is " + ((activo === tabs[0])? 'active' : 'inactive')}  onClick={ (event) => this.props.HandleNavTabs(event,tabs[0])}  name={tabs[0]} ><a>{tabs[0]}</a></li>
    var second_tab = 	<li className={"is " + ((activo === tabs[1])? 'active' : 'inactive')}  onClick={ (event) => this.props.HandleNavTabs(event,tabs[1])}  name={tabs[1]} ><a>{tabs[1]}</a></li>
    return (
    	<div className="NavTabs">
            <div className="row no-margin">
          			<div className="col-lg-6">
                {first_tab}
              	</div>
          		  <div className="col-lg-6">
            		 {second_tab}
                </div>
        		</div>
        </div>
    );
  }
}

export default NavTabs;
