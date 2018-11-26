import React, { Component } from 'react'
import config from '../config.js';




class Fuentes extends Component{

  state = {
      isLoading:true,
      fuentes: [
        {
            "id": 61,
            "name": "TheHackerNews",
            "site": "www.TheHackerNews.com",
            "sourceUser_id": 1
        },
        {
            "id": 62,
            "name": "Medium",
            "site": "www.Medium.com",
            "sourceUser_id": 2
        },
        {
            "id": 63,
            "name": "InfoQ",
            "site": "www.InfoQ.com",
            "sourceUser_id": 3
        },
      ]
  };
  HandleMarcarFavorita(event,fuente){
    var fuentes = this.state.fuentes;
    for(var i =0; i< fuentes.length; i++){
      if(fuentes[i].id === fuente.id){
        fuentes[i].favorite = 1;
      }
    }
    this.setState({fuentes});
    fetch("http://"+ config.base_url +":" + config.port + "/api/user_source/?action=1" , {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user_id': this.props.user.id,
        'source_id':fuente.id,
      })
    })
  }
  HandleDesmarcarFavorita(event, fuente){
    var fuentes = this.state.fuentes;
    for(var i =0; i< fuentes.length; i++){
      if(fuentes[i].id === fuente.id){
        fuentes[i].favorite = 0;
      }
    }
    this.setState({fuentes});
    fetch("http://"+ config.base_url +":" + config.port + "/api/user_source/?action=0" , {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user_id': this.props.user.id,
        'source_id':fuente.id,
      })
    })
  }
  fetchFuentes(){
    fetch("http://"+ config.base_url +":" + config.port + "/api/get_sources/?user_id=" + this.props.user.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + this.props.user.token
        },
        body: null
  }).then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
          this.setState({fuentes:res.data,isLoading:false});
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }
  fetchFuentesAdmin(){
    fetch("http://"+ config.base_url +":" + config.port + "/api/admin/sources/?user_id=" + this.props.user.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + this.props.user.token
        },
        body: null
  }).then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
          this.setState({fuentes:res.data,isLoading:false});
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }
 componentDidMount(){
   if(this.props.user.permissions[0].group==="admin"){
       this.fetchFuentesAdmin();
   }
   else{
       this.fetchFuentes();
   }
 }
  MostrarFuentes(fuente){
     var span_favorite,div_dislike;
     var nombre_fuente = fuente.name;
     if(this.props.user.permissions[0].group==='admin'){
       div_dislike =  <div className="div-thumbs-down">
                     <span className="glyphicon glyphicon-thumbs-down"></span>
                     <p className="dislikes_count">{fuente.down_votes}</p>
                     </div>;
     }
     if(nombre_fuente.length>70){
        nombre_fuente = nombre_fuente.substring(0, 70) + "...";
     }
     if(fuente.favorite){
       span_favorite =   <span className="glyphicon glyphicon-star active" onClick = {(event)=> {this.HandleDesmarcarFavorita(event,fuente)}}></span>
     }
     else {
        span_favorite =   <span className="glyphicon glyphicon-star" onClick = {(event)=> {this.HandleMarcarFavorita(event,fuente)}}></span>
     }
      return(
          <div key = {fuente.id} className="Div-Fuente">
          {span_favorite}
          {div_dislike}
          <h4 className="nombre-fuente">{nombre_fuente}</h4>
          <p className="url-fuente">{fuente.site}</p>
          </div>
      );
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
        var fuentes = this.state.fuentes;
        return (
          <div className="ContenidoVistaFuentes">
            <h3 id ="subtitulo-vista">Fuentes</h3>
            <div className = "wrap_fuentes margin-top">
            {fuentes.map((fuente,i,arr) => (
             this.MostrarFuentes(fuente)
            ))}
             </div>
            </div>
        );
    }
  }
}

export default Fuentes;
