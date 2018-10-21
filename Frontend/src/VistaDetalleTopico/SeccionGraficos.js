import React, { Component } from 'react'
import FrequencyChart from '../Graficos/FrequencyChart'
//import MultiDataFrequencyChart from '../Graficos/MultiDataFrequencyChart'
import WordCloud from '../Graficos/WordCloud'
import CareerChart from '../Graficos/CareerChart'


class SeccionGraficos extends Component{

 state = {
     width: 0,
   }


  componentDidMount() {

   const width = this.divElement.clientWidth;
   this.setState({  width });
 }

  render(){

    return (

        <div className="row row-no-padding">
          <div className="col-lg-7 no-padding">
            <h4 id="subtitulo-vista">Gráfico de comportamiento</h4>
            <div className="freq-div">
            <FrequencyChart />
            </div>
          </div>
          <div ref={ (divElement) => this.divElement = divElement} className="col-lg-4 col-lg-offset-1 no-padding">
            <h4 id="subtitulo-vista">Word Cloud</h4>
            <div className="cloud-div">
              <WordCloud width ={this.state.width} words = {this.props.words} data = {[1,2]} />
            </div>
          </div>

        </div>

    );
  }
}

export default SeccionGraficos;
