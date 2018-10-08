import React, { Component } from 'react'


class SideNavBar extends Component{


  render(){


  	var activo = this.props.activo;
    var options = this.props.options;
    var options_html = [];
    for(var i=0;i<options.length; i++ ){
        const val = options[i];
        options_html.push(  <li key = {val} className={"is " + ((activo === val)? 'active' : 'inactive')}><a   onClick={ (event) => this.props.HandleNavBar(event,val)}  >{val}</a></li>);
    }
    return (
                <div className="NavBar">
                {options_html}
                </div>
    );
  }
}
export default SideNavBar;
