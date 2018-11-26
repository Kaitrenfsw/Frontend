import React, { Component } from 'react';
import config from '../config.js';
class SeccionNoticias extends Component{

  state = {
      search: "",
      orden: "Nombre",
      isLoading: false,
      noticias: []
  };




    DesplegarNoticia(noticia,search){
      return(

      <div className="Div-Articulo" key = {""+ noticia.id}>
      <div className="row">
      <div className="col-sm-3 no-padding-left">
      <img alt = {noticia.title} className= "imagen-articulo" src={noticia.main_image} />
      </div>
      <div className="col-sm-9 no-padding">
      <a href = {noticia.url}><h4 className="titulo-articulo">{noticia.title}</h4></a>
      <p className="resumen-articulo">{noticia.summary}</p>
      </div>
      </div>
      </div>);
    }


      componentDidMount() {
               fetch("http://"+ config.base_url + ":" + config.port + "/api/relevant_suggestions?topic_id=" + this.props.id, {
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
                     this.setState({noticias:res.data,isLoading:false});

                   });

                 } else {
                 }
               })
               .catch(function(error) {
               });
           }


  HandleSearch(event) {
    if (true) {
       const target = event.target;
       const valor_busqueda = target.value;
       this.setState({search: valor_busqueda});
    }

  }
  HandleOrden(event,valor) {
       if(this.state.orden !== valor){
          this.setState({ orden: valor });
       }
   }


  render(){

    if(!(this.state.isLoading)){
      return(
        <div >
        <div className="margin-top">
      {this.state.noticias.map((noticia,i,arr) => (
       this.DesplegarNoticia(noticia,this.props.search)
     ))}  </div> </div>);
    }
    else{



    return (

        <div >

        </div>

    );}
  }
}

export default SeccionNoticias;
