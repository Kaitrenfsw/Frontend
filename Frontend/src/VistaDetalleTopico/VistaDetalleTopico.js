import React, { Component } from 'react'
import SeccionGraficos from './SeccionGraficos';
import left_icon from '../Assets/left.png';
import './VistaDetalleTopico.css';
import SeccionNoticias from './SeccionNoticias';
import { NavLink } from 'react-router-dom';
class VistaDetalleTopico extends Component{



  render(){

   var topico = 
    {
        "id": 40,
        "name": "Networking",
        "topic_number": 39,
        "lda_model_id": 1,
        "coherence": 0.97,
        "keyword_topic": [
            {
                "name": "world",
                "weight": 0.0059408336
            },
            {
                "name": "information",
                "weight": 0.0060596373
            },
            {
                "name": "connectivity",
                "weight": 0.0061918683
            },
            {
                "name": "infrastructure",
                "weight": 0.0063447617
            },
            {
                "name": "global",
                "weight": 0.0068480433
            },
            {
                "name": "business",
                "weight": 0.0069620954
            },
            {
                "name": "company",
                "weight": 0.00807233
            },
            {
                "name": "iot",
                "weight": 0.008898708
            },
            {
                "name": "data",
                "weight": 0.00961595
            },
            {
                "name": "devices",
                "weight": 0.009924618
            },
            {
                "name": "technology",
                "weight": 0.011052716
            },
            {
                "name": "access",
                "weight": 0.012185979
            },
            {
                "name": "communications",
                "weight": 0.015231948
            },
            {
                "name": "solutions",
                "weight": 0.015297161
            },
            {
                "name": "wireless",
                "weight": 0.016913082
            },
            {
                "name": "customers",
                "weight": 0.018422414
            },
            {
                "name": "internet",
                "weight": 0.019625058
            },
            {
                "name": "mobile",
                "weight": 0.023604387
            },
            {
                "name": "service",
                "weight": 0.040177733
            },
            {
                "name": "network",
                "weight": 0.054062214
            }
        ]
    }

    return (
      <div className="container-fluid ContenidoVistaDetalleTopico">
      <NavLink to='/topicos'><h5 id="volver"   ><img id = "left-icon" alt="left-arrow" src = {left_icon}/> Tópicos</h5></NavLink>
      <h2 id="titulo-vista">{topico.name}</h2>
        <SeccionGraficos words = {topico.keyword_topic}/>
 	<SeccionNoticias />
     </div>
    );
  }
}

export default VistaDetalleTopico;
