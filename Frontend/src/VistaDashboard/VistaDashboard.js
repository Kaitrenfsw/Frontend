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
		selectedOption: null,
		selectedMultiOption:null,
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

  fetchGraficoPrevisualizacion(){

  }

  fetchDashboardUsuario(){

  }

  pushDashboardUsuario(){

  }


  componentDidMount(){
    this.fetchTopicosUsuario();
  }



  /*función para mostrar cada uno de los graficos del usuario*/
	DesplegarGrafico(grafico){
    var topicos_seleccionados = [];
    for(var i = 0; i<grafico.topics.length;i++){
       topicos_seleccionados.push({value:grafico.topics[i].topic_id,label:grafico.topics[i].topic_name})
    }
		var select_topicos = null;
		if(this.state.modo === 'modo-edicion')  select_topicos = <div className="seccion-agregar-topicos animated fadeIn">
				<h5  id="topicos-grafico" className= "animated fadeIn">Temas</h5>
				<CreatableSelect id={grafico.graph_id}
					isMulti
					onChange={(event) => this.handleChangeMultiEditar(grafico,event)}
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

              {(this.state.modo === "modo-edicion") &&<AutosizeInput maxlength = "80" value = {grafico.graph_title} style ={{fontSize:18}} name ="input-titulo" className = "input-titulo" onChange= {(event) => this.HandleNameChange(event,grafico.graph_id) } placeholder = {grafico.graph_title} /> }	{(this.state.modo === "modo-edicion") && <span className= "glyphicon glyphicon-pencil"></span>}
  						{(this.state.modo === "modo-edicion") && <div><span  onClick={ (event) => this.handleRemove(event,grafico.graph_id) }  className = "glyphicon glyphicon-remove-circle span-grafico"> </span></div>}
              {(this.state.modo === "modo-visualizacion") && <h4 id= "subtitulo-vista">{grafico.graph_title} </h4>}
              <div className="grafico">
  						      <FrequencyChart />
  						</div>
					  </div>
           </div>
					<div className={"col-md-2 no-padding "}>
					{select_topicos}
					</div>
				</row>
			)
		}
		if(grafico.graph_type ===2){
      return (
				<row>
					<div className={"col-md-10 no-padding animated fadeIn"  + this.state.modo + ((this.state.modo === 'modo-edicion') ? " animated fadeIn" : "")}>
					   {(this.state.modo === "modo-edicion") && <AutosizeInput maxlength = "80" value = {grafico.graph_title} style ={{fontSize:18}} name ="input-titulo" className = "input-titulo" onChange= {(event) => this.HandleNameChange(event,grafico.graph_id) } placeholder = {grafico.graph_title} /> 	}{(this.state.modo === "modo-edicion") && <span className= "glyphicon glyphicon-pencil"></span>}
              {(this.state.modo === "modo-visualizacion") && <h4 id= "subtitulo-vista">{grafico.graph_title} </h4>}
            {(this.state.modo === "modo-edicion") && <div><span  onClick={ (event) => this.handleRemove(event,grafico.graph_id) }  className = "glyphicon glyphicon-remove-circle span-grafico"> </span></div>}
						<div className="grafico">
						<CareerChart />
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
      var select_topicos =	<CreatableSelect
          isMulti
          onChange={this.handleChangeMultiAñadir}
          className = {"añadir-multiple__div"}
          classNamePrefix = {"añadir"}
          placeholder={"Seleccionar"}
          options={this.state.topics_options}
       />
      this.fetchGraficoPrevisualizacion();
  		if((this.state.selectedOption) &&(this.state.modo==='modo-edicion')  && (this.state.selectedOption.value===1)){
  			return(
  				<row className="animated fadeIn">
  					 <div className={"col-md-10 no-padding "}>
  					 <input className = "input-titulo" onChange = {(event) => {this.setState({TituloNuevoGrafico:event.target.value})} }placeholder = "Gráfico de Comportamiento" type="text"/><span className= "glyphicon glyphicon-pencil"></span>
  							<div className="grafico">
  								<FrequencyChart />
  							</div>
  							<a onClick={ (event) => this.HandleAñadirGrafico(event,"grafico")}   id = "añadir-button" className="gradient-button gradient-button-6"   >Guardar</a>
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

      if((this.state.selectedOption) &&(this.state.modo==='modo-edicion')  && (this.state.selectedOption.value===2)){
        return(
          <row className="animated fadeIn">
             <div className={"col-md-10 no-padding "}>
             <input type= "text" className = "input-titulo" onChange = {(event) => {this.setState({TituloNuevoGrafico:event.target.value})} }placeholder = "Gráfico de Carrera"/><span className= "glyphicon glyphicon-pencil"></span>
                <div className={"grafico"}>
                  	<CareerChart />
                </div>
                <a onClick={ (event) => this.HandleAñadirGrafico(event,"grafico")}   id = "añadir-button" className="gradient-button gradient-button-6"   >Guardar</a>
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

  HandleNameChange(event,id){
    var graficos = 	this.state.graficos;
    for(var i=0;i< graficos.length;i++){
			if(graficos[i].graph_id === id){
        graficos[i].graph_title = event.target.value;
			}
		}
    this.setState({graficos})
  }




	HandleAñadirGrafico(event,grafico){
		var graficos = 	this.state.graficos;
    grafico.graph_title = this.state.TituloNuevoGrafico;
	  graficos.push(grafico);
    this.setState({graficos});
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

	handleRemove(event,id){
		var graficos = this.state.graficos;
		for(var i=0;i< graficos.length;i++){
			if(graficos[i].graph_id === id){
				graficos.splice( i, 1 );
			}
		}
		this.setState({graficos:graficos});
    this.pushDashboardUsuario();
		this.notify_success('Gráfico eliminado');
	}


  handleChangeMultiEditar = (event ,newValue: any, actionMeta: any) => {
      var graficos = this.state.graficos;
      /* post de los topicos a previsualizacion, se intercambia el grafico por la respuesta y luego actualizar graficos*/
      this.fetchGraficoPrevisualizacion();
      this.setState({graficos:graficos});
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
									options = {[{label:"Gráfico de Comportamiento", value: 1},{label: "Gráfico de Carrera", value:2}]}
									className = {"añadir__div animated fadeIn"}
									classNamePrefix = {"añadir"}
									placeholder={"Ninguno"}
					/>
					</div>}
					{this.DesplegarAgregarGrafico()}

				{this.state.graficos.map((grafico,i,arr) => (
				 this.DesplegarGrafico(grafico)
			 ))}
		 	</div>

    );
  }
}

export default VistaDashboard;
