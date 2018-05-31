import React, { Component } from 'react';


import ListaTopicos from './ListaTopicos';


class Content extends Component {

  render() {
    return (
      <div className="content">
      	<div className="col-lg-10 main">
      		<div className="row">
      			<ol className="breadcrumb">
      				<li>Menu</li>
      				<li>Tópicos</li>
      			</ol>
      		</div>
  			<div className="panel panel-default title-panel">
  				<h1 >Tópicos</h1>
        </div>
        	<div className="panel panel-default content-panel">
            	<div className="panel-heading clearfix">
            		<h4>Lista de Tópicos</h4>
            	</div>
          <div className="lista">
	        		<ListaTopicos/>
	        </div>
       	  </div>
      	</div>
      </div>
    );
  }
}

export default Content;
