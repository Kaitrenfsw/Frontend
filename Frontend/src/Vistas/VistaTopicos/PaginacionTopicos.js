import React, { Component } from 'react'




class PaginacionTopicos extends Component{
  render(){
  	
    return ( 
    	<div className= "paginacion">
          <div className="row row-no-padding">
            <div className="col-lg-3">
              <form action="" className="search-form">
                <div className="form-group has-feedback" >
                  <input type="text" className="form-control" name="search" id="search" placeholder="busca un tag"></input>
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
              </form>
            </div>
            <div className="col-lg-2 col-lg-offset-7" >
              <h6 >Ordenar por</h6>
            </div>
          </div>
      </div>
    );
  }
}

export default PaginacionTopicos;