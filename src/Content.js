import React, { Component } from 'react';

import VistaTopicos from './Vistas/VistaTopicos/VistaTopicos';



class Content extends Component {


  VistaActiva(vista) {
    if(vista ==='TOPICOS')
      return (  
          <VistaTopicos/>
        )

  }

  
render(){
   return (
      this.VistaActiva(this.props.VistaActiva)
  

   );
  }
}

export default Content;