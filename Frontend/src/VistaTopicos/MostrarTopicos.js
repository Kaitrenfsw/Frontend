import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


class MostrarTopicos extends Component{
  state = {
      topicos: [],
      usrTopics: [],
  };

  FormatoKeywords(data) {
    data.map((val, i, arr) => {
    const rowLen =   val.keyword_topic.length;
    val.keyword_topic = val.keyword_topic.map((val2,j,val)=> { if(j!== rowLen -1){
    return val2.name + ", ";}
    else{return val2.name;}});;});
    return data;
  }


  componentDidMount() {
      fetch('http://localhost:4000/api/topics/') /* http://10.6.42.104:4000/api/content*/
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
          });

        } else {
          console.log('bad request');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });


       fetch("http://localhost:4000/api/topicUser/" + this.props.user_id)
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            console.log(res.data);
            this.FormatoKeywords(res.data);
            this.setState({usrTopics:res.data});
            this.OrdenarTopicosUsr(this.props.orden);
          });

        } else {
          console.log('bad request');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
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
                <p className = "titulo-relacion">Coherencia</p>
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
                <p className = "titulo-relacion">Coherencia</p>
                <h5 className={ClaseRelacion}>{TextoRelacion}</h5>
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
    if(orden ==='Nombre'){
        var topicos_ordenados = topicos.sort(this.OrdenarNombre);
        this.setState({
          topicos: topicos_ordenados
        });
        return topicos_ordenados;
    }
    if(orden ==='Coherencia'){
        var topicos_ordenados = topicos.sort(this.OrdenarCoherencia);
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
    if(orden ==='Nombre'){
        var topicos_ordenados = topicos.sort(this.OrdenarNombre);
        this.setState({
          usrTopics: topicos_ordenados
        });
        return topicos_ordenados;
    }
    if(orden ==='Coherencia'){
        var topicos_ordenados = topicos.sort(this.OrdenarCoherencia);
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
    const id_topico = target.name;
    var newUsrTopics=[];
    newUsrTopics.push(id_topico)
    for(var i=0;i<UsrTopics.length;i++){
      newUsrTopics.push(UsrTopics[i].id)
    }
    for(i=0;i<topicos.length;i++){
      if(String(topicos[i].id) === id_topico){
        UsrTopics.push(topicos[i])
      }
    }
    this.setState({
            usrTopics: UsrTopics
    });
    fetch("http://localhost:4000/api/topicUser/"  + this.props.user_id , {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user_id': 1,
        'user_topics_id':newUsrTopics
      })
    })
}




    handleDesuscripcion(event){
      const UsrTopics = this.state.usrTopics;
      const target = event.target;
      const id_topico = target.name;
      var newUsrTopicsID = [];
      for(var i=0;i<UsrTopics.length;i++){
        if(id_topico === String(UsrTopics[i].id)){
          UsrTopics.splice(i, 1);
        }
      }
      for(i=0;i<UsrTopics.length;i++){
        newUsrTopicsID.push(UsrTopics[i].id);
      }
      this.setState({
              usrTopics: UsrTopics
      });
      fetch("http://localhost:4000/api/topicUser/" + this.props.user_id , {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'user_id': 1,
          'user_topics_id': newUsrTopicsID
      })
     });
  }


  render(){
  	var activo = this.props.activo;
    var search = this.props.search;
    var topicos = this.state.topicos;
    var usrTopics = this.state.usrTopics;
    if(activo === "Explorar tópicos"){
      return (
        <div >
           {topicos.map((topico,i,arr) => (
            this.DesplegarTopicosExplorar(topico,search)
          ))}
        </div>
      );
    }
    else if(activo === "Mis tópicos"){
      return (
        <div>
        {usrTopics.map((topico,i,arr) => (
         this.DesplegarMisTopicos(topico,search)
        ))}
        </div>
      );
    }

  }
}

export default MostrarTopicos;
