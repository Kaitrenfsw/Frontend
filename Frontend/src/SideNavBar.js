import React, { Component } from 'react'


class SideNavBar extends Component{


  renderTitle(val){
    switch (val) {
      case "Contraseña":
        return "Cambiar Contraseña";
        case "Registro":
          return "Registro de actividad"
        case "Suscripciones":
          return "Temas Suscritos"
      default:
        return val;
    }
  }
  render(){


  	var activo = this.props.activo;
    var options = this.props.options;
    var options_html = [];
    for(var i=0;i<options.length; i++ ){
        const val = options[i];
        options_html.push(  <li key = {val} className={"is " + ((activo === val)? 'active' : 'inactive')}><a   onClick={ (event) => this.props.HandleNavBar(event,val)}  >{this.renderTitle(val)}</a></li>);
    }
    return (
                <div className="NavBar">
                {options_html}
                </div>
    );
  }
}
export default SideNavBar;
