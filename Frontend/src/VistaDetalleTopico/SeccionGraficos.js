import React, { Component } from 'react'

import WordCloud from '../Graficos/WordCloud'

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
          <div className="col-lg-6 no-padding">
          <h4 id="subtitulo-vista">Graficó de comportamiento</h4>
          </div>
          <div ref={ (divElement) => this.divElement = divElement} className="col-lg-5 col-lg-offset-1 no-padding">
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
