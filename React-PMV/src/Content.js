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
      				<li>Topicos</li>
      			</ol>
      		</div>
  			<div className="panel panel-default title-panel">
  				<h1 >Topicos</h1>
        </div>
        	<div className="panel panel-default content-panel">
            	<div className="panel-heading clearfix">
            		<h4>Lista de Topicos</h4>
            	</div>    
	       <form className="search" role="search">
		    		<div className="input-group add-on">
		      			<input className="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text"/>
		      			<div className="input-group-btn">
		        			<button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
		      			</div>
		    		</div>
	  			</form>
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