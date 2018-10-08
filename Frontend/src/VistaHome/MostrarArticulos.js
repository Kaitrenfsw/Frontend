import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
/*
import left_guardar from '../Assets/left-guardar.png';
import right_guardar from '../Assets/right-guardar.png';
*/


class MostrarArticulos extends Component{


  state = {
      isLoading: true,
      index: 0,
      hasMore: true
  }




    componentDidMount() {
             fetch("http://localhost:4000/api/suggestions", {
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
                   this.setState({recomendados_filtrados:res.data,isLoading:false,recomendados:res.data });
                 });

               } else {
                 console.log('bad request');
               }
             })
             .catch(function(error) {
               console.log('Hubo un problema con la petición Fetch:' + error.message);
             });
         }






  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs

    setTimeout(() => {
      if(this.state.index + 3 < this.state.recomendados_filtrados.length ){
          this.setState({index: this.state.index + 3});
      }
      else if(this.state.index  === this.state.recomendados_filtrados.length ){
        this.setState({hasMore:false});
      }
      else{ this.setState({index: this.state.recomendados_filtrados.length}); }
      console.log(this.state.index);

    }, 1500);
  };


  componentDidUpdate(prevProps,prevState){
    if (prevProps.orden !== this.props.orden) {
        this.OrdenarArticulos(this.props.orden);
    }
    if (prevProps.search !== this.props.search) {
        this.FiltrarArticulos(this.props.search);
    }

    if (prevState.isLoading !== this.state.isLoading) {
      if(!(this.state.isLoading)){
        this.OrdenarArticulos(this.props.orden);
        if(this.state.recomendados_filtrados.length > 9){
          this.setState({index: 9, hasMore:true});
        }
        else{
            this.setState({index: this.state.recomendados_filtrados.length, hasMore:false});
        }
      }
    }
  }


  OrdenarArticulos(orden) {
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

  FiltrarArticulos(search) {
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
  }



  /**/
  Desplegar(grupo_articulos){
    var topico1,topico2,topico3,articulo_1,articulo_2,articulo_3;
    if (grupo_articulos.length >= 1){
      if(grupo_articulos[0].topics[0]) topico1 =   <div className="Div-Topico Blue"><h5>{grupo_articulos[0].topics[0].topic_name}</h5></div>
      if(grupo_articulos[0].topics[1]) topico2 = <div className="Div-Topico Green"><h5>{grupo_articulos[0].topics[1].topic_name}</h5></div>
      if(grupo_articulos[0].topics[2]) topico3 = <div className="Div-Topico Orange"><h5>{grupo_articulos[0].topics[2].topic_name}</h5></div>
            articulo_1 =  <div className="col-md-4 col-izq">
            <div className="Div-Articulo">
            <img src={grupo_articulos[0].main_image} alt={grupo_articulos[0].source_name} />
            {topico1}
            {topico2}
            {topico3}
            <a href = {grupo_articulos[0].url} ><h4 className="titulo-articulo">{grupo_articulos[0].title}</h4></a>
            <a href = {grupo_articulos[0].url} ><h5 className="fuente-articulo">Fuente: {grupo_articulos[0].source_name}</h5></a>
            <div className="div-resumen">
            <p className="resumen-articulo">{grupo_articulos[0].summary.substring(0, 150)}</p>
            </div>
            </div>
          </div>

    }
    if (grupo_articulos.length >= 2){

      if(grupo_articulos[1].topics[0]) topico1 =   <div className="Div-Topico Blue"><h5>{grupo_articulos[1].topics[0].topic_name}</h5></div>
      if(grupo_articulos[1].topics[1]) topico2 = <div className="Div-Topico Green"><h5>{grupo_articulos[1].topics[1].topic_name}</h5></div>
      if(grupo_articulos[1].topics[2]) topico3 = <div className="Div-Topico Orange"><h5>{grupo_articulos[1].topics[2].topic_name}</h5></div>
            articulo_2 =  <div className="col-md-4">
            <div className="Div-Articulo">
            <img src={grupo_articulos[1].main_image} alt={grupo_articulos[1].source_name} />
            {topico1}
            {topico2}
            {topico3}
            <a href = {grupo_articulos[1].url} ><h4 className="titulo-articulo">{grupo_articulos[1].title}</h4></a>
            <a href = {grupo_articulos[1].url} ><h5 className="fuente-articulo">Fuente: {grupo_articulos[1].source_name}</h5></a>
            <div className="div-resumen">
            <p className="resumen-articulo">{grupo_articulos[1].summary.substring(0, 150)}</p>
            </div>
            </div>
          </div>

    }


    if (grupo_articulos.length === 3){


      if(grupo_articulos[2].topics[0]) topico1 =   <div className="Div-Topico Blue"><h5>{grupo_articulos[2].topics[0].topic_name}</h5></div>
      if(grupo_articulos[2].topics[1]) topico2 = <div className="Div-Topico Green"><h5>{grupo_articulos[2].topics[1].topic_name}</h5></div>
      if(grupo_articulos[2].topics[2]) topico3 = <div className="Div-Topico Orange"><h5>{grupo_articulos[2].topics[2].topic_name}</h5></div>
            articulo_3 =  <div className="col-md-4 col-der">
            <div className="Div-Articulo">
            <img src={grupo_articulos[2].main_image} alt={grupo_articulos[2].source_name} />
            {topico1}
            {topico2}
            {topico3}
            <a href = {grupo_articulos[2].url} ><h4 className="titulo-articulo">{grupo_articulos[2].title}</h4></a>
            <a href = {grupo_articulos[2].url} ><h5 className="fuente-articulo">Fuente: {grupo_articulos[2].source_name}</h5></a>
            <div className="div-resumen">
            <p className="resumen-articulo">{grupo_articulos[2].summary.substring(0, 150)}</p>
            </div>
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

    if(!(this.state.isLoading)){

      var activo = this.props.activo;
      var recomendados = this.state.recomendados_filtrados;
      if(activo === 'Recomendados'){
        var groups = [];
        for(var i = 0; i < this.state.index; i += 3){
          groups.push(recomendados.slice(i, i+3))
        }
        var articulos =[];
        for (var j = 0; j< groups.length; j++){
            articulos.push(this.Desplegar(groups[j]))
        }
        return(

          <div className="ContenidoArticulos">
          <InfiniteScroll
           dataLength={articulos.length}
           next={this.fetchMoreData}
           hasMore={this.state.hasMore}
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
      if(activo === 'Guardados'){
        return(<div className="ContenidoArticulos"></div>);
      }

    }

    return(null);






  }
}

export default MostrarArticulos;
