import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import VistaLogin from './VistaLogin/VistaLogin';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { ToastContainer } from 'react-toastify';




class App extends Component {

  constructor(props) {
    super(props);
    const cachedUser = JSON.parse(localStorage.getItem('user'));
    console.log(cachedUser);
    if(cachedUser) {this.setState({VistaActiva:'HOME'}) }
    else {this.setState({VistaActiva:'LOGIN'}) }
  }



	state = {
			user:  {
    "profile": {
      "phone": "+56976152763",
      "name": "Administrador Kompaz",
      "last_name": "Kaitrén"
    },
    "permissions": [
      {
        "group": "admin"
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

  HandleUser(valor) {
			if(this.state.user !== valor){
			this.setState({	user: valor});
		}
	}

	RenderContent(){
    const cachedUser = JSON.parse(localStorage.getItem('user'));
    var user = this.state.user;
    var VistaActiva = this.state.VistaActiva;
    if(cachedUser) {user = cachedUser;VistaActiva='HOME'; }
		if(VistaActiva === "LOGIN" || !(VistaActiva)){
			return (
				<div>
            <ToastContainer />
				    <VistaLogin HandleUser= {this.HandleUser.bind(this)}  HandleNavBar= {this.HandleNavBar.bind(this)} />
				</div>
			);
		}
			else{
				return(
					<div>
 				 <div className="container-fluid">
  	        <Header  {...this.state} HandleNavBar= {this.HandleNavBar.bind(this)} user = {user} />
  	      </div>
 				<div><ToastContainer />
  					<Content {...this.state} user = {user}/>
  				</div>
 				</div>
				);
			}
	}




  render() {
    const cachedUser = JSON.parse(localStorage.getItem('user'));
    var VistaActiva = this.state.VistaActiva;
    if(cachedUser) {VistaActiva='HOME'; }
		return(
			<TransitionGroup appear={true}>
				 <CSSTransition
					 key = {VistaActiva}
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
