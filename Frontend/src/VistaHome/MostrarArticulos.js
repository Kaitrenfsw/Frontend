import React, { Component } from 'react'

/*
import left_guardar from '../Assets/left-guardar.png';
import right_guardar from '../Assets/right-guardar.png';
*/


class MostrarArticulos extends Component{


  state = {
      recomendados: [
        {
            "id": 61,
            "titulo": "How to use Terraform and AWS to build a scalable and resilient REST API",
            "imagen": "https://cdn-images-1.medium.com/max/2000/1*Xiu_m1OdtgTMxQ5q1tZezQ.png",
            "fuente": "Medium",
            "resumen": "In just a few simple steps, we’ll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed.",
            "topicos": ["Api Development", "Terraform", "AWS"]
        },



        {
            "id": 63,
            "titulo": "Why Businesses Can’t Afford to Miss Chatbot Development",
            "imagen": "https://d3olfrdxinh85x.cloudfront.net/cdn/es/wp-content/uploads/chatbots-the-key-to-efficient-customer-service.jpg",
            "fuente":  "Dzone",
            "resumen": "Chatbots are seen all over. Let's check out why your business can't afford to miss out on chatbot development.",
            "topicos": [ "Chatbots","AI"]
        },

        {
            "id": 62,
            "titulo": "BFF platform: system of (contacts) ",
            "imagen": "https://cdn-images-1.medium.com/max/1000/1*RDc0q4axrPYEhJrQaxm89w.jpeg",
            "fuente":  "Medium",
            "resumen": "Bitcoin is history’s first immutable, decentralized, global digital ledger of records. The underlying technology, blockchain on which bitcoin runs is a revolution in structured database management. ",
            "topicos": ["BFF", "Bitcoin", "Blockchain"]
        },

        {
            "id": 64,
            "titulo": "A look at the Nexus Framework",
            "imagen": "https://sdtimes.com/wp-content/uploads/2018/09/nexis-framework-490x300.png",
            "fuente":  "Sdtimes",
            "resumen": "Nexus, created by Scrum co-creator Ken Schwaber and his Scrum.org team, extends Scrum to guide multiple Scrum teams on how they need to work together to deliver working software in every Sprint.",
            "topicos": ["Nexus", "Agile"]
        },


        {
            "id": 65,
            "titulo": "MapR unveils six new data science offerings for AI initiatives",
            "imagen": "https://sdtimes.com/wp-content/uploads/2018/09/icon-ai-advantage-490x264.png",
            "fuente":  "sdtimes",
            "resumen": "MapR is introducing six new data science offerings aimed at customers that are at varying points in their data science journey at the Strata Data Conference happening in NYC today.",
            "topicos": ["AI", "Data Science"]
        },
        {
            "id": 66,
            "titulo": "The Web 3.0: The Web Transition Is Coming",
            "imagen": "https://cdn-images-1.medium.com/max/1600/1*yH0yrqHy8vyT_Y5Jo_uhTw.jpeg",
            "fuente":  "Medium",
            "resumen": "Transitioning from web 2.0 to the 3.0 version is going to likely go unnoticed by most people. The applications are going to look almost exactly like what you are currently using, but the change will be done.",
            "topicos": ["Web 3.0", "Applications"]
        },

        {
            "id": 67,
            "titulo": "World-first quantum computer simulation of chemical bonds using trapped ions",
            "imagen": "https://www.sciencedaily.com/images/2018/07/180724110028_1_540x360.jpg",
            "fuente":  "ScienceDaily",
            "resumen": "Quantum chemistry expected to be one of the first applications of full-scale quantum computers.",
            "topicos": ["Quantum"]
        },

        {
                    "id": 68,
                    "titulo": "BFF is on blockchain, and it’s upsides",
                    "imagen": "https://cdn-images-1.medium.com/max/600/1*QPj0Lor0UKH5qIFfOvB-eA.jpeg",
                    "fuente":  "Medium",
                    "resumen": "In just a few simple steps, we’ll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go.",
                    "topicos": ["BFF","Blockchain"]
        },
        {
            "id": 69,
            "titulo": "Ytterbium: The quantum memory of tomorrow",
            "imagen": "https://cdn6.bigcommerce.com/s-wepv6/product_images/uploaded_images/ytterbiummetal.jpg?t=1516971552",
            "fuente":  "ScienceDaily",
            "resumen": "Quantum communication and cryptography are the future of high-security communication. But many challenges lie ahead before a worldwide quantum network can be set up.",
            "topicos": ["Quantum", "Cryptography"]
        },

        {
            "id": 70,
            "titulo": "Scaling Scrum is just Scrum",
            "imagen": "https://sdtimes.com/wp-content/uploads/2018/09/scrum-1-490x275.jpg",
            "fuente":  "Sdtimes",
            "resumen": "One of the hottest questions these days, whether online or in the boardroom, is “How does the organization become more ‘agile’?” As the discussion evolves, it leads to, “How do we scale agility to multiple teams.",
            "topicos": ["Scrum", "Agile"]
        },


        {
            "id": 71,
            "titulo": "Why the net giants are worried about the Web 3.0",
            "imagen": "https://cdn-images-1.medium.com/max/2000/1*AijBTLBMdE27iMOU7iVlnQ.png",
            "fuente":  "Medium",
            "resumen": "The birth of blockchain spawned a movement which is set to disrupt the entire tech industry. Blockchain and crypto enthusiasts are calling it the Web 3.0 and it’s looking to make all traditional business models defunct.",
            "topicos": ["Web 3.0", "Blockchain", "Technology Industry"]
        },

        {
            "id": 72,
            "titulo": "The 2018 Software Testing Showcase",
            "imagen": "https://sdtimes.com/wp-content/uploads/2018/09/TestingShowcase-490x275.jpg",
            "fuente":  "Sdtimes",
            "resumen": "These are many technologies available to organizations looking to bring their testing up to the speed of software development.",
            "topicos": ["Software Testing", "Software Development"]
        },
      ]

  };



  /**/
  Desplegar(grupo_articulos){
    var topico1,topico2,topico3;
    if (grupo_articulos.length >= 1){
      if(grupo_articulos[0].topicos[0]) topico1 =   <div className="Div-Topico Blue"><h5>{grupo_articulos[0].topicos[0]}</h5></div>
      if(grupo_articulos[0].topicos[1]) topico2 = <div className="Div-Topico Green"><h5>{grupo_articulos[0].topicos[1]}</h5></div>
      if(grupo_articulos[0].topicos[2]) topico3 = <div className="Div-Topico Orange"><h5>{grupo_articulos[0].topicos[2]}</h5></div>
      var articulo_1 =  <div className="col-md-4 col-izq">
            <div className="Div-Articulo">
            <div className="botones">
            <span className="glyphicon glyphicon glyphicon-bookmark"></span>
            <span className="glyphicon glyphicon-thumbs-up"></span>
            <span className="glyphicon glyphicon-thumbs-down"></span>
            </div>
            <img src={grupo_articulos[0].imagen} alt={grupo_articulos[1].fuente} />
            {topico1}
            {topico2}
            {topico3}
            <h4 className="titulo-articulo">{grupo_articulos[0].titulo}</h4>
            <h5 className="fuente-articulo">Fuente: {grupo_articulos[0].fuente}</h5>
            <p className="resumen-articulo">{grupo_articulos[0].resumen}</p>

            </div>
          </div>

    }
    if (grupo_articulos.length >= 2){

      if(grupo_articulos[1].topicos[0]) topico1 =   <div className="Div-Topico Blue"><h5>{grupo_articulos[1].topicos[0]}</h5></div>
      if(grupo_articulos[1].topicos[1]) topico2 = <div className="Div-Topico Green"><h5>{grupo_articulos[1].topicos[1]}</h5></div>
      if(grupo_articulos[1].topicos[2]) topico3 = <div className="Div-Topico Orange"><h5>{grupo_articulos[1].topicos[2]}</h5></div>

      var articulo_2 =  <div className="col-md-4">
            <div className="Div-Articulo">
            <div className="botones">
            <span className="glyphicon glyphicon glyphicon-bookmark"></span>
            <span className="glyphicon glyphicon-thumbs-up"></span>
            <span className="glyphicon glyphicon-thumbs-down"></span>
            </div>
            <img src={grupo_articulos[1].imagen} alt={grupo_articulos[1].fuente}/>
            {topico1}
            {topico2}
            {topico3}
            <h4 className="titulo-articulo">{grupo_articulos[1].titulo}</h4>
            <h5 className="fuente-articulo">Fuente: {grupo_articulos[1].fuente}</h5>
            <p className="resumen-articulo">{grupo_articulos[1].resumen}</p>

            </div>
          </div>

    }


    if (grupo_articulos.length === 3){


      if(grupo_articulos[2].topicos[0])  topico1 =   <div className="Div-Topico Blue"><h5>{grupo_articulos[2].topicos[0]}</h5></div>
      if(grupo_articulos[2].topicos[1]) topico2 = <div className="Div-Topico Green"><h5>{grupo_articulos[2].topicos[1]}</h5></div>
      if(grupo_articulos[2].topicos[2]) topico3 = <div className="Div-Topico Orange"><h5>{grupo_articulos[2].topicos[2]}</h5></div>

      var articulo_3 =  <div className="col-md-4 col-der">
            <div className="Div-Articulo">
            <div className="botones">
            <span className="glyphicon glyphicon glyphicon-bookmark"></span>
            <span className="glyphicon glyphicon-thumbs-up"></span>
            <span className="glyphicon glyphicon-thumbs-down"></span>
            </div>
            <img src={grupo_articulos[2].imagen} alt={grupo_articulos[2].fuente} />
            {topico1}
            {topico2}
            {topico3}
            <h4 className="titulo-articulo">{grupo_articulos[2].titulo}</h4>
            <h5 className="fuente-articulo">Fuente: {grupo_articulos[2].fuente}</h5>
            <p className="resumen-articulo">{grupo_articulos[2].resumen}</p>
            </div>
          </div>
    }


    if (grupo_articulos.length !== 0){
      return (

          <div  key = {grupo_articulos[0].id} className="row row-no-padding margin-bottom">
            {articulo_1}
            {articulo_2}
            {articulo_3}
          </div>





    );
  }
  }
  /*
  Recomendados(){
    return (
      <div className="ContenidoArticulosRecomendados">
        <div className="row row-no-padding">
          <div className="center-block">
            <div className="Div-Recomendado">
            <img src="https://cdn-images-1.medium.com/max/2000/1*Xiu_m1OdtgTMxQ5q1tZezQ.png" alt="medium"/>
            <div className="Div-Topico Blue"><h5>Api development</h5></div>
            <div className="Div-Topico Green"><h5>Rest metrics</h5></div>
            <div className="Div-Topico Orange"><h5>Data Science</h5></div>
            <h4 className = "titulo-articulo">How to use Terraform, Go, and AWS to build a scalable and resilient REST API</h4>
            <h5 className="fuente-articulo">Fuente: Medium</h5>
            <p className="resumen-articulo">In just a few simple steps, we’ll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go.n just a few simple steps, we’ll be using Terraform to provision our underlying AWS infrastructure and deploy our microservice developed with Go</p>
            <div className="botones-recomendado">
            <span className="glyphicon glyphicon-remove"></span>
            <span className="glyphicon glyphicon glyphicon-bookmark"></span>
            <img id = "left-guardar" src={left_guardar} alt="left save"  />
            <img id = "right-guardar" src={right_guardar} alt="right save" />
            </div>
            </div>
          </div>
        </div>

     </div>
    );


  }
    */
  render(){
    var activo = this.props.activo;
    var recomendados = this.state.recomendados;
    if(activo === 'Recomendados'){
      var groups = [];
      for(var i = 0; i < recomendados.length; i += 3){
        groups.push(recomendados.slice(i, i+3))
      }
      var articulos =[];
      for (var j = 0; j< groups.length; j++){
          articulos.push(this.Desplegar(groups[j]))
      }
      return(<div className="ContenidoArticulos">{articulos}</div>);
    }
    if(activo === 'Guardados'){
      return(<div className="ContenidoArticulos"></div>);
    }

  }
}

export default MostrarArticulos;
