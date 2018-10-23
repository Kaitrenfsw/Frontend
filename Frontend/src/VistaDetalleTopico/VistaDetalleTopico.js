import React, { Component } from 'react'
import SeccionGraficos from './SeccionGraficos';
import left_icon from '../Assets/left.png';
import './VistaDetalleTopico.css';
import SeccionNoticias from './SeccionNoticias';
import { NavLink } from 'react-router-dom';
import TopicGraph from '../Graficos/TopicGraph';
import ReactTooltip from 'react-tooltip';

class VistaDetalleTopico extends Component{


        state = {
          isLoading: true,
          dataGrafo: null,
          usrTopics: {},
          esta_suscrito: false
        }

    fetchTopicosUsuario(){
          fetch("http://localhost:4000/api/topicUser/" + this.props.user.id)
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
             console.log('bad request');
           }
         })
         .catch(function(error) {
           console.log('Hubo un problema con la petición Fetch:' + error.message);
         });
        }

    fetchGrafo(){
      const id = this.props.match.params.id;
      fetch("http://localhost:4000/api/visualizations/graph?topic_id=" + id)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
           var order_relations = [];
            /*

           for (var i = res.data.relations.length -1; i>=0;i--) {

             order_relations.push(res.data.relations[i]);
           }

           for (var i = 0; i<6;i++) {
             order_relations.push(res.data.relations[i]);
             order_relations.push(res.data.relations[res.data.relations.length-i-1]);
           }
          */
           order_relations.push(res.data.relations[0]);
           order_relations.push(res.data.relations[11]);
           order_relations.push(res.data.relations[3]);
           order_relations.push(res.data.relations[6]);
           order_relations.push(res.data.relations[1]);
           order_relations.push(res.data.relations[10]);
           order_relations.push(res.data.relations[4]);
           order_relations.push(res.data.relations[7]);
           order_relations.push(res.data.relations[2]);
           order_relations.push(res.data.relations[9]);
           order_relations.push(res.data.relations[5]);
           order_relations.push(res.data.relations[8]);


           res.data.relations  = order_relations;


           console.log(res.data);
           var GraphFormatData = {nodes:[], edges:[]}
           GraphFormatData.nodes.push({name:res.data.topic_name,"id":res.data.topic_id});
           for(var i=0; i<res.data.relations.length; i++){
              GraphFormatData.edges.push({"source":i + 1, "target":0, "value":res.data.relations[i].distance});
              GraphFormatData.nodes.push({name:res.data.relations[i].r_topic_name,  "id":res.data.relations[i].r_topic_id});
           }

           console.log( GraphFormatData)
           this.setState({dataGrafo:GraphFormatData});

         });

       } else {
         console.log('bad request');
       }
     })
     .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message);

     });

    }

      fetchDatosTopico(){
        /* Datos del topico    */
        const id = this.props.match.params.id;
        fetch("http://localhost:4000/api/topics/" + id)
       .then((response) => {
         if(response.ok) {
           response.json().then(data => ({
                 data: data,
                 status: response.status
             })
           ).then(res => {
             console.log(res.data);
             this.setState({topico:res.data});
             this.setState({isLoading:false});

           });

         } else {
           console.log('bad request');
         }
       })
       .catch(error => {
         console.log('Hubo un problema con la petición Fetch:' + error.message);
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
        console.log(newUsrTopics);
        fetch("http://localhost:4000/api/topicUser/"  + this.props.user.id , {
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
          fetch("http://localhost:4000/api/topicUser/" + this.props.user.id , {
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
            <div className="container-fluid ContenidoVistaDetalleTopico">
            <NavLink to='/topicos'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Temas</h5></NavLink>
             <h2  id="titulo-vista">{this.state.topico[0].name}</h2>
             {this.state.esta_suscrito && <a   onClick = {this.handleDesuscripcion.bind(this)}className="gradient-button gradient-button-2 unsub-button">Suscrito</a>}
             {!this.state.esta_suscrito && <a   onClick = {this.handleSubscripcion.bind(this)} className="gradient-button gradient-button-1 sub-button">Suscribirme</a>}
             <SeccionGraficos  key = {this.state.topico[0].id}  words = {this.state.topico[0].keyword_topic}/>
             <div className="col-lg-7 no-padding">
             <h4 id="subtitulo-vista">Últimos Artículos</h4>
              <SeccionNoticias key = {"topic" + this.state.topico[0].id} id = {this.state.topico[0].id} user = {this.props.user} search = {""}/>
             </div>
              <div className="col-lg-offset-1 col-lg-4 no-padding graph-div">
               <h4 id="subtitulo-vista">Temas relacionados <span data-tip data-for='LeyendaGrafo' className="glyphicon glyphicon-question-sign"></span></h4>
             <TopicGraph dataset={this.state.dataGrafo}  />
             </div>
             <ReactTooltip id='LeyendaGrafo' place='right' type = "light">
                <div className="box-text">
                  <div className='box green'></div> Relación muy fuerte</div><br/>
                <div className="box-text">
                  <div className='box orange'></div> Relación fuerte</div><br/>
                <div className="box-text">
                  <div className='box red'></div> Relación debíl
                </div>
              </ReactTooltip>
           </div>
          );
        }
        else {
          return(
            <div className="container-fluid ContenidoVistaDetalleTopico">
            <NavLink  to='/topicos'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Tópicos</h5></NavLink>
           </div>

          );
        }
  }
}
export default VistaDetalleTopico;
