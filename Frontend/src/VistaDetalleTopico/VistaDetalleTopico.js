import React, { Component } from 'react'
import SeccionGraficos from './SeccionGraficos';
import left_icon from '../Assets/left.png';
import './VistaDetalleTopico.css';
import SeccionNoticias from './SeccionNoticias';
import { NavLink } from 'react-router-dom';

class VistaDetalleTopico extends Component{

        constructor(props) {
          super(props);

        }
        state = {
          isLoading: true,
          topico: [{"topic_number":0,"name":"Intellectual Property","lda_model_id":1,"keyword_topic":[{"weight":0.006105635,"name":"construction"},{"weight":0.006110269,"name":"part"},{"weight":0.0066658333,"name":"apartment"},{"weight":0.006686434,"name":"iframe"},{"weight":0.0067748833,"name":"inventor"},{"weight":0.006790273,"name":"hide"},{"weight":0.006862035,"name":"invention"},{"weight":0.0072247386,"name":"technology"},{"weight":0.007294088,"name":"golf"},{"weight":0.0076705287,"name":"florida"},{"weight":0.008148297,"name":"auction"},{"weight":0.008215456,"name":"clark"},{"weight":0.008363012,"name":"house"},{"weight":0.008601813,"name":"new"},{"weight":0.009923795,"name":"build"},{"weight":0.010949316,"name":"world"},{"weight":0.012068741,"name":"alloy"},{"weight":0.013670656,"name":"intellectual"},{"weight":0.018407678,"name":"property"},{"weight":0.042790152,"name":"patent"}],"id":1,"coherence":0.77}]

        }



      componentDidMount() {
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







  render(){
          return (
            <div className="container-fluid ContenidoVistaDetalleTopico">
            <NavLink to='/topicos'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Tópicos</h5></NavLink>
             <h2 id="titulo-vista">{this.state.topico[0].name}</h2>
             <SeccionGraficos  key = {this.state.topico[0].id}  words = {this.state.topico[0].keyword_topic}/>
             <SeccionNoticias />
           </div>
          );
  }
}

export default VistaDetalleTopico;
