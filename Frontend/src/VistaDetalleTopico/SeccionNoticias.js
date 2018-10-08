import React, { Component } from 'react'
class SeccionNoticias extends Component{

  state = {
      search: "",
      orden: "Nombre",
      isLoading: true
  };
    DesplegarNoticia(noticia,search){
      return(

      <div className="Div-Articulo">
      <div className="row">
      <div className="col-sm-2 no-padding-left">
      <img alt = {noticia.title} className= "imagen-articulo" src={noticia.main_image} />
      </div>
      <div className="col-sm-10 no-padding">
      <a href = {noticia.url}><h4 className="titulo-articulo">{noticia.title}</h4></a>
      <p className="resumen-articulo">{noticia.summary}</p>
      </div>
      </div>
      </div>);
    }


      componentDidMount() {
               fetch("http://localhost:4000/api/relevant_suggestions?topic_id=" + this.props.id, {
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
                     console.log(res.data,res.status)
                     this.setState({noticias:res.data,isLoading:false});

                   });

                 } else {
                   console.log('bad request');
                 }
               })
               .catch(function(error) {
                 console.log('Hubo un problema con la petición Fetch:' + error.message);
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
       console.log(valor);
       if(this.state.orden !== valor){
          this.setState({ orden: valor });
       }
   }


  render(){

    if(!(this.state.isLoading)){
      return(
        <div >
        <h4 id="subtitulo-vista-noticias">Últimos artículos</h4>
        <div className="margin-top">
      {this.state.noticias.map((noticia,i,arr) => (
       this.DesplegarNoticia(noticia,this.props.search)
     ))}  </div> </div>);
    }
    else{



    return (

        <div >
        <h4 id="subtitulo-vista-noticias">Últimos artículos</h4>
        </div>

    );}
  }
}

export default SeccionNoticias;
