import React, { Component } from 'react'
import { ReferenceDot,Label, LabelList,ReferenceLine,ScatterChart,Scatter,CartesianGrid,XAxis,YAxis,Legend,ReferenceArea,Tooltip,ResponsiveContainer } from 'recharts';
//import CareerChartDot from './CareerChartDot'
import './CareerChart.css';


class CareerChart extends Component{

    constructor(props) {
      super(props);
      this.state = {isLoading:true}
    }


    componentDidUpdate(prevProps) {

              if((this.props.topics !== prevProps.topics)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
                {
                    console.log(this.props.topics);
                     this.updateChart();
                }
    }

    updateChart(){
      if(this.props.topics.length===0){
          this.setState({isLoading:true});
      }

      var topicsId=[];
      for (var i = 0; i < this.props.topics.length; i++) {
        topicsId.push(this.props.topics[i].topic_id);
      }


      fetch("http://localhost:4000/api/visualizations/hot_topics?topics_ids="+topicsId)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
           this.setState({isLoading:true});
           var obj = res.data.topics;
           console.log(res);
           var data1=[];
           var data2=[];
           var maxCount=0;
           var minCount=10000000;

           for (var i = 0; i < obj.length; i++) {
            if (obj[i].total_count > maxCount) { maxCount= obj[i].total_count; }
            if (obj[i].total_count < minCount) { minCount= obj[i].total_count; }
            obj[i].x=obj[i].coherence*100;

            if (obj[i].diff>0) {
              data1.push(obj[i]);
            }
            else {
              data2.push(obj[i]);
            }
           }

           minCount=minCount-(maxCount*1.1-maxCount);
           maxCount=maxCount*1.1;

           for (i = 0; i < data1.length; i++) {
             data1[i].y=((data1[i].total_count-minCount)/(maxCount-minCount))*100;
             data1[i].orden=i+1;
           }

           for (i = 0; i < data2.length; i++) {
             console.log("SSSS");
             console.log(data2);
             data2[i].y=((data2[i].total_count-minCount)/(maxCount-minCount))*100;
             data2[i].orden=i+1+data1.length;
           }
           this.setState({data1: data1,data2:data2});
           this.setState({isLoading:false})
         });
          console.log("hola");

       } else {
         console.log('bad request');
       }
     })
     .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message);

     });
    }


    componentDidMount(){

      var topicsId=[];
      for (var i = 0; i < this.props.topics.length; i++) {
        topicsId.push(this.props.topics[i].topic_id);
      }


      fetch("http://localhost:4000/api/visualizations/hot_topics?topics_ids="+topicsId)
     .then((response) => {
       if(response.ok) {
         response.json().then(data => ({
               data: data,
               status: response.status
           })
         ).then(res => {
           var obj = res.data.topics;
           console.log(res);
           var data1=[];
           var data2=[];
           var maxCount=0;
           var minCount=10000000;

           for (var i = 0; i < obj.length; i++) {
            if (obj[i].total_count > maxCount) { maxCount= obj[i].total_count; }
            if (obj[i].total_count < minCount) { minCount= obj[i].total_count; }
            obj[i].x=obj[i].coherence*100;

            if (obj[i].diff>0) {
              data1.push(obj[i]);
            }
            else {
              data2.push(obj[i]);
            }
           }

           minCount=minCount-(maxCount*1.1-maxCount);
           maxCount=maxCount*1.1;

           for (i = 0; i < data1.length; i++) {
             data1[i].y=((data1[i].total_count-minCount)/(maxCount-minCount))*100;
             data1[i].orden=i+1;
           }

           for (i = 0; i < data2.length; i++) {
             console.log("SSSS");
             console.log(data2);
             data2[i].y=((data2[i].total_count-minCount)/(maxCount-minCount))*100;
             data2[i].orden=i+1+data1.length;
           }
           this.setState({data1: data1,data2:data2});
           this.setState({isLoading:false})
         });
          console.log("hola");

       } else {
         console.log('bad request');
       }
     })
     .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message);

     });





      //var datos ='{"topics":[{"topic_id": 2,"topic_name":"Apple","total_count":80,"diff":-10,"coherence":0.3},{"topic_id": 6,"topic_name":"Android","total_count":180,"diff":20,"coherence":0.8},{"topic_id": 7,"topic_name":"Python","total_count":50,"diff":13,"coherence":0.6},{"topic_id": 12,"topic_name":"JavaScript","total_count":95,"diff":-30,"coherence":0.7}]}';
      //var obj = JSON.parse(datos).topics;


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
                  <th scope="col">Nombre tema</th>
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
            console.log(payload);
            return (
              <div className="custom-tooltip" style={{"background":"#2a3339","fontSize":17,"padding":"7px"}}>
                <div><p className="label">Tema: {payload[0].payload.topic_name}</p></div>
                <div><p className="label">Total: {payload[0].payload.total_count}</p></div>
                <div><p className="label">Coherencia: {payload[0].payload.coherence}</p></div>
                <div><p className="label"
                        style={{"color":payload[0].payload.diff>0?"#73DB9A":"#FFB744"}}>
                        Crecimiento: {payload[0].payload.diff>0?"+":""}{payload[0].payload.diff}
                      </p></div>
              </div>
            );

          } else {
            return null;
          }
      }


      if (this.state.isLoading) {
        if(this.props.topics.length ===0){
        return(<div>
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
          <Label value="Coherencia" fill="#5C7582" offset={20} position="insideRight" dy={12} />
        </ReferenceLine>
        <Scatter name="En subida" data={[]} fill="#73DB9A" onClick={this.demoOnClick} shape={<CareerChartDot color= "#73DB9A"/>} >
            <LabelList dataKey="orden" fill="#73DB9A" strokeWidth="1"  fontSize={10} style={{pointerEvents: 'none'}}/>
        </Scatter>
        <Scatter name="En bajada" data={[]} fill="#FFB744" onClick={this.demoOnClick} shape={<CareerChartDot color= "#FFB744"/>}>
            <LabelList dataKey="orden" fill="#FFB744" strokeWidth="1"  fontSize={10} style={{pointerEvents: 'none'}}/>
        </Scatter>
        <ReferenceDot x={75} y={95} r={20} fill="rgba(255, 255, 255, 0)" stroke="none" >
          <Label value="Hot Topics" fill="rgba(255, 255, 255, 1)"  />
        </ReferenceDot>
        <Tooltip content={renderTooltip} cursor={false} label="Nombre topico" isAnimationActive={false} />
        <Legend content={renderLegend} wrapperStyle={{ color: "#fff" ,paddingLeft: "15px"}} layout="vertical" align="right" margin={{left:20}}/>

      </ScatterChart>



        </ResponsiveContainer>
        </div>);}
        else{
          return(null);
        }

      }
      else {


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
                <Label value="Coherencia" fill="#5C7582" offset={20} position="insideRight" dy={12} />
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
}

export default CareerChart;
