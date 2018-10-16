import React, { Component } from 'react'

class CareerChartDot extends Component{

    constructor(props) {
      super(props);
    }

    render(){
    return (
      <svg height="20" width="20">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      </svg>
      );
  }
}

export default CareerChartDot;
