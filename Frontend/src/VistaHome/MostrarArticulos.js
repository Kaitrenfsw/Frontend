import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import config from '../config.js';
/*
import left_guardar from '../Assets/left-guardar.png';
import right_guardar from '../Assets/right-guardar.png';
*/


class MostrarArticulos extends Component{


  state = {
      isLoadingRecomendados: true,
      isLoadingGuardados: true,
      indexRecomendados: 0,
      indexGuardados: 0,
      hasMoreRecomendados: true,
      hasMoreGuardados: true
  }
  fetchNoticiasRecomendadas(){
    fetch("http://" + config.base_url + ":" + config.port + "/api/suggestions", {
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
          for(var i = 0; i<res.data.length;i++){
            res.data[i].index_lista_recomendados = i;
          }
          this.setState({recomendados_filtrados:res.data,isLoadingRecomendados:false,recomendados:res.data });
          this.OrdenarArticulosRecomendados(this.props.orden);
          if(this.state.recomendados_filtrados.length > 15){
            this.setState({indexRecomendados: 15, hasMoreRecomendados:true});
          }
          else{
              this.setState({indexRecomendados: this.state.recomendados_filtrados.length, hasMoreRecomendados:false});
          }
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }
  fetchNoticiasGuardadas(){
    fetch("http://" + config.base_url + ":" + config.port + "/api/saved_news", {
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
          this.setState({guardados_filtrados:res.data,isLoadingGuardados:false,guardados:res.data });
          this.OrdenarArticulosGuardados(this.props.orden);
          if(this.state.guardados_filtrados.length > 15){
            this.setState({indexGuardados: 15, hasMoreGuardados:true});
          }
          else{
              this.setState({indexGuardados: this.state.guardados_filtrados.length, hasMoreGuardados:false});
          }
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }

  HandleGuardarNoticia(event,noticia,i){
   var recomendados_filtrados = this.state.recomendados_filtrados;
   var recomendados = this.state.recomendados;
   recomendados[noticia.index_lista_recomendados].saved = 1;
   recomendados_filtrados[i].saved = 1;
   this.setState({isLoadingGuardados:true, recomendados_filtrados});
   fetch("http://"+ config.base_url +":" + config.port + "/api/create_content_user" , {
     method: "post",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       'user_id': this.props.user.id,
       'content_id':noticia.id,
     })
   }).then((response) => {
       if(response.ok) {
         this.fetchNoticiasGuardadas();
       } else {
       }
     })
     .catch(function(error) {
     });
 }

 HandleRemoverGuardado(event,id){
  var guardadas = this.state.guardados;
  for(var i=0; i<guardadas.length;i++){
    if(id === guardadas[i].id){
      guardadas.splice(i, 1);
      this.setState({guardadas});
      this.FiltrarArticulosGuardados();
    }
  }
  fetch("http://"+ config.base_url +":" + config.port + "/api/remove_content_user" , {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user_id': this.props.user.id,
      'content_id':id,
    })
  });
}






    componentDidMount() {
             this.fetchNoticiasRecomendadas();
             this.fetchNoticiasGuardadas();
         }






  fetchMoreDataRecomendados = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs

    setTimeout(() => {
      if(this.state.indexRecomendados + 3 < this.state.recomendados_filtrados.length ){
          this.setState({indexRecomendados: this.state.indexRecomendados + 3});
      }
      else if(this.state.indexRecomendados  === this.state.recomendados_filtrados.length ){
        this.setState({hasMoreRecomendados:false});
      }
      else{ this.setState({indexRecomendados: this.state.recomendados_filtrados.length}); }
    }, 1500);
  };



    fetchMoreDataGuardados = () => {
      // a fake async api call like which sends
      // 20 more records in 1.5 secs
      setTimeout(() => {
        if(this.state.indexGuardados + 3 < this.state.guardados_filtrados.length ){
            this.setState({indexGuardados: this.state.indexGuardados + 3});
        }
        else if(this.state.indexGuardados  === this.state.guardados_filtrados.length ){
          this.setState({hasMoreGuardados:false});
        }
        else{ this.setState({indexGuardados: this.state.guardados_filtrados.length}); }
      }, 1500);
    };



  componentDidUpdate(prevProps,prevState){
    if (prevProps.orden !== this.props.orden) {
        if(this.props.activo === 'Recomendados'){this.OrdenarArticulosRecomendados(this.props.orden);}
        if(this.props.activo === 'Guardados'){this.OrdenarArticulosGuardados(this.props.orden);}
    }
    if (prevProps.search !== this.props.search) {
       if(this.props.activo === 'Recomendados'){this.FiltrarArticulosRecomendados(this.props.search);}
       if(this.props.activo === 'Guardados'){this.FiltrarArticulosGuardados(this.props.search);}
    }
  }


  OrdenarArticulosRecomendados(orden) {
    var recomendados_filtrados = this.state.recomendados_filtrados;
    var recomendados_ordenados;
    if(orden ==='Fuentes'){
        recomendados_ordenados = recomendados_filtrados.sort(this.OrdenarFuente);
        this.setState({
          recomendados_filtrados: recomendados_ordenados
        });
        return recomendados_ordenados;
    }
    if(orden ==='Fecha'){
        recomendados_ordenados = recomendados_filtrados.sort(this.OrdenarFecha);
        this.setState({
          recomendados_filtrados: recomendados_ordenados
        });
        return recomendados_ordenados;
    }
    else {
      return recomendados_filtrados;
    }
  }

  OrdenarArticulosGuardados(orden) {
    var guardados_filtrados = this.state.guardados_filtrados;
    var guardados_ordenados;
    if(orden ==='Fuentes'){
        guardados_ordenados = guardados_filtrados.sort(this.OrdenarFuente);
        this.setState({
          guardados_filtrados: guardados_ordenados
        });
        return guardados_ordenados;
    }
    if(orden ==='Fecha'){
        guardados_ordenados = guardados_filtrados.sort(this.OrdenarFecha);
        this.setState({
          guardados_filtrados: guardados_ordenados
        });
        return guardados_ordenados;
    }
    else {
      return guardados_filtrados;
    }
  }

  OrdenarFuente(a,b) {
      var nameA=a.source_name.toLowerCase();
      var nameB=b.source_name.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
  }

  OrdenarFecha(a,b) {
      var nameA=a.published;
      var nameB=b.published;
      if (nameA < nameB)
        return 1;
      if (nameA > nameB)
        return -1;
      return 0;
  }

  FiltrarArticulosRecomendados(search) {
    var recomendados_filtrados = this.state.recomendados.filter(function (el) {
      var bool = false;
      for(var i=0;i<el.topics.length;i++){
        if(i<3){
        if(String(el.topics[i].topic_name).toLowerCase().includes(search.toString().toLowerCase())) {
          bool = true;
        }}
      }
      if(String(el.source_name).toLowerCase().includes(search.toString().toLowerCase())) { bool = true}
      if(String(el.title).toLowerCase().includes(search.toString().toLowerCase())) { bool = true}
      return bool;
    });
    this.setState({recomendados_filtrados:recomendados_filtrados});
    if(this.state.recomendados_filtrados.length > 15){
      this.setState({indexRecomendados: 15, hasMoreRecomendados:true});
    }
    else{
        this.setState({indexRecomendados: this.state.recomendados_filtrados.length, hasMoreRecomendados:false});
    }
  }

  FiltrarArticulosGuardados(search) {
    var guardados_filtrados = this.state.guardados.filter(function (el) {
      var bool = false;
      for(var i=0;i<el.topics.length;i++){
        if(i<3){
        if(String(el.topics[i].topic_name).toLowerCase().includes(search.toString().toLowerCase())) {
          bool = true;
        }}
      }
      if(String(el.source_name).toLowerCase().includes(search.toString().toLowerCase())) { bool = true}
      if(String(el.title).toLowerCase().includes(search.toString().toLowerCase())) { bool = true}
      return bool;
    });
    this.setState({guardados_filtrados:guardados_filtrados});
    if(this.state.guardados_filtrados.length > 15){
      this.setState({indexGuardados: 15, hasMoreGuardados:true});
    }
    else{
        this.setState({indexGuardados: this.state.guardados_filtrados.length, hasMoreGuardados:false});
    }
  }



  /**/
  DesplegarGuardados(articulo,i){
    var topico1,topico2,topico3;
      if(articulo.topics[0]) topico1 =   <div className="Div-Topico Blue"><h5>{articulo.topics[0].topic_name}</h5></div>
      if(articulo.topics[1]) topico2 = <div className="Div-Topico Green"><h5>{articulo.topics[1].topic_name}</h5></div>
      if(articulo.topics[2]) topico3 = <div className="Div-Topico Orange"><h5>{articulo.topics[2].topic_name}</h5></div>
            return(
            <div key = {articulo.id} className="Div-Articulo">
            <div className="botones">
             <span className="glyphicon glyphicon glyphicon-bookmark active"  onClick= { (event) => this.HandleRemoverGuardado(event,articulo.id)}></span>
             <span className="glyphicon glyphicon-thumbs-up"></span>
             <span className="glyphicon glyphicon-thumbs-down"></span>
            </div>
            <div className="div-image">
            <img src={articulo.main_image} alt={articulo.source_name} />
            </div>
            <div className="wrap-topicos">
            {topico1}
            {topico2}
            {topico3}
            </div>
            <a href = {articulo.url} ><h4 className="titulo-articulo">{articulo.title}</h4></a>
            <a href = {articulo.url} ><h5 className="fuente-articulo">Fuente: {articulo.source_name}</h5></a>
            <div className="div-resumen">
            <p className="resumen-articulo">{articulo.summary.substring(0, 150)}</p>
            </div>
          </div>);



  }

  DesplegarRecomendados(articulo,i){
    var topico1,topico2,topico3,span_guardar;
    if(articulo.saved){
        span_guardar =  <span className="glyphicon glyphicon glyphicon-bookmark active"  onClick= { (event) => this.HandleRemoverGuardado(event,articulo.id)}></span>
    }
    else {
        span_guardar =  <span className="glyphicon glyphicon glyphicon-bookmark"  onClick= { (event) => this.HandleGuardarNoticia(event,articulo,i)}></span>
    }
    if(articulo.topics[0]) topico1 =   <div className="Div-Topico Blue"><h5>{articulo.topics[0].topic_name}</h5></div>
    if(articulo.topics[1]) topico2 = <div className="Div-Topico Green"><h5>{articulo.topics[1].topic_name}</h5></div>
    if(articulo.topics[2]) topico3 = <div className="Div-Topico Orange"><h5>{articulo.topics[2].topic_name}</h5></div>
    return(
            <div key = {articulo.id} className="Div-Articulo">
            <div className="botones">
             {span_guardar}
             <span className="glyphicon glyphicon-thumbs-up"></span>
             <span className="glyphicon glyphicon-thumbs-down"></span>
            </div>
            <div className="div-image">
            <img src={articulo.main_image} alt={articulo.source_name} />
            </div>
            <div className="wrap-topicos">
            {topico1}
            {topico2}
            {topico3}
            </div>
            <a href = {articulo.url} ><h4 className="titulo-articulo">{articulo.title}</h4></a>
            <a href = {articulo.url} ><h5 className="fuente-articulo">Fuente: {articulo.source_name}</h5></a>
            <div className="div-resumen">
            <p className="resumen-articulo">{articulo.summary.substring(0, 150)}</p>
            </div>

          </div>);
  }


  render(){
    var articulos =[];
    var i;
    var activo = this.props.activo;
    if(activo === 'Recomendados'){
        if(!(this.state.isLoadingRecomendados)){
        var recomendados = this.state.recomendados_filtrados;
        for(i = 0; i < this.state.indexRecomendados; i++){
          articulos.push(this.DesplegarRecomendados(recomendados[i],i));
        }
        return(
          <div className="ContenidoArticulos">
          <InfiniteScroll
           dataLength={articulos.length}
           next={this.fetchMoreDataRecomendados}
           hasMore={this.state.hasMoreRecomendados}
           loader={<h1 className="texto-cargando">...</h1>}
         >
           {articulos.map((i, index) => (
             <div  key={index}>
              {i}
             </div>
           ))}
         </InfiniteScroll>
         </div>
      );
      }
      else{
          return(<div className="loader loader--style2" title="1">
          <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="12.5em" height="12.5em" viewBox="0 0 50 50"  xmlSpace="preserve">
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
        </div>);
      }
    }
      if(activo === 'Guardados'){
        if(!(this.state.isLoadingGuardados)){
          var guardados = this.state.recomendados_filtrados;
          for(i = 0; i < this.state.indexGuardados; i++){
            articulos.push(this.DesplegarGuardados(guardados[i],i));
          }
          return(
            <div className="ContenidoArticulos">
            <InfiniteScroll
             dataLength={articulos.length}
             next={this.fetchMoreDataGuardados}
             hasMore={this.state.hasMoreGuardados}
             loader={<h1 className="texto-cargando">...</h1>}
           >
             {articulos.map((i, index) => (
               <div  key={index}>
                {i}
               </div>
             ))}
           </InfiniteScroll>
           </div>
        );
      }
      else{
          return(<div className="loader loader--style2" title="1">
          <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="12.5em" height="12.5em" viewBox="0 0 50 50"  xmlSpace="preserve">
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
        </div>);
      }
    }
  }
}

export default MostrarArticulos;
