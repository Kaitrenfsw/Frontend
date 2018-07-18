import React, { Component } from 'react'





class MostrarTopicos extends Component{
  state = {
      topicos: [],
      usrTopics: [],
  };

  FormatoKeywords(data) {
    data.map((val, i, arr) => {
    val.keyword_topic = val.keyword_topic.map((val2,j,val)=> {
    return val2.name + ", ";});});
  }

  DesplegarTopico(topico,tipo) {
    const rand= Math.floor(Math.random() * 4); 
    var ClaseRelacion = "";
    var TextoRelacion = "";
    if(rand ===0){
      ClaseRelacion = "relacion-d";
      TextoRelacion = "Debíl";
    }
    if(rand ===1) {
      ClaseRelacion = "relacion-f";
      TextoRelacion = "Fuerte";
    }
    if(rand ===2){ 
      ClaseRelacion = "relacion-mf";
      TextoRelacion = "Muy Fuerte";
    }

    if(rand ===3){ 
      ClaseRelacion = "relacion-md";
      TextoRelacion = "Muy Debíl";
    }
    if (topico.name && tipo=== 0) {
      var todos_topicos = this.state.usrTopics;
      var EsTopicoDeUsuario = false;
      for(var i=0; i<todos_topicos.length ; i++){
        if(todos_topicos[i].name === topico.name){
            EsTopicoDeUsuario = true;
        }
      }
      if(EsTopicoDeUsuario === true){
         return (
          <div className="row topico">
            <div className= {"col-xs-1 relacion " + ClaseRelacion}>
              <p>Relación</p>
              <h5 className={ClaseRelacion}>{TextoRelacion}</h5>
            </div>
            <div className="col-xs-11 keywords">
              <h4>{topico.name}</h4>
              <h5>{topico.keyword_topic}</h5> 
               <a  name={topico.id} onClick={this.handleDesuscripcion.bind(this)}  className="gradient-button gradient-button-2">Desuscribirme</a>
            </div>
          </div>
        )
      }
      else{
        return (
          <div className="row topico">
          <div className= {"col-xs-1 relacion " + ClaseRelacion}>
            <p>Relación</p>
            <h5 className={ClaseRelacion}>{TextoRelacion}</h5>
          </div>
          <div className="col-xs-11 keywords">
            <h4>{topico.name}</h4>
            <h5>{topico.keyword_topic}</h5> 
             <a  name={topico.id} onClick={this.handleSubscripcion.bind(this)}  className="gradient-button gradient-button-1">Suscribirme</a>
          </div>
          </div>
        )

      }


    }


    if (topico.name && tipo=== 1) {



      return (
        <div className="row topico">
        <div className= {"col-xs-1 relacion " + ClaseRelacion}>
          <p>Relación</p>
          <h5 className={ClaseRelacion}>{TextoRelacion}</h5>
        </div>
        <div className="col-xs-11 keywords">
          <h4>{topico.name}</h4>
          <h5>{topico.keyword_topic}</h5> 
           <a  name={topico.id} onClick={this.handleDesuscripcion.bind(this)}  className="gradient-button gradient-button-2">Desuscribirme</a>
        </div>
      </div>
      )
    }

   
  }



  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/topic/');
      const topicos = await res.json();
      this.FormatoKeywords(topicos)
      this.setState({
        topicos
      });
       fetch("http://127.0.0.1:8000/topicUser/", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": 1
        })
      })
      .then( (usrRes) => {
        usrRes.json().then( (usrTopics)=>{
          this.FormatoKeywords(usrTopics)
          console.log(usrTopics);
          this.setState({
          usrTopics
          });
        })
      });

    } catch (e) {
      console.log(e);
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
      if(topicos[i].id == id_topico){
        UsrTopics.push(topicos[i])
      }
    } 
    this.setState({
            usrTopics: UsrTopics
    });
    fetch("http://127.0.0.1:8000/topicUser/", {
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
        if(id_topico == UsrTopics[i].id){
          UsrTopics.splice(i, 1);
        }
      } 
      for(i=0;i<UsrTopics.length;i++){
        newUsrTopicsID.push(UsrTopics[i].id);
      } 
   
      this.setState({
              usrTopics: UsrTopics
      });
      fetch("http://127.0.0.1:8000/topicUser/", {
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
    return ( 
      <div>
      {activo === 'EXPLORARTOPICOS' ?(
         this.state.topicos.map(topico => (
          this.DesplegarTopico(topico,0)
          ))
         ): activo === 'MISTOPICOS' ? (
          this.state.usrTopics.map(topico => (
          this.DesplegarTopico(topico,1)
          ))
      ) : null} 
      </div>
    );
  }
}

export default MostrarTopicos;