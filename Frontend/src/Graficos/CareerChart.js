import React, { Component } from 'react'
import { ReferenceDot,Label, LabelList,ReferenceLine,ScatterChart,Scatter,CartesianGrid,XAxis,YAxis,Legend,ReferenceArea,Tooltip,ResponsiveContainer } from 'recharts';
//import CareerChartDot from './CareerChartDot'
import './CareerChart.css';
import config from '../config.js';


class CareerChart extends Component{

    constructor(props) {
      super(props);
      this.state = {NoData:true,isLoading:true}
    }


    componentDidUpdate(prevProps) {
      if((this.props.topics !== prevProps.topics)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
          {
               this.updateChart();
          }
    }

    updateChart(){
      var do_fetch = true;
      if(this.props.topics.length===0){
          this.setState({NoData:true});
          do_fetch = false;
      }
      if(do_fetch){
       var topicsId=[];
       for (var i = 0; i < this.props.topics.length; i++) {
         topicsId.push(this.props.topics[i].topic_id);
       }
       fetch("http://"+ config.base_url +":" + config.port + "/api/visualizations/hot_topics?topics_ids="+topicsId)
      .then((response) => {
        if(response.ok) {
          response.json().then(data => ({
                data: data,
                status: response.status
            })
          ).then(res => {
            this.setState({NoData:true});
            var obj = res.data.topics;
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
              data2[i].y=((data2[i].total_count-minCount)/(maxCount-minCount))*100;
              data2[i].orden=i+1+data1.length;
            }
            this.setState({data1: data1,data2:data2});
            this.setState({NoData:false});
            this.setState({isLoading:false});
          });

        } else {
          this.setState({NoData:true})
        }
      })
      .catch(error => {
          this.setState({NoData:true})
      });
     }
   }


     componentDidMount(){
       if(this.props.topics.length !==0){
            this.updateChart();
       }
     }



    rango(partes){
      var list = [];
      for (var i = 0; i <= partes; i++) {
          list[i]=(((100/partes)*i));
      }
      return list
    }

    demoOnClick(e) {
      window.location.href = "/topicos/"+e.topic_id;
    }

    render(){


            const renderLegend = (props) => {
              const { payload } = props;
              //console.log(payload);

              return (
                <div>
                  <table className="table borderless">
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
                          <td><a className="legendLink" href={"/topicos/"+entry.topic_id}>{entry.topic_name}</a></td>                </tr>
                    ))}
                    {payload[1].payload.data.map((entry, index) => (
                    <tr>
                      <th scope="row">{entry.orden}</th>
                      <td><a className="legendLink" href={"/topicos/"+entry.topic_id}>{entry.topic_name}</a></td>
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

      const default_graph = (
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
      <Scatter name="En subida" data={[]} fill="#73DB9A" shape={<CareerChartDot color= "#73DB9A"/>} >
          <LabelList dataKey="orden" fill="#73DB9A" strokeWidth="1"  fontSize={10} style={{pointerEvents: 'none'}}/>
      </Scatter>
      <Scatter name="En bajada" data={[]} fill="#FFB744"  shape={<CareerChartDot color= "#FFB744"/>}>
          <LabelList dataKey="orden" fill="#FFB744" strokeWidth="1"  fontSize={10} style={{pointerEvents: 'none'}}/>
      </Scatter>
      <ReferenceDot x={75} y={95} r={20} fill="rgba(255, 255, 255, 0)" stroke="none" >
        <Label value="Hot Topics" fill="rgba(255, 255, 255, 1)"  />
      </ReferenceDot>
      <Tooltip content={renderTooltip} cursor={false} label="Nombre topico" isAnimationActive={false} />
      <Legend content={renderLegend} wrapperStyle={{ color: "#fff" ,paddingLeft: "15px"}} layout="vertical" align="right" margin={{left:20}}/>
      </ScatterChart>
      </ResponsiveContainer>
      </div>);


      const CareerChartDot = (props)=>{
          const radius = 2.5;
          const diameter = radius * 2;
          return (
              <svg width={diameter} height={diameter} style={{"overflow": "visible","cursor":"pointer"}}>
                  <circle cx={props.cx} cy={props.cy} r="11" stroke={props.color} strokeWidth="2" fill="#1F2931" />
              </svg>
          );
      }
      if(this.state.isLoading){
        return(<div className="loader loader--style2" title="1">
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           width="9.5em" height="9.5em" viewBox="0 0 50 50"  xmlSpace="preserve">
        <path fill="#36454E" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"/>
          </path>
        </svg>
      </div>);
      }
      else if (this.state.NoData) {
        if(this.props.topics.length ===0){ return(default_graph);}
        else{ return(null); }
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
