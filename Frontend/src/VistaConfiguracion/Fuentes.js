import React, { Component } from 'react'
import config from '../config.js';




class Fuentes extends Component{

  state = {
      isLoading:true,
      fuentes: [
        {
            "id": 61,
            "nombre": "TheHackerNews",
            "url": "www.TheHackerNews.com",
        },
        {
            "id": 62,
            "nombre": "Medium",
            "url": "www.Medium.com",
        },
        {
            "id": 63,
            "nombre": "InfoQ",
            "url": "www.InfoQ.com",
        },
      ]
  };


  HandleMarcarFavorita(event, id){
  fetch("http://"+ config.base_url +":" + config.port + "/api/" , {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user_id': this.props.user.id,
      'source_id':id
    })
  })
}


  fetchFuentes(){
    fetch("http://localhost:8001/sourceUser/" + this.props.user.id + "/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + this.props.user.token
        },
        body: null
    })
    .then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
          console.log(res.data);
          this.setState({fuentes:res.data,isLoading:false});
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }


 componentDidMount(){
   this.fetchFuentes();
 }

  MostrarFuentes(grupo_fuentes){

    if (grupo_fuentes.length >= 1){
      var fuente_1 =  <div className="col-lg-4 col-izq">
          <div key = {grupo_fuentes[0].id} className="Div-Fuente">
          <span className="glyphicon glyphicon-star"></span>
          <h4 className="nombre-fuente">{grupo_fuentes[0].name}</h4>
          <p className="url-fuente">{grupo_fuentes[0].site}</p>
          </div>
        </div>

    }
    if (grupo_fuentes.length >= 2){
      var fuente_2 =   <div className="col-lg-4">
          <div key = {grupo_fuentes[1].id} className="Div-Fuente">
          <span className="glyphicon glyphicon-star active"></span>
          <h4 className="nombre-fuente">{grupo_fuentes[1].name}</h4>
          <p className="url-fuente">{grupo_fuentes[1].site}</p>
          </div>
        </div>

    }
    if (grupo_fuentes.length === 3){
      var fuente_3 =   <div className="col-lg-4 col-der">
          <div key = {grupo_fuentes[2].id} className="Div-Fuente">
          <span className="glyphicon glyphicon-star"></span>
          <h4 className="nombre-fuente">{grupo_fuentes[2].name}</h4>
          <p className="url-fuente">{grupo_fuentes[2].site}</p>
          </div>
        </div>
    }
    if (grupo_fuentes.length !== 0){
      return (
          <div className="row row-no-padding">
            {fuente_1}
            {fuente_2}
            {fuente_3}
          </div>
    );
  }
  }



  MostrarFuentesAux(){
    var fuentes = this.state.fuentes;
    var groups = [];
    for(var i = 0; i < fuentes.length; i += 3){
      groups.push(fuentes.slice(i, i+3))
    }
    var html = [];
    for (var j = 0; j< groups.length; j++){
      html.push(<div key={j}>{this.MostrarFuentes(groups[j])}</div>)
    }
    return html;
  }

  render(){
    if(this.state.isLoading){
      return(
        <div className="ContenidoVistaFuentes">
          <h3 id ="subtitulo-vista">Fuentes</h3>
          <div className = "margin-top">
          <div className="loader loader--style2" title="1">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="8.5em" height="8.5em" viewBox="0 0 50 50"  xmlSpace="preserve">
            <path fill="#36454E" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
              <animateTransform attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
           </div>
          </div>
      )}
    else{
    return (
      <div className="ContenidoVistaFuentes">
        <h3 id ="subtitulo-vista">Fuentes</h3>
        <div className = "margin-top">
         {this.MostrarFuentesAux()}
         </div>
        </div>
    );
  }
  }
}

export default Fuentes;
