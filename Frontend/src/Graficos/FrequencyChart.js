import React, { Component } from 'react'
import { AreaChart,Area,Brush,CartesianAxis,CartesianGrid,XAxis,YAxis,Tooltip,ResponsiveContainer } from 'recharts';

class FrequencyChart extends Component{

    constructor(props) {
      super(props);
      this.state = {
          width: 0,
          data:this.dataFormat()
      }
      this.dataFormat = this.dataFormat.bind(this);
      this.changeData = this.changeData.bind(this);
    }



    dataFormat(archivo){
      var data =[];
      var fila={};
      var last=new Date(2012, 0, 1)
      var month = new Array();
      month[0] = "Jan";
      month[1] = "Feb";
      month[2] = "Mar";
      month[3] = "Apr";
      month[4] = "May";
      month[5] = "Jun";
      month[6] = "Jul";
      month[7] = "Aug";
      month[8] = "Sep";
      month[9] = "Oct";
      month[10] = "Nov";
      month[11] = "Dec";

      for (var i = 0; i < 30; i++) {
        var fecha=month[i%11];
        var publicaciones=Math.round(500+i*Math.random()*50);
        var publicaciones2=Math.round(500+i*Math.random()*50);
        var fila={date:fecha , pub:publicaciones, pub2:publicaciones2 }
        data.push(fila);
      }

      return data;
    }

    changeData(){
      this.setState({data: this.dataFormat()});
      console.log(this.state.data);
    }

    render(){
    return (
              <div>
              <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={this.state.data}
                margin={{ top: 30, right: 50, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F63141" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#F63141" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#40A7C2" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#40A7C2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  padding={{left:10}}
                  stroke="#5C7582"
                  interval={2}
                />
                <YAxis
                  axisLine={false}
                  stroke="#5C7582"
                />
                <CartesianAxis />
                <CartesianGrid
                  vertical={false}
                  stroke="#3A4D5A"
                  opacity="0,2" />
                <Tooltip
                  cursor={false}
                  coordinate={{ x: 100, y: 140 }}
                />
                <Area
                  type="linear"
                  dataKey="pub"
                  stroke="#F63141"
                  strokeWidth={2}
                  name="Publicaciones"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                {/*<Area
                  type="linear"
                  dataKey="pub2"
                  stroke="#40A7C2"
                  strokeWidth={2}
                  name="Publicaciones"
                  fillOpacity={1}
                  fill="url(#colorUv2)"
                />


                <Brush
                  height={30}
                />
                */}

              </AreaChart>
            </ResponsiveContainer>
            {/*
            <button onClick={this.changeData}  >
              Cambiar datos
            </button>
            */}
            </div>

    );
  }
}

export default FrequencyChart;
