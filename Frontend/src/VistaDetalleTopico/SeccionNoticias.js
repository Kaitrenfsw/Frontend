import React, { Component } from 'react'
import Paginacion from '../Paginacion';
class SeccionNoticias extends Component{

  state = {
      search: "",
      orden: "Nombre",
      guardados: [
        {
            "id": 61,
            "titulo": "How to use Terraform, Go, and AWS to build a scalable and resilient REST API",
            "imagen": "https://cdn-images-1.medium.com/max/2000/1*Xiu_m1OdtgTMxQ5q1tZezQ.png",
            "fuente": "Medium",
            "resumen": "I’ve recently been exploring the power of Terraform — and wanted to apply what I’ve learned to build a scalable and resilient REST API. In just a few simple steps, we’ll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go. I’ve recently been exploring the power of Terraform — and wanted to apply what I’ve learned to build a scalable and resilient REST API. In just a few simple steps, we’ll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go."

        },
        {
            "id": 62,
            "titulo": "BFF platform: system of (contacts) ",
            "imagen": "https://cdn-images-1.medium.com/max/1000/1*RDc0q4axrPYEhJrQaxm89w.jpeg",
            "fuente":  "Medium",
            "resumen": "In just a few simple steps, we’ll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go."

        },
        {
            "id": 63,
            "titulo": "BFF is on blockchain, and it’s upsides",
            "imagen": "https://cdn-images-1.medium.com/max/600/1*QPj0Lor0UKH5qIFfOvB-eA.jpeg",
            "fuente":  "Medium",
            "resumen": "In just a few simple steps, we’ll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go."

        },

      ]
  };

  HandleSearch(event) {
    if (true) {
       const target = event.target;
       const valor_busqueda = target.value;
       this.setState({search: valor_busqueda});
    }

  }
  HandleOrden(event,valor) {
       console.log(valor);
       if(this.state.orden !== valor){
          this.setState({ orden: valor });
       }
   }


  render(){



    return (

        <div >
        <h4 id="subtitulo-vista-noticias">Últimos artículos</h4>
        <Paginacion search_text= {"busca un artículo"} HandleSearch= {this.HandleSearch.bind(this)} HandleOrden= {this.HandleOrden.bind(this)} orden = {this.state.orden} options = {["Nombre"]}/>
        <div className="Div-Articulo">
        <img alt = {this.state.guardados[0].titulo} className= "imagen-articulo" src={this.state.guardados[1].imagen} />
        <h4 className="titulo-articulo">{this.state.guardados[1].titulo}</h4>
        <p className="resumen-articulo">{this.state.guardados[0].resumen}</p>
        </div>
        <div className="Div-Articulo">
        <img alt = {this.state.guardados[1].titulo} className= "imagen-articulo" src={this.state.guardados[2].imagen} />
        <h4 className="titulo-articulo">{this.state.guardados[2].titulo}</h4>
        <p className="resumen-articulo">{this.state.guardados[0].resumen}</p>
        </div>
        <div className="Div-Articulo">
        <img alt = {this.state.guardados[2].titulo} className= "imagen-articulo" src={this.state.guardados[0].imagen} />
        <h4 className="titulo-articulo">{this.state.guardados[0].titulo}</h4>
        <p className="resumen-articulo">{this.state.guardados[0].resumen}</p>
        </div>

        </div>

    );
  }
}

export default SeccionNoticias;
