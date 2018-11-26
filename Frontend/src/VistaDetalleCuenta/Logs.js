import React, { Component } from 'react'
import { toast } from 'react-toastify';
import {withRouter} from "react-router-dom";
import config from '../config.js';
import moment from  'moment';
import 'moment/locale/es'

class Logs extends Component{

  constructor(props){
    moment.locale('es',{
      months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
      monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
      weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
      weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
      weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')})
    console.log(props);
      super(props);
      this.state={/*
        logins:[{date:"Fecha1"},{date:"Fecha2"},{date:"Fecha3"}],
        subscriptions:[{date :"Fecha 1",topic_name:"Topico 1"},{date :"Fecha 2",topic_name:"Topico 2"}],
        desubs:[{date :"Fecha 1",topic_name:"Topico 1"},{date :"Fecha 2",topic_name:"Topico 2"}]*/
      }


  }



  componentDidMount(){
    fetch("http://"+  config.base_url + ":" + config.port + "/api/idms_logs?user_id=" + this.props.id, {
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
          console.log(res.data);
          this.setState({logins:res.data.logins,subscriptions:res.data.subscriptions,desubs:res.data.unsubscriptions})
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }

  addRows(tipo){
    var out=[];
    var row;
    var dateInputFormat="YYYY-MM-DD[T]HH:mm:ss";
    var dateOutputFormat="DD/MMMM/YYYY HH:mm:ss";

    if (tipo==="logs") {
      for (row in this.state.logins){
        console.log(this.state.logins[row]);
        out.push(<tr><td>{moment(this.state.logins[row].inserted_at,dateInputFormat).subtract(3, 'hours').format(dateOutputFormat)}</td></tr>)
      }

    }
    else if(tipo ==="subscriptions") {
      for (row in this.state.subscriptions){
        //console.log(this.state.subscriptions[row]);
        out.push(<tr><td>{this.state.subscriptions[row].topic_name}</td><td>{moment(this.state.subscriptions[row].inserted_at,dateInputFormat).subtract(3, 'hours').format(dateOutputFormat)}</td></tr>)
      }

    }
    else if (tipo ==="desubs") {
      for (row in this.state.desubs){
        //console.log(this.state.desubs[row]);
        out.push(<tr><td>{this.state.desubs[row].topic_name}</td><td>{moment(this.state.desubs[row].inserted_at,dateInputFormat).subtract(3, 'hours').format(dateOutputFormat)}</td></tr>)
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
