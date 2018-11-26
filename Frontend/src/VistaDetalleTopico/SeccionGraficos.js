import React, { Component } from 'react'
import FrequencyChart from '../Graficos/FrequencyChart'
//import MultiDataFrequencyChart from '../Graficos/MultiDataFrequencyChart'
import WordCloud from '../Graficos/WordCloud'
import ReactTooltip from 'react-tooltip';

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

        <div className="row row-no-padding row-SeccionGraficos">
          <div className=" wrap-freq-div no-padding">
            <h4 id="subtitulo-vista">Gráfico de comportamiento <span data-tip data-for='LeyendaGrafico' className="glyphicon glyphicon-question-sign"></span></h4>

            <div className="freq-div">
            <FrequencyChart  topicId={this.props.topicId} />
            </div>

            <ReactTooltip effect = "solid"  id='LeyendaGrafico' place='right'>
              <div className = "boxLeyenda">
               <p className = "TextoLeyenda"> Gráfico que muestra el número de publicaciones de artículos de este Tema en los últimos 6 meses</p>
              </div>
             </ReactTooltip>
          </div>
          <div ref={ (divElement) => this.divElement = divElement} className="wrap-cloud-div no-padding">
            <h4 id="subtitulo-vista">Nube de keywords <span data-tip data-for='LeyendaNube' className="glyphicon glyphicon-question-sign"></span></h4>
            <div className="cloud-div">
              <WordCloud width ={this.state.width} words = {this.props.words} data = {[1,2]} />
            </div>
            <ReactTooltip effect = "solid"  id='LeyendaNube' place='right'>
               <div className = "boxLeyenda">
               <p className = "TextoLeyenda"> Nube de palabras conformada por las keywords del Tema, mientras más grande la keyword más representa al Tema</p>
                 </div>
             </ReactTooltip>
          </div>


        </div>

    );
  }
}

export default SeccionGraficos;
