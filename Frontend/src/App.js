import React, { Component } from 'react';
import Header from './Header';
import VistaLogin from './VistaLogin/VistaLogin';
import ScrollToTop from './ScrollToTop';
import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';
import VistaTopicos from './VistaTopicos/VistaTopicos';
import VistaConfiguracion from './VistaConfiguracion/VistaConfiguracion';
import VistaUsuarios from './VistaUsuarios/VistaUsuarios';
import VistaHome from './VistaHome/VistaHome';
import VistaDetalleCuenta from './VistaDetalleCuenta/VistaDetalleCuenta';
import VistaDetalleTopico from './VistaDetalleTopico/VistaDetalleTopico';
import VistaDashboard from './VistaDashboard/VistaDashboard';
import 'animate.css';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}


const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.Logged ? (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      ) : (
          renderMergedProps(Component, props, rest)
      )
    }
  />
);

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

const NotIDMRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (rest.Logged && (rest.user.permissions[0].group === 'owner'|| rest.user.permissions[0].group === 'admin' )) ? (
      renderMergedProps(Component, props, rest)
      ) : (
        <Redirect
          to={{
            pathname: "/",
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
    if(cachedUser) {this.setState({user:cachedUser,Logged:true});}
    else {this.setState({Logged:false}) }
  }



	state = {
		 Logged:false
    };



  HandleUserLogIn(valor) {
			if(this.state.user !== valor){
			     this.setState({	user: valor, Logged: true});
		  }
      if(valor === null){
        	this.setState({user: valor,	Logged: false});
      }
	}





  render(){
		return(
          <div>
          <ToastContainer />
          {this.state.Logged && this.props.location.pathname && <div className="container-fluid header">
            <Header HandleUserLogIn= {this.HandleUserLogIn.bind(this)}  {...this.state}  user = {this.state.user} />
          </div>}
        <ScrollToTop>

         <Switch key={this.props.location.key}>
             <PublicRoute exact path='/login' location={this.props.location}  Logged = {this.state.Logged}  user = {this.state.user} HandleUserLogIn= {this.HandleUserLogIn.bind(this)}  component= {VistaLogin}  />
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location}  exact path='/'  component= {VistaHome}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location}  path='/configuracion'   component= {VistaConfiguracion}/>
             <NotIDMRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location}  path='/usuarios'   component= {VistaUsuarios}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} exact path='/topicos' component= {VistaTopicos}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location} path='/topicos/:id' component= {VistaDetalleTopico}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location}   path='/cuentas/:id'  component= {VistaDetalleCuenta}/>
             <PrivateRoute Logged = {this.state.Logged}  user = {this.state.user} location={this.props.location}   path='/dashboard'  component= {VistaDashboard}/>
             <Redirect to="/login" />
         </Switch>

          </ScrollToTop>
        </div>

    );
	}
}

export default withRouter(App);
