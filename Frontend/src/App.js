import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import VistaLogin from './VistaLogin/VistaLogin';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';



class App extends Component {


	state = {
      VistaActiva: 'LOGIN',
			user:  {
    "profile": {
      "phone": "+56976152763",
      "name": "Administrador Kompaz",
      "last_name": "Kaitrén"
    },
    "permissions": [
      {
        "group": "idm"
      }
    ],
    "id": 2,
    "email": "admin@kompaz.cl"
  }

    };


	HandleNavBar(event,valor) {
			if(this.state.VistaActiva !== valor){
			this.setState({	VistaActiva: valor});
		}
	}

	RenderContent(){
		var VistaActiva = this.state.VistaActiva;
	  var user = this.state.user;
		if(VistaActiva === "LOGIN" ){
			return (
				<div>
				    <VistaLogin HandleNavBar= {this.HandleNavBar.bind(this)} />
				</div>
			);
		}
			else{
				return(
					<div>
 				 <div className="container-fluid">
  	        <Header  {...this.state} HandleNavBar= {this.HandleNavBar.bind(this)} user = {user} />
  	      </div>
 				<div>
  					<Content {...this.state} user = {user}/>
  				</div>
 				</div>
				);
			}
	}




  render() {
		return(
			<TransitionGroup appear={true}>
				 <CSSTransition
					 key = {this.state.VistaActiva}
					 timeout={500}
					 classNames="fade"
				 >
					 {this.RenderContent()}
				</CSSTransition>
			</TransitionGroup>
    );
	}
}

export default App;
