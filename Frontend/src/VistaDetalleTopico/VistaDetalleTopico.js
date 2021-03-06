import React, { Component } from 'react'
import SeccionGraficos from './SeccionGraficos';
import left_icon from '../Assets/left.png';
import './VistaDetalleTopico.css';
import SeccionNoticias from './SeccionNoticias';
import { NavLink } from 'react-router-dom';

class VistaDetalleTopico extends Component{


        state = {
          isLoading: true,
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
          if(!(this.state.isLoading)){
          return (
            <div className="container-fluid ContenidoVistaDetalleTopico">
            <NavLink to='/topicos'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Tópicos</h5></NavLink>
             <h2  id="titulo-vista">{this.state.topico[0].name}</h2>
             <SeccionGraficos  key = {this.state.topico[0].id}  words = {this.state.topico[0].keyword_topic}/>
             <SeccionNoticias key = {"topic" + this.state.topico[0].id} id = {this.state.topico[0].id} user = {this.props.user} search = {""}/>
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
