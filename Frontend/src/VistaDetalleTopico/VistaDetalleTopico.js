import React, { Component } from 'react'
import SeccionGraficos from './SeccionGraficos';
import left_icon from '../Assets/left.png';
import './VistaDetalleTopico.css';
import SeccionNoticias from './SeccionNoticias';
import { NavLink } from 'react-router-dom';
import TopicGraph from '../Graficos/TopicGraph';
import ReactTooltip from 'react-tooltip';
import config from '../config.js';

class VistaDetalleTopico extends Component{


        state = {
          isLoading: true,
          dataGrafo: null,
          usrTopics: {},
          esta_suscrito: false
        }

    fetchTopicosUsuario(){
          fetch("http://"  + config.base_url +  ":" + config.port + "/api/topicUser/" + this.props.user.id)
         .then((response) => {
           if(response.ok) {
             response.json().then(data => ({
                   data: data,
                   status: response.status
               })
             ).then(res => {
               var esta_suscrito = false;
               var topics_user= res.data;
               var id_topico = this.props.match.params.id ;

               for(var i= 0;i <topics_user.length;i++){
                 if(id_topico === "" + topics_user[i].id){
                   esta_suscrito = true;
                 }
               }

               this.setState({usrTopics:topics_user});
               this.setState({esta_suscrito:esta_suscrito});
             });

           } else {
           }
         })
         .catch(function(error) {
         });
        }

    fetchGrafo(){
      const id = this.props.match.params.id;
      fetch("http://" + config.base_url +  ":" + config.port + "/api/visualizations/graph?topic_id=" + id)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
           var GraphFormatData = {nodes:[], edges:[]}
           GraphFormatData.nodes.push({name:res.data.topic_name,"id":res.data.topic_id, "index":  0});
           for(var i=res.data.relations.length -1; i>=0; i--){
              GraphFormatData.edges.push({"source":i + 1, "target":0, "value": 1- res.data.relations[i].distance});
              GraphFormatData.nodes.push({name:res.data.relations[i].r_topic_name,  "id":res.data.relations[i].r_topic_id, "value": 1- res.data.relations[i].distance, "index": res.data.relations.length - i});
           }
           this.setState({dataGrafo:GraphFormatData});

         });

       } else {
       }
     })
     .catch(error => {
     });

    }

      fetchDatosTopico(){
        /* Datos del topico    */
        const id = this.props.match.params.id;
        fetch("http://" + config.base_url +  ":" + config.port + "/api/topics/" + id)
       .then((response) => {
         if(response.ok) {
           response.json().then(data => ({
                 data: data,
                 status: response.status
             })
           ).then(res => {
             this.setState({topico:res.data});
             this.setState({isLoading:false});

           });

         } else {
         }
       })
       .catch(error => {
          this.setState({isLoading:false});
       });
      }

      handleSubscripcion(){
        const UsrTopics = this.state.usrTopics;
        const id_topico = this.props.match.params.id;
        var newUsrTopics=[];
        newUsrTopics.push(id_topico)
        for(var i=0;i<UsrTopics.length;i++){
          newUsrTopics.push(UsrTopics[i].id)
        }
        this.setState({
                usrTopics: newUsrTopics,
                esta_suscrito: true
        });
        fetch("http://" + config.base_url + ":" + config.port + "/api/topicUser/"  + this.props.user.id , {
          method: "put",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'user_id': this.props.user.id,
            'user_topics_id':newUsrTopics
          })
        })
    }




        handleDesuscripcion(){
          const UsrTopics = this.state.usrTopics;
          const id_topico = this.props.match.params.id;
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
                  usrTopics: UsrTopics,
                  esta_suscrito: false
          });
          fetch("http://" + config.base_url +  ":" + config.port + "/api/topicUser/" + this.props.user.id , {
            method: "put",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'user_id': this.props.user.id,
              'user_topics_id': newUsrTopicsID
          })
         });
       }






      componentDidMount() {

           this.fetchTopicosUsuario();
           this.fetchGrafo();
           this.fetchDatosTopico();
        }






  render(){

          if(!(this.state.isLoading)){
          return (
            <div className="animated fadeIn  ContenidoVistaDetalleTopico">
            <NavLink to='/topicos'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Temas</h5></NavLink>
             <h2  className="titulo-vista no-margin-top" >{this.state.topico[0].name}</h2>
             {this.state.esta_suscrito && <a   onClick = {this.handleDesuscripcion.bind(this)}className="gradient-button gradient-button-2 unsub-button">Suscrito</a>}
             {!this.state.esta_suscrito && <a   onClick = {this.handleSubscripcion.bind(this)} className="gradient-button gradient-button-1 sub-button">Suscribirme</a>}
             <SeccionGraficos topicId={this.props.match.params.id} key = {this.state.topico[0].id}  words = {this.state.topico[0].keyword_topic}/>
            <div className="noticas-div">
             <h4 id="subtitulo-vista">Últimos Artículos</h4>
              <SeccionNoticias key = {"topic" + this.state.topico[0].id} id = {this.state.topico[0].id} user = {this.props.user} search = {""}/>
             </div>
              <div className="graph-div">
               <h4 id="subtitulo-vista">Temas relacionados <span data-tip data-for='LeyendaGrafo' className="glyphicon glyphicon-question-sign"></span></h4>
             <TopicGraph dataset={this.state.dataGrafo}  />
             </div>
             <ReactTooltip effect = "solid"  id='LeyendaGrafo' place='right'>
                <div className="box-text">
                  <div className='box green'></div> Relación fuerte</div><br/>
                <div className="box-text">
                  <div className='box orange'></div> Relación media</div><br/>
                <div className="box-text">
                  <div className='box red'></div> Relación debíl
                </div>
              </ReactTooltip>
           </div>
          );
        }
        else {
          return(
            <div className="animated fadeIn  ContenidoVistaDetalleTopico">
            <NavLink  to='/topicos'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Temas</h5></NavLink>
           </div>

          );
        }
  }
}
export default VistaDetalleTopico;
