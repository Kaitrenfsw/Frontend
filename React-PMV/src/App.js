
import React, { Component } from 'react';
import Header from './Header';
import Sidenav from './Sidenav';
import Content from './Content';


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends Component {


  render() {
    return (
      <div>
        <Header />
        <Sidenav />
	    <Content/>
      </div>
    );
  }
}

export default App;
