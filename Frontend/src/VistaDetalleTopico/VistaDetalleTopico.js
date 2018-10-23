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
        }

    fetchGrafo(){
      const id = this.props.match.params.id;
      fetch("http://localhost:4000/api/related_topics?topic_id=" + id)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
           console.log(res.data);
           var GraphFormatData = {nodes:[], edges:[]}
           GraphFormatData.nodes.push({name:res.data.topic_name});
           for(var i=0; i<res.data.relations; i++){
              GraphFormatData.edges.push({"source":i + 1, "target":0, "value":res.data.relations[i].distance});
              GraphFormatData.nodes.push({name:res.data.relations[i].r_topic_name});
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






      componentDidMount() {


           this.fetchGrafo();
           this.fetchDatosTopico();
        }






  render(){

          if(!(this.state.isLoading)){
          return (
            <div className="container-fluid ContenidoVistaDetalleTopico">
            <NavLink to='/topicos'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Temas</h5></NavLink>
             <h2  id="titulo-vista">{this.state.topico[0].name}</h2>
             <SeccionGraficos  topicId={this.props.match.params.id} key = {this.state.topico[0].id}  words = {this.state.topico[0].keyword_topic}/>
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
