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
    user_dashboard:  [ { "user_id": 1, "graphs_selected":[ {"graph_type": 1,  "name": "nombre del gráfico", "topics_selected": [ {"topic_id": 23, "name": "IA"}, {"topic_id": 24,"name": "AFI"}, {"topic_id": 7, "name": "EFO"}] }, {"graph_type": 3,  "name": "nombre del gráfico", "topics_selected": [ {"topic_id": 66,"name": "OJO"}, {"topic_id": 77,"name": "EJE"}, {"topic_id": 88, "name": "IJI"} ] }] } ],
		selectedOption: null,
		selectedMultiOption:[],
		TituloNuevoGrafico: "Gráfico de Frecuencia",
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
    fetch("http://localhost:4000/api/userDashboard", {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
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
          const user = res.data.user;
          this.setState({user_dashboard: res.data })
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
    fetch("http://localhost:4000/api/userDashboard", {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + this.props.user.token
        },
        body: this.state.user_dashboard
    })
    .then((response) => {
      if(response.ok) {
        response.json().then(data => ({
              data: data,
              status: response.status
          })
        ).then(res => {
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
		var select_topicos = null;
		if(this.state.modo === 'modo-edicion')  select_topicos = <div className="seccion-agregar-topicos animated fadeIn">
				<h5  id="topicos-grafico" className= "animated fadeIn">Temas</h5>
				<CreatableSelect id={i}
					isMulti
					onChange={(event) => this.handleChangeMultiEditar(graph_number,event)}
					className = {"añadir-multiple__div"}
					classNamePrefix = {"añadir"}
					placeholder={"Seleccionar"}
					options={this.state.topics_options}
					defaultValue= {topicos_seleccionados}
			 />
		 </div>
		if(grafico.graph_type ===1){
			return (
				<row>
					<div className={"col-md-10 no-padding animated fadeIn"  + this.state.modo + ((this.state.modo === 'modo-edicion') ? " animated fadeIn" : "")}>
            <div className={"grafico"}>

              {(this.state.modo === "modo-edicion") &&<AutosizeInput maxlength = "80" value = {grafico.name} style ={{fontSize:18}} name ="input-titulo" className = "input-titulo" onChange= {(event) => this.HandleNameChange(event,graph_number) } placeholder = {grafico.name} /> }	{(this.state.modo === "modo-edicion") && <span className= "glyphicon glyphicon-pencil"></span>}
  						{(this.state.modo === "modo-edicion") && <div><span  onClick={ (event) => this.handleRemove(event,graph_number) }  className = "glyphicon glyphicon-remove-circle span-grafico"> </span></div>}
              {(this.state.modo === "modo-visualizacion") && <h4 id= "subtitulo-vista">{grafico.name} </h4>}
              <div className="grafico">
  						      <DashboardFrequencyChart topics = {grafico.select_topicos}/>
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
            {(this.state.modo === "modo-edicion") && <div><span  onClick={ (event) => this.handleRemove(event,graph_number) }  className = "glyphicon glyphicon-remove-circle span-grafico"> </span></div>}
						<div className="grafico">
						<CareerChart topics = {grafico.select_topicos} />
						</div>
					</div>
					<div className={"col-md-2 no-padding "}>
					{select_topicos}
					</div>
				</row>
			)
		}
	}

  /* Función para mostrar grafico en sección de agregar */
  	DesplegarAgregarGrafico(){
      var topicos_seleccionados = this.state.selectedMultiOption;
      var topicos_seleccionados_formateados = [];
      for(var i = 0; i<topicos_seleccionados.length;i++){
           topicos_seleccionados_formateados.push({"topic_id":topicos_seleccionados[i].value,"name":topicos_seleccionados[i].label})
      }
      var select_topicos =	<CreatableSelect
          isMulti
          onChange={this.handleChangeMultiAñadir}
          className = {"añadir-multiple__div"}
          classNamePrefix = {"añadir"}
          placeholder={"Seleccionar"}
          options={this.state.topics_options}
       />

  		if((this.state.selectedOption) &&(this.state.modo==='modo-edicion')  && (this.state.selectedOption.value===1)){
  			return(
  				<row className="animated fadeIn">
  					 <div className={"col-md-10 no-padding "}>
             <AutosizeInput maxlength = "80" style ={{fontSize:18}} name ="input-titulo" className = "input-titulo" onChange= {(event) => {this.setState({TituloNuevoGrafico:event.target.value})} } placeholder = "Gráfico de Comportamiento" /> <span className= "glyphicon glyphicon-pencil"></span>

              	<div className="grafico">
  								<DashboardFrequencyChart topics = { topicos_seleccionados_formateados} />
  							</div>
  							<a onClick={ (event) => this.HandleAñadirGrafico(event,1)}   id = "añadir-button" className="gradient-button gradient-button-6"   >Guardar</a>
  					</div>
  					<div className={"col-md-2 no-padding "}>
  						<div className="seccion-agregar-topicos">
  						<h5  id="topicos-grafico" className= "animated fadeIn">Temas</h5>
  					   {select_topicos}
  					 </div>
  					</div>
  			</row>
  			)
  		}

      if((this.state.selectedOption) &&(this.state.modo==='modo-edicion')  && (this.state.selectedOption.value===3)){
        return(
          <row className="animated fadeIn">
             <div className={"col-md-10 no-padding "}>
              <AutosizeInput maxlength = "80" style ={{fontSize:18}} name ="input-titulo" className = "input-titulo" onChange= {(event) => {this.setState({TituloNuevoGrafico:event.target.value})} } placeholder = "Gráfico de Comportamiento" /> <span className= "glyphicon glyphicon-pencil"></span>
                <div className={"grafico"}>
                  	<CareerChart topics = {  topicos_seleccionados_formateados} />
                </div>
                <a onClick={ (event) => this.HandleAñadirGrafico(event,3)}   id = "añadir-button" className="gradient-button gradient-button-6"   >Guardar</a>
            </div>
            <div className={"col-md-2 no-padding "}>
              <div className="seccion-agregar-topicos">
              <h5  id="topicos-grafico" className= "animated fadeIn">Temas</h5>
              {select_topicos}
             </div>
            </div>
        </row>
        )
      }
  	}

  HandleNameChange(event,i){
    var user_dashboard = 	this.state.user_dashboard;
    user_dashboard[0].graphs_selected[i].name = event.target.value;
    this.setState({user_dashboard})
  }




	HandleAñadirGrafico(event,graph_type){
    var SelectedTopics = this.state.selectedMultiOption;
    var FormatedSelectedTopics = [];
    for(var i = 0; i<SelectedTopics.length ; i++){
      FormatedSelectedTopics.push({"topic_id":SelectedTopics[i].value , "name":SelectedTopics[i].label });
    }
		var user_dashboard = 	this.state.user_dashboard;
    user_dashboard[0].graphs_selected.push({"graph_type": graph_type,  "name": this.state.TituloNuevoGrafico, "topics_selected": FormatedSelectedTopics });
    this.setState({user_dashboard});
    this.pushDashboardUsuario();
		this.setState({selectedOption:null});
		this.notify_success('Gráfico añadido');
	}




	DesplegarAgregarGrafico(){
		if((this.state.selectedOption) &&(this.state.modo==='modo-edicion')  && (this.state.selectedOption.value===1)){
			return(
				<row className="animated fadeIn">
					 <div className={"col-md-10 no-padding "}>
					 <input className = "input-titulo" onChange = {(event) => {this.setState({TituloNuevoGrafico:event.target.value})} }placeholder = "Gráfico de comportamiento"/><span className= "glyphicon glyphicon-pencil"></span>
							<div className={"grafico"}>
								<DashboardFrequencyChart />
							</div>
							<a onClick={ (event) => this.HandleAñadirGrafico(event)}   id = "añadir-button" className="gradient-button gradient-button-6"   >Añadir</a>
					</div>
					<div className={"col-md-2 no-padding "}>
						<div className="seccion-agregar-topicos">
						<h5  id="topicos-grafico" className= "animated fadeIn">Topicos</h5>
						<CreatableSelect
						 	isMulti
						 	onChange={this.handleChangeMulti}
						 	className = {"añadir-multiple__div"}
							classNamePrefix = {"añadir"}
							placeholder={"Seleccionar"}
						 	options={topicos}
					 />
					 </div>
					</div>
			</row>
			)
		}
	}

	handleRemove(event,graph_number){
		var user_dashboard = this.state.user_dashboard;
    user_dashboard[0].graphs_selected.splice( graph_number, 1 );
		this.setState({user_dashboard});
    this.pushDashboardUsuario();
		this.notify_success('Gráfico eliminado');
	}


  handleChangeMultiEditar = (graph_number,newValue: any, actionMeta: any) => {
        var FormatedSelectedTopics = [];
        for(var i = 0; i<newValue.length ; i++){
          FormatedSelectedTopics.push({"topic_id":newValue[i].value , "name":newValue[i].label });
        }
        var user_dashboard = 	this.state.user_dashboard;
        user_dashboard[0].graphs_selected[graph_number].topics_selected=FormatedSelectedTopics;
        this.setState({user_dashboard});
        this.pushDashboardUsuario();
   };


	changeModo() {
		if(this.state.modo === "modo-visualizacion"){ this.setState({modo: "modo-edicion"}); }
		else { this.setState({modo: "modo-visualizacion"}); }
	}
	handleChange = (selectedOption) => { this.setState({ selectedOption }); }
  handleChangeMultiAñadir = (newValue: any, actionMeta: any) => { this.setState({selectedMultiOption:newValue}); };




  render(){
		console.log(this.state.selectedOption);
    return (
      <div className="container-fluid ContenidoVistaDashboard">
			  <div className= "div-titulo">
        <h2 id = "titulo-vista">Dashboard <span className = {"glyphicon glyphicon-cog span-editar-dashboard " + this.state.modo} onClick= { this.changeModo.bind(this) }> </span></h2>
				</div>
				{(this.state.modo === 'modo-edicion') && 	<div className="col-md-12 no-padding ">
					<h5  id="agregar-grafico" className= "animated fadeIn">Añadir</h5>
					<Select
					        value={this.state.selectedOption}
					        onChange={this.handleChange}
									options = {[{label:"Gráfico de Comportamiento", value: 1},{label: "Gráfico de Carrera", value:3}]}
									className = {"añadir__div animated fadeIn"}
									classNamePrefix = {"añadir"}
									placeholder={"Ninguno"}
					/>
					</div>}
					{this.DesplegarAgregarGrafico()}

				{this.state.user_dashboard[0].graphs_selected.map((grafico,i,arr) => (
				 this.DesplegarGrafico(grafico,i)
			 ))}
		 	</div>

    );
  }
}

export default VistaDashboard;
