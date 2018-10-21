import React, { Component } from 'react';
import './VistaDashboard.css';
import 'animate.css';
import FrequencyChart from '../Graficos/FrequencyChart';
import CareerChart from '../Graficos/CareerChart';
import Select from 'react-select';
import CreatableSelect from 'react-select';
import { toast } from 'react-toastify';


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


	  notify_success = (texto) => {

	      toast.success(texto, {
	        position: toast.POSITION.TOP_CENTER
	      });
	    }

	state = {
		modo: "modo-visualizacion",
		selectedOption: null,
		selectedMultiOption:null,
		TituloNuevoGrafico: "Gráfico de Frecuencia",
		graficos: [{name:"Gráfico de Frecuencia", data: [], topics: [	{ value: 1, label: 'Apple' },	{ value: 2, label: 'Samsung' }], type: 1 , id: 1},
               {name:"Gráfico de Frecuencia2", data: [], topics: [{ value: 2, label: 'Samsung' }], type: 1 , id: 2},
               {name:"Gráfico de Frecuencia3", data: [], topics: [  { value: 0, label: 'AI' },{ value: 1, label: 'Apple' },{ value: 2, label: 'Samsung' }], type: 1 , id: 3},
               {name:"Gráfico de Carrera", data: [], topics: [{ value: 2, label: 'Samsung' }], type: 0 , id: 4}]

	}

	DesplegarGrafico(grafico){
		var agregar = null;
		if(this.state.modo === 'modo-edicion')  agregar = 	<div className="seccion-agregar-topicos animated fadeIn">
				<h5  id="topicos-grafico" className= "animated fadeIn">Topicos</h5>
				<CreatableSelect
					isMulti
					onChange={this.handleChangeMulti}
					className = {"añadir-multiple__div"}
					classNamePrefix = {"añadir"}
					placeholder={"Seleccionar"}
					options={topicos}
					defaultValue= {grafico.topics}
			 />
		 </div>


		if(grafico.type ===1){
			return (
				<row>
					<div className={"col-md-10 no-padding animated fadeIn"  + this.state.modo + ((this.state.modo === 'modo-edicion') ? " animated fadeIn" : "")}>
						<h4 onClick={ this.handleRemove.bind(this, grafico.id) }  id="subtitulo-vista" >{grafico.name} {(this.state.modo==='modo-edicion')   && 	<span className= "glyphicon glyphicon-pencil"></span> }</h4>
						{(this.state.modo === "modo-edicion") && <div><span  onClick={ (event) => this.handleRemove(event,grafico.id) }  className = "glyphicon glyphicon-remove-circle span-grafico"> </span></div>}
						<div className="grafico">
						<FrequencyChart />
						</div>
					</div>
					<div className={"col-md-2 no-padding "}>
					{agregar}
					</div>
				</row>
			)
		}
		if(grafico.type ===0){
      return (
				<row>
					<div className={"col-md-10 no-padding animated fadeIn"  + this.state.modo + ((this.state.modo === 'modo-edicion') ? " animated fadeIn" : "")}>
						<h4 onClick={ this.handleRemove.bind(this, grafico.id) }  id="subtitulo-vista" >{grafico.name} {(this.state.modo==='modo-edicion')   && 	<span className= "glyphicon glyphicon-pencil"></span> }</h4>
						{(this.state.modo === "modo-edicion") && <div><span  onClick={ (event) => this.handleRemove(event,grafico.id) }  className = "glyphicon glyphicon-remove-circle span-grafico"> </span></div>}
						<div className="grafico">
						<CareerChart />
						</div>
					</div>
					<div className={"col-md-2 no-padding "}>
					{agregar}
					</div>
				</row>
			)
		}

	}

	HandleAñadirGrafico(){
		var graficos = 	this.state.graficos;
		graficos.push({name:this.state.TituloNuevoGrafico, data: [], topics: this.state.selectedMultiOption, type: this.state.selectedOption.value , id: 10});
		this.setState({graficos})
		this.setState({selectedOption:null})
		this.notify_success('Gráfico añadido');
	}




	DesplegarAgregarGrafico(){
		if((this.state.selectedOption) &&(this.state.modo==='modo-edicion')  && (this.state.selectedOption.value===1)){
			return(
				<row className="animated fadeIn">
					 <div className={"col-md-10 no-padding "}>
					 <input className = "input-titulo" onChange = {(event) => {this.setState({TituloNuevoGrafico:event.target.value})} }placeholder = "Gráfico de comportamiento"/><span className= "glyphicon glyphicon-pencil"></span>
							<div className={"grafico"}>
								<FrequencyChart />
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
			if(graficos[i].id === id){
				graficos.splice( i, 1 );
			}
		}
		this.setState({graficos:graficos});
		this.notify_success('Gráfico eliminado');
	}


	changeModo() {
		if(this.state.modo === "modo-visualizacion"){
					this.setState({modo: "modo-edicion"});
		}
		else {
				this.setState({modo: "modo-visualizacion"});
		}
	}

	handleChange = (selectedOption) => {
	 this.setState({ selectedOption });
 }

 handleChangeMulti = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
		this.setState({selectedMultiOption:newValue});
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };


  render(){
		console.log(this.state.selectedOption);
    return (
      <div className="container-fluid ContenidoVistaDashboard">
			  <div className= "div-titulo">
        <h2 id = "titulo-vista">Dashboard <span className = {"glyphicon glyphicon-cog span-editar-dashboard " + this.state.modo} onClick= { this.changeModo.bind(this) }> </span></h2>
				</div>
				{(this.state.modo === 'modo-edicion') && 	<div className={"col-md-12 no-padding "}>
					<h5  id="agregar-grafico" className= "animated fadeIn">Añadir</h5>
					<Select
					        value={this.state.selectedOption}
					        onChange={this.handleChange}
									options = {options}
									className = {"añadir__div animated fadeIn"}
									classNamePrefix = {"añadir"}
									placeholder={"Ninguno"}
					/>
					</div>}
					{this.DesplegarAgregarGrafico()}
				}
				{this.state.graficos.map((grafico,i,arr) => (
				 this.DesplegarGrafico(grafico)
			 ))}
		 	</div>

    );
  }
}

export default VistaDashboard;
