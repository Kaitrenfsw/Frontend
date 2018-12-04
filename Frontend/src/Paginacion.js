import React, { Component } from 'react'




class PaginacionTopicos extends Component{

  state = {
    search: ""
  }

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
                <div className="col-sm-4 no-padding">
                  <input  onChange = {(e) => {this.setState({ search: e.target.value })}} type="text" className="form-control" name="search" id="search-input" placeholder={search_text}></input>

                      <button onClick={(event) => {this.props.HandleSearch(event,this.state.search)}} type="button" id = "search-button"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>

                </div>
                <div  className="col-sm-8 no-padding" >
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
      </div>
    );
  }
}

export default PaginacionTopicos;
