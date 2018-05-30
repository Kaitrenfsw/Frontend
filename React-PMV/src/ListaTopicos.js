import React, { Component } from 'react';
import ReactTable from "react-table";



class ListaTopicos extends Component {
  state = {
    topicos: []
  };

  constructor(){
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  tags(keyword_topic) {
    var keys = "";
    for (var j = 0; j < keyword_topic.length; j++){
        if(j  === keyword_topic.length -1){
            keys = keys.concat(keyword_topic[j].name);
        }
        else{
            keys = keys.concat(keyword_topic[j].name + ", ");
        }
    }
    return keys;
  }

  tags2(data) {
    data.map((val, i, arr) => {
     val.keyword_topic = val.keyword_topic.map((val2,j,val)=> {
      return val2.name + " ";
      });
     return 0;
    });


  }



  async componentDidMount() {
    this.setState({
      user_id:1
    });
    try {
      if(typeof this.state.checkboxValues==='undefined'){
        const res = await fetch('http://127.0.0.1:8000/topic/');
        const topicos = await res.json();
        this.tags2(topicos)
        this.setState({
          topicos
        });
        var i;
        var checkboxValues={};
        for (i=0;i<Object.keys(topicos).length;i++){
          checkboxValues[topicos[i]['id']]=false;
        }
        this.setState({
          checkboxValues
        });
        console.log(checkboxValues);

        fetch("http://127.0.0.1:8000/topicUser/", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          //make sure to serialize your JSON body
          body: JSON.stringify({
            "user_id": this.state.user_id
          })
        })
        .then( (usrRes) => {
          usrRes.json().then( (usrTopics)=>{
            console.log(usrTopics);
            this.setState({usrTopics});
            var i;
            const checkboxValues=this.state.checkboxValues;
            for (i=0;i< Object.keys(usrTopics).length ;i++){
              checkboxValues[usrTopics[i]['id']]=true
            }
            this.setState({
              checkboxValues
            });
          })
        });

        console.log(this.state);

      }
    } catch (e) {
      console.log(e);
    }
  }

  handleInputChange(event) {
    console.log(this.state);
    const checkboxValues= this.state.checkboxValues;
    const target = event.target;
    const id_topico = target.name;

    checkboxValues[id_topico]= target.checked;


    this.setState({
      checkboxValues
    });
  }
  //Envia los topicos seleccionados para que se actualicen en la base de datos
  handleSubmit(event){

    const checkboxValues=this.state.checkboxValues;
    const topicos=this.state.topicos
    const user_id=this.state.user_id
    var i;
    var newUsrTopics=[];
    for (i=0;i<Object.keys(topicos).length;i++){
      if (checkboxValues[topicos[i]['id']]) newUsrTopics.push(topicos[i]['id'])
    }
    console.log(newUsrTopics);

    fetch("http://127.0.0.1:8000/topicUser/", {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user_id': user_id,
        'user_topics_id':newUsrTopics
      })
    })
    window.alert("Topicos actualizados correctamente.");
  }
  render() {
    return (

    <form>
    <ReactTable

          data={this.state.topicos}
          nextText= 'Siguiente'
          previousText= 'Anterior'
          rowsText = "filas"
          noDataText= 'No hay datos'
          pageText= 'Pagina'
          ofText= 'of'
          filterable
          defaultFilterMethod={(filter, row) =>
          String(row[filter.id]).toLowerCase().includes(filter.value.toString().toLowerCase())}
          columns= {[{
            Header: 'Nombre',
            accessor: 'name' // String-based value accessors!
            },{
            Header: 'Tags',
            accessor: 'keyword_topic', // String-based value accessors
             },
             {
             Header: 'Suscribirme',
             accessor: 'id',
             Cell: row => (
               <div className="spancheck">
               <input type="checkbox" name={row.value} id={row.value} className="css-checkbox" value={row.value}   checked={this.state.checkboxValues? this.state.checkboxValues[row.value]: '' }
                 onChange={this.handleInputChange}/><label htmlFor={row.value} className="css-label"></label>
               </div>
             ),
             filterMethod: (filter, row) => {
                   if (filter.value === "all") {
                     return true;
                   }
                   if (filter.value === "mis") {
                     return this.state.checkboxValues[row.id];
                   }
                 },
                 Filter: ({ filter, onChange }) =>
                   <select
                     onChange={event => onChange(event.target.value)}
                     style={{ width: "100%" }}
                     value={filter ? filter.value : "all"}
                   >
                     <option value="all">Todas</option>
                     <option value="mis">Mis suscripciones</option>

                   </select>
           }
           ]}

          defaultPageSize={10}
          className="-striped -highlight"
       />
       <br/>
      <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Guardar Cambios</button>
   </form>

    );
  }
}

export default ListaTopicos;
