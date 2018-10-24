import React, { Component } from 'react';
import Header from './Header';
import VistaLogin from './VistaLogin/VistaLogin';
import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import VistaTopicos from './VistaTopicos/VistaTopicos';
import VistaConfiguracion from './VistaConfiguracion/VistaConfiguracion';
import VistaHome from './VistaHome/VistaHome';
import VistaDetalleCuenta from './VistaDetalleCuenta/VistaDetalleCuenta';
import VistaDetalleTopico from './VistaDetalleTopico/VistaDetalleTopico';
import VistaDashboard from './VistaDashboard/VistaDashboard';


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.Logged ? (
      renderMergedProps(Component, props, rest)
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);



class App extends Component {



  componentWillMount(){
    const cachedUser = JSON.parse(localStorage.getItem('user'));
    console.log(cachedUser);
    if(cachedUser) {this.setState({user:cachedUser,Logged:true});}
    else {this.setState({Logged:false}) }
  }



	state = {
		 Logged:false
    };



  HandleUserLogIn(valor) {
			if(this.state.user !== valor){
			this.setState({	user: valor, Logged: true});
      this.props.history.push('/');
		}
	}





  render() {
    console.log(this.state.Logged);
		return(
          <div>
          <ToastContainer />
          {this.state.Logged && <div className="container-fluid">
            <Header  {...this.state}  user = {this.state.user} />
          </div>}
          <Route render = {({location}) => (
          <TransitionGroup component={null} >
           <CSSTransition
                       key = {location.key}
                       timeout={400}
                       classNames="fade"
                     >
         <Switch location = {location}>
             <Route exact path='/login'  render= {() => <VistaLogin user = {this.state.user} HandleUserLogIn= {this.HandleUserLogIn.bind(this)}  />} />
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} exact path='/'  component= {VistaHome}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location}  path='/configuracion'   component= {VistaConfiguracion}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} exact path='/topicos' component= {VistaTopicos}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location} path='/topicos/:id' component= {VistaDetalleTopico}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location}   path='/cuentas/:id'  component= {VistaDetalleCuenta}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location}   path='/dashboard'  component= {VistaDashboard}/>
         </Switch>
         </CSSTransition>
         </TransitionGroup>)}
         />
        </div>

    );
	}
}

export default withRouter(App);
