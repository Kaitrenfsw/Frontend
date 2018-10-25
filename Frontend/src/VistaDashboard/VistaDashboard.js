import React, { Component } from 'react';
import './VistaDashboard.css';
import 'animate.css';
import FrequencyChart from '../Graficos/FrequencyChart';
import DashboardFrequencyChart from '../Graficos/DashboardFrequencyChart';
import CareerChart from '../Graficos/CareerChart';
import Select from 'react-select';
import CreatableSelect from 'react-select';
import { toast } from 'react-toastify';
import AutosizeInput from 'react-input-autosize';



const options = [
  { value: 1, label: 'Gráfico de Comportamiento' },
  { value: 0, label: 'Gráfico de Carrera' },
];

const topicos = [
  { value: 0, label: 'AI' },
	{ value: 1, label: 'Apple' },
	{ value: 2, label: 'Samsung' },
	{ value: 3, label: 'Data science' },
	{ value: 4, label: 'IOT' },
	{ value: 0, label: 'AI' },
]




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
    fetch("http://localhost:4000/api/topicUser/" + this.props.user.id)
   .then((response) => {
     if(response.ok) {
       response.json().then(data => ({
             data: data,
             status: response.status
         })
       ).then(res => {
         console.log(res.data);
         var topics_options = [];
         for(var i = 0; i< res.data.length; i++){
           topics_options.push({value: res.data[i].id, label:res.data[i].name});

         }
         this.setState({topics_options:topics_options});
       });

     } else {
       console.log('bad request');
     }
   })
   .catch(function(error) {
     console.log('Hubo un problema con la petición Fetch:' + error.message);
   });
  }



  fetchDashboardUsuario(){
    fetch("http://localhost:4000/api/idms/dashboard", {
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
          console.log(res.data);
          this.setState({user_dashboard: res.data ,isLoading: false });
        });

      } else {
        console.log('bad request');
      }
    })
    .catch(function(error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }

  pushDashboardUsuario(){
    console.log(this.state.user_dashboard);
    var graphs_selected = this.state.user_dashboard.graphs_selected;
    fetch("http://localhost:4000/api/idms/dashboard", {
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
          console.log(res.data);
          console.log('Dashboard actualizado');
        });

      } else {
        console.log('bad request');
      }
    })
    .catch(function(error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }




  componentDidMount(){
    this.fetchTopicosUsuario();
    this.fetchDashboardUsuario();
  }



  /*función para mostrar cada uno de los graficos del usuario*/
	DesplegarGrafico(grafico,graph_number){

    var topicos_seleccionados = [];
    for(var i = 0; i<grafico.topics_selected.length;i++){
       topicos_seleccionados.push({value:grafico.topics_selected[i].topic_id,label:grafico.topics_selected[i].name})
    }
    console.log(grafico.topics_selected);
		var select_topicos = null;
		if(this.state.modo === 'modo-edicion')  select_topicos = <div className="seccion-agregar-topicos animated fadeIn">
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
		 </div>
		if(grafico.graph_type ===1){
			return (
				<row>
					<div className={"col-md-10 no-padding animated fadeIn"  + this.state.modo + ((this.state.modo === 'modo-edicion') ? " animated fadeIn" : "")}>
            <div className={"grafico"}>

              {(this.state.modo === "modo-edicion") &&<AutosizeInput maxlength = "80" value = {grafico.name} style ={{fontSize:18}} name ="input-titulo" className = "input-titulo" onChange= {(event) => this.HandleNameChange(event,graph_number) } placeholder = {grafico.name} /> }	{(this.state.modo === "modo-edicion") && <span className= "glyphicon glyphicon-pencil"></span>}
  						{(this.state.modo === "modo-edicion") && <div onClick= { (event) => this.handleRemove(event,graph_number)} className = {"div-span-eliminar-grafico " + this.state.modo} > <span className = {"span-eliminar-grafico " } >Eliminar</span> <span className = {"glyphicon glyphicon-remove-circle span-grafico " + this.state.modo} > </span> </div>}
              {(this.state.modo === "modo-visualizacion") && <h4 id= "subtitulo-vista">{grafico.name} </h4>}
              <div className="grafico-frecuencia">
  						      <DashboardFrequencyChart topics = {grafico.topics_selected}/>
  						</div>
					  </div>
           </div>
					<div className={"col-md-2 no-padding "}>
					{select_topicos}
					</div>
				</row>
			)
		}
		if(grafico.graph_type ===3){
      return (
				<row>
					<div className={"col-md-10 no-padding animated fadeIn"  + this.state.modo + ((this.state.modo === 'modo-edicion') ? " animated fadeIn" : "")}>
					   {(this.state.modo === "modo-edicion") && <AutosizeInput maxlength = "80" value = {grafico.name} style ={{fontSize:18}} name ="input-titulo" className = "input-titulo" onChange= {(event) => this.HandleNameChange(event,graph_number) } placeholder = {grafico.name} /> 	}{(this.state.modo === "modo-edicion") && <span className= "glyphicon glyphicon-pencil"></span>}
              {(this.state.modo === "modo-visualizacion") && <h4 id= "subtitulo-vista">{grafico.name} </h4>}
          		{(this.state.modo === "modo-edicion") && <div onClick= { (event) => this.handleRemove(event,graph_number)} className = {"div-span-eliminar-grafico " + this.state.modo} > <span className = {"span-eliminar-grafico " } >Eliminar</span> <span className = {"glyphicon glyphicon-remove-circle span-grafico " + this.state.modo} > </span> </div>}
						<div className="grafico-carrera">
						<CareerChart topics = {grafico.topics_selected} />
						</div>
					</div>
					<div className={"col-md-2 no-padding "}>
					{select_topicos}
					</div>
				</row>
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

     if(graph_type==1){
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
		console.log(this.state.selectedOption);
    if(!this.state.isLoading){
        return (
      <div className="container-fluid ContenidoVistaDashboard">
			  <div className= "div-titulo">
        <h2 id = "titulo-vista">Dashboard </h2> <div className = {"div-span-editar-dashboard " + this.state.modo} > <span className = {"glyphicon glyphicon-cog span-editar-dashboard " + this.state.modo} onClick= { this.changeModo.bind(this) }> </span> <span className = {"span-editar-dashboard " + this.state.modo}  onClick= { this.changeModo.bind(this) } id="texto-editar">Editar</span></div>
        </div>
				{(this.state.modo === 'modo-edicion') && 	<div className="col-md-12 no-padding div-agregar">
          <a onClick={ (event) => this.HandleGuardarCambios(event)}   id = "añadir-button" className="gradient-button gradient-button-1 animated fadeIn"   >Guardar Cambios</a>
					<Select
					        value={this.state.selectedOption}
					        onChange={this.handleChange}
									options = {[{label:"Gráfico de Comportamiento", value: 1},{label: "Gráfico de Carrera", value:3}]}
									className = {"añadir__div animated fadeIn"}
									classNamePrefix = {"añadir"}
									placeholder={"Selecciona un Gráfico"}
					/>
          <a onClick={ (event) => this.HandleAñadirGrafico(event)}   id = "agregar-grafico" className="gradient-button gradient-button-6 animated fadeIn"   >Añadir</a>
					</div>}
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
