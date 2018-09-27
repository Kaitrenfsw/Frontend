import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import VistaTopicos from './VistaTopicos/VistaTopicos';
import VistaConfiguracion from './VistaConfiguracion/VistaConfiguracion';
import VistaHome from './VistaHome/VistaHome';
import VistaDetalleCuenta from './VistaDetalleCuenta/VistaDetalleCuenta';
import VistaDetalleTopico from './VistaDetalleTopico/VistaDetalleTopico';


/*
const CheckRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      (rest.user_group === "admin" || rest.user_group === "owner")  ? (
        <Component {...props} />
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
*/
class Content extends Component {


render(){
  return(

    <Route render = {({location}) => (
    <TransitionGroup component={null} >
     <CSSTransition
                 key = {location.key}
                 timeout={400}
                 classNames="fade"
               >
   <Switch location = {location}>
       <Route exact path='/'  render= {() => <VistaHome user = {this.props.user}/>}/>
       <Route path='/configuracion'   render= {() => <VistaConfiguracion user = {this.props.user}/>}/>
       <Route exact path='/topicos' render= {() => <VistaTopicos user = {this.props.user}/>}/>
       <Route location={this.props.location} path='/topicos/:id' component= {(props) => <VistaDetalleTopico {...props} user = {this.props.user}/>}/>
       <Route location={this.props.location}  user_group = {this.props.user.permissions[0].group} path='/cuentas/:id'  component= {(props) => <VistaDetalleCuenta {...props} user = {this.props.user}/>}/>
   </Switch>
   </CSSTransition>
   </TransitionGroup>)}
   />
  );
  }

}

export default Content;
