import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {


	state = {
      VistaActiva: 'TOPICOS'
    };

  
    
	constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
  }



  handler(e) {
    e.preventDefault()
    this.setState({
      someVar: 1
    })
  }



  render() {
    return (
      <div className="container-fluid">
        <Header  {...this.state} />
		<Content {...this.state}/>
      </div>
    );
  }
}

export default App;