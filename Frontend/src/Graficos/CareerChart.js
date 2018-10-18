import React, { Component } from 'react'
import { ReferenceDot,Label, LabelList,ReferenceLine,ScatterChart,Scatter,CartesianGrid,XAxis,YAxis,Legend,ReferenceArea,Tooltip,ResponsiveContainer } from 'recharts';
//import CareerChartDot from './CareerChartDot'
import './CareerChart.css';


class CareerChart extends Component{

    constructor(props) {
      super(props);
      this.state = {data01 : [{x: 10, y: 30}, {x: 30, y: 90}, {x: 45, y: 40}, {x: 30, y: 40}, {x: 70, y: 80}],
                    data02 : [{x: 30, y: 20}, {x: 50, y: 18}, {x: 75, y: 24}, {x: 10, y: 40}, {x: 40, y: 98}, {x: 90, y: 67}, {x: 40, y: 98}]
      }

    }

    componentDidMount(){
      var datos ='{"topicos":[{"id": 2,"nombre":"Apple"},{"week": 5,"nombre": "32"}]}';
     var obj = JSON.parse(datos).topicos;
     console.log(obj);
     for (var i = 0; i < obj.length; i++) {
       obj[i].date=""
     }
     this.setState({data: obj});
   }

    rango(partes){
      var list = [];
      for (var i = 0; i <= partes; i++) {
          list[i]=(((100/partes)*i));
      }
      console.log(list);
      return list

    }

    render(){
      const CareerChartDot = (props)=>{
          const radius = 2.5;
          const diameter = radius * 2;
          return (
              <svg width={diameter} height={diameter} style={{"overflow": "visible"}}>
                  <circle cx={props.cx} cy={props.cy} r="11" stroke={props.color} strokeWidth="2" fill="#1F2931" />
              </svg>
          );
      }
      const renderLegend = (props) => {
        const { payload } = props;
        console.log(payload);

        return (
          <div>
            <table class="table borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre tópico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Apple</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>3D Print</td>
                </tr>
              </tbody>
            </table>

          <br/>
            {
              payload.map((entry, index) => (
              <div>
              <svg height="14" width="18">
                <circle  cx="7" cy="7"r="7" fill={entry.color} />
              </svg>
                  {entry.value}
              </div>
              ))
            }

          </div>
        );
      }
      return (
            <div>
            <ResponsiveContainer width='100%' height={450}>

            <ScatterChart width={730} height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <XAxis hide={true} dataKey="x" type="number" name="Publicaciones" domain={[0, 100]} ticks={this.rango(20)}  />
            <YAxis hide={true} dataKey="y" type="number" name="Peso " domain={[0, 100]} ticks={this.rango(12)} />
            <ReferenceArea x1={50} x2={100} y1={50} y2={100} fill="rgba(255, 255, 255, 0.05)" strokeOpacity={1} />
            <CartesianGrid strokeWidth="0.3" strokeOpacity="0.3"/>
            <ReferenceLine x={50} stroke="#5C7582" >
              <Label value="Frecuencia acumulada" fill="#5C7582" offset={-82} position="top" angle= {-90} dx={-8} />
            </ReferenceLine>
            <ReferenceLine y={50} stroke="#5C7582" >
              <Label value="Peso" fill="#5C7582" offset={20} position="insideRight" dy={12} />
            </ReferenceLine>
            <Scatter name="En bajada" data={this.state.data01} fill="#FFB744" shape={<CareerChartDot color= "#FFB744"/>}>
                <LabelList dataKey="x" fill="#FFB744" strokeWidth="1"  fontSize={10} style={{pointerEvents: 'none'}}/>
            </Scatter>
            <Scatter name="En subida" data={this.state.data02} fill="#73DB9A" shape={<CareerChartDot color= "#73DB9A"/>} >
                <LabelList dataKey="x" fill="#73DB9A" strokeWidth="1"  fontSize={10} style={{pointerEvents: 'none'}}/>
            </Scatter>
            <ReferenceDot x={75} y={95} r={20} fill="rgba(255, 255, 255, 0)" stroke="none" >
              <Label value="Hot Topics" fill="rgba(255, 255, 255, 1)"  />
            </ReferenceDot>
            <Tooltip cursor={false} label="Nombre topico" />
            <Legend content={renderLegend} wrapperStyle={{ color: "#fff" ,paddingLeft: "15px"}} layout="vertical" align="right" margin={{left:20}}/>

          </ScatterChart>



            </ResponsiveContainer>
            </div>


    );
  }
}

export default CareerChart;
