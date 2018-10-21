import React, { Component } from 'react'
import { ReferenceDot,Label, LabelList,ReferenceLine,ScatterChart,Scatter,CartesianGrid,XAxis,YAxis,Legend,ReferenceArea,Tooltip,ResponsiveContainer } from 'recharts';
//import CareerChartDot from './CareerChartDot'
import './CareerChart.css';


class CareerChart extends Component{

    constructor(props) {
      super(props);
      this.state = {}
    }

    componentDidMount(){
      var datos ='{"topics":[{"topic_id": 2,"topic_name":"Apple","total_count":80,"growing":0,"avg_weight":0.3},{"topic_id": 6,"topic_name":"Android","total_count":180,"growing":1,"avg_weight":0.8},{"topic_id": 7,"topic_name":"Python","total_count":50,"growing":1,"avg_weight":0.6},{"topic_id": 12,"topic_name":"JavaScript","total_count":95,"growing":0,"avg_weight":0.7}]}';
      var obj = JSON.parse(datos).topics;

      var data1=[];
      var data2=[];
      var maxCount=0;
      var minCount=10000000;

      for (var i = 0; i < obj.length; i++) {
       if (obj[i].total_count > maxCount) { maxCount= obj[i].total_count; }
       if (obj[i].total_count < minCount) { minCount= obj[i].total_count; }
       obj[i].x=obj[i].avg_weight*100;

       if (obj[i].growing==1) {
         data1.push(obj[i]);
       }
       else {
         data2.push(obj[i]);
       }
      }

      maxCount=maxCount+20;
      minCount=minCount-20

      for (var i = 0; i < data1.length; i++) {
        data1[i].y=((data1[i].total_count-minCount)/(maxCount-minCount))*100;
        data1[i].orden=i+1;
      }

      for (var i = 0; i < data1.length; i++) {
        data2[i].y=((data2[i].total_count-minCount)/(maxCount-minCount))*100;
        data2[i].orden=i+1+data1.length;
      }
      this.setState({data1: data1,data2:data2});
      }

    rango(partes){
      var list = [];
      for (var i = 0; i <= partes; i++) {
          list[i]=(((100/partes)*i));
      }
      console.log(list);
      return list

    }

    demoOnClick(e) {
      window.location.href = "/topicos/"+e.topic_id;
    }

    render(){
      const CareerChartDot = (props)=>{
          const radius = 2.5;
          const diameter = radius * 2;
          return (
              <svg width={diameter} height={diameter} style={{"overflow": "visible","cursor":"pointer"}}>
                  <circle cx={props.cx} cy={props.cy} r="11" stroke={props.color} strokeWidth="2" fill="#1F2931" />
              </svg>
          );
      }

      const renderLegend = (props) => {
        const { payload } = props;
        //console.log(payload);

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
                {payload[0].payload.data.map((entry, index) => (
                <tr>
                  <th scope="row">{entry.orden}</th>
                    <td><a class="legendLink" href={"/topicos/"+entry.topic_id}>{entry.topic_name}</a></td>                </tr>
              ))}
              {payload[1].payload.data.map((entry, index) => (
              <tr>
                <th scope="row">{entry.orden}</th>
                <td><a class="legendLink" href={"/topicos/"+entry.topic_id}>{entry.topic_name}</a></td>
              </tr>
            ))}
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

      const renderTooltip = (props)=>{
        const { active } = props;
          if (active) {
            const { payload } = props;
            //console.log(payload);
            return (
              <div className="custom-tooltip">
                <p className="label">{payload[0].payload.topic_name}</p>
              </div>
            );

          } else {
            return null;
          }
      }



      return (
            <div>
            <ResponsiveContainer width='100%' height={450}>

            <ScatterChart width={730} height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <XAxis hide={true} dataKey="x" type="number" domain={[0, 100]} ticks={this.rango(20)}  />
            <YAxis hide={true} dataKey="y" type="number" domain={[0, 100]} ticks={this.rango(12)} />
            <ReferenceArea x1={50} x2={100} y1={50} y2={100} fill="rgba(255, 255, 255, 0.05)" strokeOpacity={1} />
            <CartesianGrid strokeWidth="0.3" strokeOpacity="0.3"/>
            <ReferenceLine x={50} stroke="#5C7582" >
              <Label value="Frecuencia acumulada" fill="#5C7582" offset={-82} position="top" angle= {-90} dx={-8} />
            </ReferenceLine>
            <ReferenceLine y={50} stroke="#5C7582" >
              <Label value="Peso" fill="#5C7582" offset={20} position="insideRight" dy={12} />
            </ReferenceLine>
            <Scatter name="En subida" data={this.state.data1} fill="#73DB9A" onClick={this.demoOnClick} shape={<CareerChartDot color= "#73DB9A"/>} >
                <LabelList dataKey="orden" fill="#73DB9A" strokeWidth="1"  fontSize={10} style={{pointerEvents: 'none'}}/>
            </Scatter>
            <Scatter name="En bajada" data={this.state.data2} fill="#FFB744" onClick={this.demoOnClick} shape={<CareerChartDot color= "#FFB744"/>}>
                <LabelList dataKey="orden" fill="#FFB744" strokeWidth="1"  fontSize={10} style={{pointerEvents: 'none'}}/>
            </Scatter>
            <ReferenceDot x={75} y={95} r={20} fill="rgba(255, 255, 255, 0)" stroke="none" >
              <Label value="Hot Topics" fill="rgba(255, 255, 255, 1)"  />
            </ReferenceDot>
            <Tooltip content={renderTooltip} cursor={false} label="Nombre topico" isAnimationActive={false} />
            <Legend content={renderLegend} wrapperStyle={{ color: "#fff" ,paddingLeft: "15px"}} layout="vertical" align="right" margin={{left:20}}/>

          </ScatterChart>



            </ResponsiveContainer>
            </div>


    );
  }
}

export default CareerChart;
