import React, { Component } from 'react';


import ListaTopicos from './ListaTopicos';


class Content extends Component {

  render() {
    return (
      <div className="content">
        <ListaTopicos/>
      </div>
    );
  }
}

export default Content;