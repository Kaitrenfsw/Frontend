import React, { Component } from 'react';




class ListaTopicos extends Component {
  state = {
    topicos: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/topic/');
      const topicos = await res.json();
      this.setState({
        topicos
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      
      <ul>
        {this.state.topicos.map(item => (

             <li><a>{item.name}</a></li>
          
        ))}
      </ul>
      
    );
  }
}

export default ListaTopicos;