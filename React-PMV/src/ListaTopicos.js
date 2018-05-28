import React, { Component } from 'react';




class ListaTopicos extends Component {
  state = {
    topicos: []
  };

  tags(keyword_topic) {
    var keys = "";
    for (var j = 0; j < keyword_topic.length; j++){
        if(j  == keyword_topic.length -1){
            keys = keys.concat(keyword_topic[j].name);
        }
        else{
            keys = keys.concat(keyword_topic[j].name + ", ");
        }
    }
    return keys;
  }

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

    <form>
    <table className="table table-hover">
      <thead>
            <tr>
                <th>Nombre</th>
                <th>Tags</th>
                <th>Suscribirme</th>
            </tr>
      </thead>
      <tbody>
     {this.state.topicos.map(item => (

            <tr>
                <td>{item.name}</td>
                <td>{this.tags(item.keyword_topic)}</td>
                <td ><input type="checkbox" name={item.id} id={item.id} className="css-checkbox" value={item.id} /><label for={item.id} className="css-label"></label></td>
            </tr>

     ))}
    </tbody>
    </table>
       <button type="button" className="btn btn-primary">Guardar Cambios</button>

   </form>

    );
  }
}

export default ListaTopicos;
