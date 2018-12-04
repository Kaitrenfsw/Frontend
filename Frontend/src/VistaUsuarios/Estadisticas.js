import React, { Component } from 'react'
import TopicsChart from '../Graficos/TopicsChart.js';

class Estadisticas extends Component{


  render(){
    return (
          <div className="Estadisticas">
          <h3 id ="subtitulo-vista">Estadísticas</h3>
          <div className="topics-chart-container">
          <TopicsChart user = {this.props.user}/>
          </div>
          </div>
      );
    }
}

export default Estadisticas;
