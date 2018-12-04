import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import config from '../config.js';


class MostrarTopicos extends Component{
  state = {
      topicos: [],
      usrTopics: [],
      isLoading:true,
  };

  FormatoKeywords(data) {
    data.map((val, i, arr) => {
      const rowLen =   val.keyword_topic.length;
      val.keyword_topic = val.keyword_topic.map((val2,j,val)=> {
        if(j!== rowLen -1){
          return val2.name + ", ";}
        else{
          return val2.name;
        }
      });
      return null;//para evitar el warning, no se usa para nada
    });
    return data;
  }


  componentDidMount() {
      fetch('http://' + config.base_url + ':' + config.port + '/api/topics/') /* http://10.6.42.104:4000/api/content*/
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            this.FormatoKeywords(res.data);
            this.setState({topicos:res.data})
            this.OrdenarTopicos(this.props.orden);
            this.setState({isLoading:false})
          });

        } else {
        }
      })
      .catch(function(error) {
      });


       fetch("http://"+ config.base_url +":" + config.port + "/api/topicUser/" + this.props.user_id)
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            this.FormatoKeywords(res.data);
            this.setState({usrTopics:res.data});
            this.OrdenarTopicosUsr(this.props.orden);
          });

        } else {
        }
      })
      .catch(function(error) {
      });


  }


  DesplegarMisTopicos(topico,search){
    var ClaseRelacion,TextoRelacion,nombre_topico;
    if(topico.coherence >= 0.75){ClaseRelacion = "relacion-mf";TextoRelacion = "Muy Fuerte";}
    else if(topico.coherence >= 0.50) {ClaseRelacion = "relacion-f";TextoRelacion = "Fuerte";}
    else if(topico.coherence >= 0.25){ClaseRelacion = "relacion-d";TextoRelacion = "Debíl";}
    else if(topico.coherence >= 0.0){ClaseRelacion = "relacion-md";TextoRelacion = "Muy Debíl";}
    if (String(topico.keyword_topic + " " + topico.name ).toLowerCase().includes(search.toString().toLowerCase())) {
      if(topico.name){nombre_topico =topico.name; }
      else{nombre_topico = "Unnamed"}
      return (
            <div key = {topico.id} className="row topico" >
              <div className= {"col-xs-1 div-relacion " + ClaseRelacion}>
                <p className = "coherencia">Coherencia</p>
                <h5 className={ClaseRelacion}>{TextoRelacion}</h5>
              </div>
              <div className="col-xs-11 div-keywords"  /*onClick={ (event) => this.props.HandleDetalleTopico(event,'SI',topico)}*/ >
                  <NavLink  to={{ pathname: '/topicos/'+topico.id, state: { foo: 'bar'} }} ><h4 className="nombre-topico">{nombre_topico}</h4></NavLink>
                <h5 className="keywords">{topico.keyword_topic}</h5>
                 <a  name={topico.id} onClick={this.handleDesuscripcion.bind(this)}  className="gradient-button gradient-button-2">Suscrito</a>
              </div>
              </div>
        )
    }
  }

  DesplegarTopicosExplorar(topico,search){
    var ClaseRelacion,TextoRelacion,nombre_topico,sub_button;
    if(topico.coherence >= 0.75){ClaseRelacion = "relacion-mf";TextoRelacion = "Muy Fuerte";}
    else if(topico.coherence >= 0.50) {ClaseRelacion = "relacion-f";TextoRelacion = "Fuerte";}
    else if(topico.coherence >= 0.25){ClaseRelacion = "relacion-d";TextoRelacion = "Debíl";}
    else if(topico.coherence >= 0.0){ClaseRelacion = "relacion-md";TextoRelacion = "Muy Debíl";}
    if (String(topico.keyword_topic + " " + topico.name ).toLowerCase().includes(search.toString().toLowerCase())) {
      var topicos_usuario = this.state.usrTopics;
      var EsTopicoDeUsuario = false;
      for(var i=0; i<topicos_usuario.length ; i++){
        if(topicos_usuario[i].id === topico.id){
            EsTopicoDeUsuario = true;
        }
      }
      if(topico.name){nombre_topico =topico.name; }
      else{nombre_topico = "Unnamed"}
      if(EsTopicoDeUsuario === true){sub_button =  <a  name={topico.id} onClick={this.handleDesuscripcion.bind(this)}  className="gradient-button gradient-button-2">Suscrito</a>}
      else {sub_button =  <a  name={topico.id} onClick={this.handleSubscripcion.bind(this)}  className="gradient-button gradient-button-1">Suscribirme</a> }
      return (
            <div key = {topico.id} className="row topico" >
              <div className= {"col-xs-1 div-relacion " + ClaseRelacion}>
                <p className = "coherencia">Coherencia</p>
                <h5 className={ClaseRelacion + " texto-clase-relacion"}>{TextoRelacion}</h5>
              </div>
              <div className="col-xs-11 div-keywords"  /*onClick={ (event) => this.props.HandleDetalleTopico(event,'SI',topico)}*/ >
                <NavLink  to={{ pathname: '/topicos/'+topico.id, state: { foo: 'bar'} }} ><h4 className="nombre-topico">{nombre_topico}</h4></NavLink>
                <h5 className="keywords">{topico.keyword_topic}</h5>
                 {sub_button}
              </div>
              </div>
        )
      }
  }

  OrdenarTopicos(orden) {
    var topicos = this.state.topicos;
    var topicos_ordenados;
    if(orden ==='Nombre'){
        topicos_ordenados = topicos.sort(this.OrdenarNombre);
        this.setState({
          topicos: topicos_ordenados
        });
        return topicos_ordenados;
    }
    if(orden ==='Coherencia'){
        topicos_ordenados = topicos.sort(this.OrdenarCoherencia);
        this.setState({
          topicos: topicos_ordenados
        });
        return topicos_ordenados;
    }
    else {
      return topicos;
    }
  }

  OrdenarTopicosUsr(orden) {
    var topicos = this.state.usrTopics;
    var topicos_ordenados;
    if(orden ==='Nombre'){
        topicos_ordenados = topicos.sort(this.OrdenarNombre);
        this.setState({
          usrTopics: topicos_ordenados
        });
        return topicos_ordenados;
    }
    if(orden ==='Coherencia'){
        topicos_ordenados = topicos.sort(this.OrdenarCoherencia);
        this.setState({
          usrTopics: topicos_ordenados
        });
        return topicos_ordenados;
    }
    else {
      return topicos;
    }
  }


  OrdenarNombre(a,b) {
    if(!a.name){
      return -1;
    }
    if(!b.name){
      return 1;
    }
    if(a.name && b.name){
      var nameA=a.name.toLowerCase();
      var nameB=b.name.toLowerCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    }
    return 1;
  }

  OrdenarCoherencia(a,b) {
      var nameA=a.coherence;
      var nameB=b.coherence;
      if (nameA > nameB)
        return -1;
      if (nameA < nameB)
        return 1;
      return 0;
  }

  componentDidUpdate(prevProps,prevState){
    if (prevProps.orden !== this.props.orden) {
        this.OrdenarTopicos(this.props.orden);
        this.OrdenarTopicosUsr(this.props.orden);
    }
  }



  handleSubscripcion(event){
    const UsrTopics = this.state.usrTopics;
    var topicos = this.state.topicos;
    const target = event.target;
    const id_topico = parseInt(target.name,10);
    var newUsrTopics=[];
    newUsrTopics.push(id_topico)
    for(var i=0;i<UsrTopics.length;i++){
      newUsrTopics.push(UsrTopics[i].id)
    }
    for(i=0;i<topicos.length;i++){
      if(topicos[i].id === id_topico){
        UsrTopics.push(topicos[i])
      }
    }
    this.setState({
            usrTopics: UsrTopics
    });
    fetch("http://" + config.base_url +":" + config.port + "/api/topicUser/"  + this.props.user_id , {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user_id': this.props.user_id,
        'user_topics_id':newUsrTopics
      })
    })
}




    handleDesuscripcion(event){
      const UsrTopics = this.state.usrTopics;
      const target = event.target;
      const id_topico =  parseInt(target.name,10);
      var newUsrTopicsID = [];
      for(var i=0;i<UsrTopics.length;i++){
        if(id_topico === UsrTopics[i].id){
          UsrTopics.splice(i, 1);
        }
      }
      for(i=0;i<UsrTopics.length;i++){
        newUsrTopicsID.push(UsrTopics[i].id);
      }
      this.setState({
              usrTopics: UsrTopics
      });
      fetch("http://"+ config.base_url +":" + config.port + "/api/topicUser/"  + this.props.user_id , {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'user_id': this.props.user_id,
          'user_topics_id':newUsrTopicsID
        })
      })
  }


  render(){
  	var activo = this.props.activo;
    var search = this.props.search
    var topicos = this.state.topicos;
    var usrTopics = this.state.usrTopics;
    if(!this.state.isLoading){
      if(activo === "Explorar temas"){
        return (
          <div className = "animated fadeIn" >
             {topicos.map((topico,i,arr) => (
              this.DesplegarTopicosExplorar(topico,search)
            ))}
          </div>
        );
      }
      else if(activo === "Mis temas"){
        return (
          <div  className = "animated fadeIn">
          {usrTopics.map((topico,i,arr) => (
           this.DesplegarMisTopicos(topico,search)
          ))}
          </div>
        );
      }
    }
    if(this.state.isLoading){
      return(<div className="loader loader--style2" title="Loading">
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

export default MostrarTopicos;
