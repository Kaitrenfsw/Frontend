import React, { Component } from 'react'
import { toast } from 'react-toastify';
import {withRouter} from "react-router-dom";
import config from '../config.js';

class Logs extends Component{

  constructor(props){
    console.log(props);
      super(props);
      this.state={
        logins:[{date:"Fecha1"},{date:"Fecha2"},{date:"Fecha3"}],
        subscriptions:[{date :"Fecha 1",topic_name:"Topico 1"},{date :"Fecha 2",topic_name:"Topico 2"}],
        desubs:[{date :"Fecha 1",topic_name:"Topico 1"},{date :"Fecha 2",topic_name:"Topico 2"}]
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
          this.setState({logins:res.data.logins,subscriptions:res.data.subscriptions,desubs:res.data.desubs})
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

    if (tipo==="logs") {
      for (row in this.state.logins){
        console.log(this.state.logins[row]);
        out.push(<tr><td>{this.state.logins[row].date}</td></tr>)
      }

    }
    else if(tipo ==="subscriptions") {
      for (row in this.state.subscriptions){
        console.log(this.state.subscriptions[row]);
        out.push(<tr><td>{this.state.subscriptions[row].topic_name}</td><td>{this.state.subscriptions[row].date}</td></tr>)
      }

    }
    else if (tipo ==="desubs") {
      for (row in this.state.desubs){
        console.log(this.state.desubs[row]);
        out.push(<tr><td>{this.state.desubs[row].topic_name}</td><td>{this.state.desubs[row].date}</td></tr>)
      }

    }

    return out;

  }



  render(){
    return (
          <div className="Logs">
            <h3 id ="subtitulo-vista">Registro de Actividad </h3>
              <h4 className="subtitulo-logs">Últimos inicios de sesión</h4>
              <div className="container-fluid">

                <div className="row">
                  <div className="col-8">

                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.addRows("logs")}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>


              <h4 className="subtitulo-logs">Últimas Suscripciones</h4>
              <div className="container-fluid">

                <div className="row">
                  <div className="col-8">

                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Tema</th>
                          <th>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.addRows("subscriptions")}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>


              <h4 className="subtitulo-logs">Últimas Desuscripciones</h4>
              <div className="container-fluid">

                <div className="row">
                  <div className="col-8">

                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Tema</th>
                          <th>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.addRows("desubs")}
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

export default withRouter(Logs);
