import React, { Component } from 'react'
import { toast } from 'react-toastify';
import {withRouter} from "react-router-dom";
import config from '../config.js';

class TemasUsuario extends Component{

  constructor(props){
    console.log(props);
      super(props);
      this.state={
        topics:[{topic_name:"Tema 1"},{topic_name:"Tema 2"},{topic_name:"Tema 3"}],
      }


  }


  /*
  componentDidMount(){
    fetch("http://"+  config.base_url + ":" + config.port + "/api/users/" + this.props.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + this.props.user.token
        },
        body: null
    })
    .then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              log: response.status
          })
        ).then(res => {
          this.setState({topics:res.data.topics})
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }*/

  addRows(tipo){
    var out=[];
    var row;

    if (tipo==="topics") {
      for (row in this.state.topics){
        console.log(this.state.topics[row]);
        out.push(<tr><td>{this.state.topics[row].topic_name}</td></tr>)
      }

    }

    return out;

  }



  render(){
    return (
          <div className="Logs">
            <h3 id ="subtitulo-vista">Temas Suscritos </h3>
              <div className="container-fluid">

                <div className="row">
                  <div className="col-8">

                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Tema</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.addRows("topics")}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>

          </div>
      );
    }
}

export default withRouter(TemasUsuario);
