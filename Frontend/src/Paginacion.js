import React, { Component } from 'react'




class PaginacionTopicos extends Component{



  render(){
   var orden_text = "Ordenar por";
   if(this.props.orden_text){  orden_text = "Mostrar por";}
   var orden = this.props.orden;
   var options = this.props.options;
   var options_html = [];
   var search_text = this.props.search_text;
   for(var i=0;i<options.length; i++ ){
       const val = options[i];
       options_html.push(<li key ={val} ><a onClick={(event) => this.props.HandleOrden(event,val)} >{val}</a></li>);
   }
    return (
    	<div className= "paginacion">
          <div className="row row-no-padding no-margin">
                <div className="form-group has-feedback" >
                <div className="col-sm-2 no-padding">
                  <input onChange={this.props.HandleSearch.bind(this)} type="text" className="form-control" name="search" id="search" placeholder={search_text}></input>
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
            </div>
            <div  className="col-sm-10 no-padding" >
                <span>
                <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                <span className="caret"></span>{orden}</button>
                <ul className="dropdown-menu">
                  {options_html}
                </ul>
              </div>
                <h6  id="ordenar-por">{orden_text}</h6>
              </span>
            </div>
          </div>
      </div>
    );
  }
}

export default PaginacionTopicos;
