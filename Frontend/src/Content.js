import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import VistaTopicos from './VistaTopicos/VistaTopicos';




const PrivateRoute = ({ component: Component, ...rest }) => (

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

class Content extends Component {


render(){
  return(

    <Route render = {({location}) => (
    <TransitionGroup component={null}>
     <CSSTransition
                 key = {location.key}
                 timeout={400}
                 classNames="fade"
               >
   <Switch location = {location}>
       <Route exact path='/'  component= {() => <VistaTopicos user = {this.props.user}/>}/>
       <Route exact path='/topicos' component= {() => <VistaTopicos user = {this.props.user}/>}/>
   </Switch>
   </CSSTransition>
   </TransitionGroup>)}
   />
  );
  }

}

export default Content;
