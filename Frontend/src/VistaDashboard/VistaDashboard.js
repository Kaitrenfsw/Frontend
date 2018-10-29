import React, { Component } from 'react';
import './VistaDashboard.css';
import 'animate.css';
import DashboardFrequencyChart from '../Graficos/DashboardFrequencyChart';
import CareerChart from '../Graficos/CareerChart';
import Select from 'react-select';
import CreatableSelect from 'react-select';
import { toast } from 'react-toastify';
import AutosizeInput from 'react-input-autosize';
import config from '../config.js';








class VistaDashboard extends Component{

	notify_success = (texto) => { toast.success(texto, { position: toast.POSITION.TOP_CENTER }); }
	state = {
		modo: "modo-visualizacion",
    isLoading: true,
    user_dashboard:  null,
		selectedOption: null,
		selectedMultiOption:[],
		TituloNuevoGrafico: "",
    graficos: [{"graph_type":1, "graph_id": 0, "graph_title": "Gráfico de Comportamiento", "topics": [ { "topic_name": "hola", "topic_id": 2, "weeks": [ { "week": "dd/mm/yyyy"}]}]},{ "graph_type": 2, "graph_id": 1, "graph_title":"Gráfico de Carrera",  "topics": [ { "topic_id": 8, "topic_name": "algo", "total_count": 5,  "growing": true, "avg_weight": 0.1	 } ] } ],
    topics_options: null
	}

  fetchTopicosUsuario(){
    fetch("http://" +config.base_url +":" + config.port + "/api/topicUser/" + this.props.user.id)
   .then((response) => {
     if(response.ok) {
       response.json().then(data => ({
             data: data,
             status: response.status
         })
       ).then(res => {
         var topics_options = [];
         for(var i = 0; i< res.data.length; i++){
           topics_options.push({value: res.data[i].id, label:res.data[i].name});

         }
         this.setState({topics_options:topics_options});
       });

     } else {
     }
   })
   .catch(function(error) {
   });
  }



  fetchDashboardUsuario(){
    fetch("http://" +config.base_url +":" + config.port + "/api/idms/dashboard", {
        method: 'GET',
        headers: {
          'Content-Type': 'aplication/json',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + this.props.user.token
        },
        body: null
    })
    .then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
          this.setState({user_dashboard: res.data ,isLoading: false });
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }

  pushDashboardUsuario(){
    var graphs_selected = this.state.user_dashboard.graphs_selected;
    fetch("http://"+config.base_url +":" + config.port + "/api/idms/dashboard", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + this.props.user.token
        },
        body: JSON.stringify({
          graphs_selected
        })
    })
    .then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
        });

      } else {
      }
    })
    .catch(function(error) {
    });
  }




  componentDidMount(){
    this.fetchTopicosUsuario();
    this.fetchDashboardUsuario();
  }



  /*función para mostrar cada uno de los graficos del usuario*/
	DesplegarGrafico(grafico,graph_number){
		var modo = this.state.modo;
		var opcion_select_topicos = null;
		var titulo_grafico = <h4 id= "titulo-grafico">{grafico.name} </h4>
		var opcion_eliminar_grafico = null;
		if(modo=== 'modo-edicion') {
			var topicos_seleccionados = [];
			for(var i = 0; i<grafico.topics_selected.length;i++){
				 topicos_seleccionados.push({value:grafico.topics_selected[i].topic_id,label:grafico.topics_selected[i].name})
			}
			  opcion_select_topicos = <div className="seccion-agregar-topicos animated fadeIn">
				<h5  id="topicos-grafico" className= "animated fadeIn">Temas</h5>
				<CreatableSelect id={graph_number}
					isMulti
					onChange={(event) => this.handleChangeMultiEditar(graph_number,event)}
          value = {topicos_seleccionados}
					className = {"añadir-multiple__div"}
					classNamePrefix = {"añadir"}
					placeholder={"Seleccionar"}
					options={this.state.topics_options}
			 />
		 		</div>;
				titulo_grafico = <div><AutosizeInput maxlength = "80" value = {grafico.name} style ={{fontSize:"1em"}} name ="input-titulo" className = "input-titulo" onChange= {(event) => this.HandleNameChange(event,graph_number) } placeholder = {grafico.name} /> 	 <span className= "glyphicon glyphicon-pencil"></span> </div>;
				opcion_eliminar_grafico = <div onClick= { (event) => this.handleRemove(event,graph_number)} className = {"div-span-eliminar-grafico " + this.state.modo} > <span className = {"span-eliminar-grafico " } >Eliminar</span> <span className = {"glyphicon glyphicon-remove-circle span-grafico " + this.state.modo} > </span> </div>;
	 }
		if(grafico.graph_type ===1){
			return (
				<div className="row" key = {graph_number}>
				<div className={"col-sm-2  col-sm-push-10 no-padding "  + this.state.modo }>
				{opcion_select_topicos}
				</div>
					<div className={"col-sm-10 col-sm-pull-2 no-padding animated fadeIn"  + this.state.modo + ((this.state.modo === 'modo-edicion') ? " animated fadeIn" : "")}>
            <div className={"grafico"}>
							{titulo_grafico}
							{opcion_eliminar_grafico}
              <div className="grafico-frecuencia">
  						      <DashboardFrequencyChart topics = {grafico.topics_selected}/>
  						</div>
					  </div>
           </div>
				</div>
			)
		}
		if(grafico.graph_type ===3){
      return (
				<div className="row" key = {graph_number}>
				<div className={"col-sm-2 col-sm-push-10 no-padding "  + this.state.modo }>
				{opcion_select_topicos}
				</div>
					<div className={"col-sm-10  col-sm-pull-2 no-padding animated fadeIn"  + this.state.modo + ((this.state.modo === 'modo-edicion') ? " animated fadeIn" : "")}>
						{titulo_grafico}
						{opcion_eliminar_grafico}
						<div className="grafico-carrera">
						<CareerChart topics = {grafico.topics_selected} />
						</div>
					</div>
				</div>
			)
		}
	}


  HandleNameChange(event,i){
    var user_dashboard = 	this.state.user_dashboard;
    user_dashboard.graphs_selected[i].name = event.target.value;
    this.setState({user_dashboard});
  }




	HandleAñadirGrafico(event){
  if(this.state.selectedOption!=null){
   var TituloNuevoGrafico;
   var graph_type = this.state.selectedOption.value;

     if(graph_type===1){
       TituloNuevoGrafico = "Gráfico de Comportamiento";
     }
     if(graph_type===3){
       TituloNuevoGrafico = "Gráfico de Carrera";
     }
    var FormatedSelectedTopics = [];
		var user_dashboard = 	this.state.user_dashboard;
    user_dashboard.graphs_selected.unshift({"graph_type": graph_type,  "name": TituloNuevoGrafico, "topics_selected": FormatedSelectedTopics });
    this.setState({user_dashboard});
		this.setState({selectedOption:null});
		this.notify_success('Gráfico añadido');
  }
	}

  	HandleGuardarCambios(event){
      this.pushDashboardUsuario();
      this.setState({modo:"modo-visualizacion"});
  		this.notify_success('Cambios Guardados');
  	}





	handleRemove(event,graph_number){
		var user_dashboard = this.state.user_dashboard;
    user_dashboard.graphs_selected.splice( graph_number, 1 );
		this.setState({user_dashboard});
	}


  handleChangeMultiEditar = (graph_number,newValue: any, actionMeta: any) => {
        var FormatedSelectedTopics = [];
        for(var i = 0; i<newValue.length ; i++){
          FormatedSelectedTopics.push({"topic_id":newValue[i].value , "name":newValue[i].label });
        }
        var user_dashboard = 	this.state.user_dashboard;
        user_dashboard.graphs_selected[graph_number].topics_selected=FormatedSelectedTopics;
        this.setState({user_dashboard});
   };


	changeModo() {
		if(this.state.modo === "modo-visualizacion"){ this.setState({modo: "modo-edicion"}); }
		else { this.setState({modo: "modo-visualizacion"}); }
	}
	handleChange = (selectedOption) => { this.setState({ selectedOption }); }
  handleChangeMultiAñadir = (newValue: any, actionMeta: any) => { this.setState({selectedMultiOption:newValue}); };




  render(){
		var modo = this.state.modo;
		var opciones_modo_edicion = null;
    if(modo === "modo-edicion"){
			opciones_modo_edicion = <div className="col-md-12 no-padding div-agregar">
																<a onClick={ (event) => this.HandleGuardarCambios(event)}   id = "guardar-button" className="gradient-button gradient-button-1 animated fadeIn"   >Guardar Cambios</a>
																<Select
																				value={this.state.selectedOption}
																				onChange={this.handleChange}
																				options = {[{label:"Gráfico de Comportamiento", value: 1},{label: "Gráfico de Carrera", value:3}]}
																				className = {"añadir__div animated fadeIn"}
																				classNamePrefix = {"añadir"}
																				placeholder={"Selecciona un Gráfico"}
																/>
																<a onClick={ (event) => this.HandleAñadirGrafico(event)}   id = "agregar-button" className="gradient-button gradient-button-6 animated fadeIn"   >Añadir</a>
															</div>
		}
    if(!this.state.isLoading){
        return (
      <div className="container-fluid ContenidoVistaDashboard">
			  <div className= "div-titulo">
        <h2 className = "titulo-vista">Dashboard </h2> <div className = {"div-span-editar-dashboard " + this.state.modo} > <span className = {"glyphicon glyphicon-cog span-editar-dashboard " + this.state.modo} onClick= { this.changeModo.bind(this) }> </span> <span className = {"span-editar-dashboard " + this.state.modo}  onClick= { this.changeModo.bind(this) } id="texto-editar">Editar</span></div>
        </div>
				{opciones_modo_edicion}
				{this.state.user_dashboard.graphs_selected.map((grafico,i,arr) => (
				 this.DesplegarGrafico(grafico,i)
			 ))}
		 	</div>);
    }
    if(this.state.isLoading){
    return (
      <div className="container-fluid ContenidoVistaDashboard">
			  <div className= "div-titulo">
        <h2 id = "titulo-vista">Dashboard </h2> <div className = {"div-span-editar-dashboard " + this.state.modo} > <span className = {"glyphicon glyphicon-cog span-editar-dashboard " + this.state.modo} onClick= { this.changeModo.bind(this) }> </span> <span className = {"span-editar-dashboard " + this.state.modo}  onClick= { this.changeModo.bind(this) } id="texto-editar">Editar</span></div>
       	</div>
		 	</div>

    );}
  }
}

export default VistaDashboard;
