import React, { Component } from 'react'
class SeccionNoticias extends Component{

  state = {
      search: "",
      orden: "Nombre",
      isLoading: true,
      noticias: [
                {
                    "url": "http://www.editorandpublisher.com/Technology/Article/The-Coral-Project-Is-Building-Its-First-Product--A-Listening-Tool",
                    "topics": [
                        {

                            "weight": "0.32028928",
                            "id": 7
                        },
                        {
                            "weight": "0.32028928",
                            "id": 8
                        },
                        {
                            "weight": "0.32028928",
                            "id": 9
                        },
                        {
                            "weight": "0.32028928",
                            "id": 10
                        },
                        {
                            "weight": "0.32028928",
                            "id": 11
                        },
                        {
                            "weight": "0.32028928",
                            "id": 12
                        },
                        {
                            "weight": "0.32028928",
                            "id": 13
                        },
                        {
                            "weight": "0.32028928",
                            "id": 14
                        },
                        {
                            "weight": "0.32028928",
                            "id": 15
                        },
                        {
                            "weight": "0.32028928",
                            "id": 16
                        },
                        {
                            "weight": "0.2456999",
                            "id": 71
                        },
                        {
                            "weight": "0.2456999",
                            "id": 72
                        },
                        {
                            "weight": "0.2456999",
                            "id": 73
                        },
                        {
                            "weight": "0.2456999",
                            "id": 74
                        }
                    ],
                    "title": "The Coral Project Is Building Its First Product: A Listening Tool",
                    "text": "print page joseph lichterman niemanlab since earnest spring members coral project collaborative effort community engagement around news hear people everyone troll plague comment section representatives different organizations different countries",
                    "summary": "Print Page by: Joseph Lichterman | NiemanLab Since it launched in earnest this spring, members of the Coral Project, a collaborative effort to rethink community engagement around news, have heard from all kinds of people. They’ve talked with everyone from trolls who plague comment sections to representatives from more than 125 different organizations in 25 different countries.",
                    "source_name": "www.editorandpublisher.com",
                    "source_id": 1,
                    "published": "02/10/2015",
                    "main_image": "https://gatling.io/wp-content/uploads/2017/10/medium-logo.jpg",
                    "int_published": 172,
                    "cat_date": "14/10/2018"
                },
                {
                    "url": "http://www.editorandpublisher.com/Technology/Article/The-Coral-Project-Is-Building-Its-First-Product--A-Listening-Tool",
                    "topics": [
                        {

                            "weight": "0.32028928",
                            "id": 7
                        },
                        {
                            "weight": "0.32028928",
                            "id": 8
                        },
                        {
                            "weight": "0.32028928",
                            "id": 9
                        },
                        {
                            "weight": "0.32028928",
                            "id": 10
                        },
                        {
                            "weight": "0.32028928",
                            "id": 11
                        },
                        {
                            "weight": "0.32028928",
                            "id": 12
                        },
                        {
                            "weight": "0.32028928",
                            "id": 13
                        },
                        {
                            "weight": "0.32028928",
                            "id": 14
                        },
                        {
                            "weight": "0.32028928",
                            "id": 15
                        },
                        {
                            "weight": "0.32028928",
                            "id": 16
                        },
                        {
                            "weight": "0.2456999",
                            "id": 71
                        },
                        {
                            "weight": "0.2456999",
                            "id": 72
                        },
                        {
                            "weight": "0.2456999",
                            "id": 73
                        },
                        {
                            "weight": "0.2456999",
                            "id": 74
                        }
                    ],
                    "title": "The Coral Project Is Building Its First Product: A Listening Tool",
                    "text": "print page joseph lichterman niemanlab since earnest spring members coral project collaborative effort community engagement around news hear people everyone troll plague comment section representatives different organizations different countries",
                    "summary": "Print Page by: Joseph Lichterman | NiemanLab Since it launched in earnest this spring, members of the Coral Project, a collaborative effort to rethink community engagement around news, have heard from all kinds of people. They’ve talked with everyone from trolls who plague comment sections to representatives from more than 125 different organizations in 25 different countries.",
                    "source_name": "www.editorandpublisher.com",
                    "source_id": 1,
                    "published": "02/10/2015",
                    "main_image": "https://1.bp.blogspot.com/-mzUd-rB3nB8/W8Ra22x4CiI/AAAAAAAAyYw/8wYlprvbNukXtkphLM-3LbAIKlSMwN7ygCLcBGAs/s728-e100/android-cloud-backup-encryption.jpg",
                    "int_published": 172,
                    "cat_date": "14/10/2018"
                },
                {
                    "url": "http://www.editorandpublisher.com/Technology/Article/The-Coral-Project-Is-Building-Its-First-Product--A-Listening-Tool",
                    "topics": [
                        {

                            "weight": "0.32028928",
                            "id": 7
                        },
                        {
                            "weight": "0.32028928",
                            "id": 8
                        },
                        {
                            "weight": "0.32028928",
                            "id": 9
                        },
                        {
                            "weight": "0.32028928",
                            "id": 10
                        },
                        {
                            "weight": "0.32028928",
                            "id": 11
                        },
                        {
                            "weight": "0.32028928",
                            "id": 12
                        },
                        {
                            "weight": "0.32028928",
                            "id": 13
                        },
                        {
                            "weight": "0.32028928",
                            "id": 14
                        },
                        {
                            "weight": "0.32028928",
                            "id": 15
                        },
                        {
                            "weight": "0.32028928",
                            "id": 16
                        },
                        {
                            "weight": "0.2456999",
                            "id": 71
                        },
                        {
                            "weight": "0.2456999",
                            "id": 72
                        },
                        {
                            "weight": "0.2456999",
                            "id": 73
                        },
                        {
                            "weight": "0.2456999",
                            "id": 74
                        }
                    ],
                    "title": "The Coral Project Is Building Its First Product: A Listening Tool",
                    "text": "print page joseph lichterman niemanlab since earnest spring members coral project collaborative effort community engagement around news hear people everyone troll plague comment section representatives different organizations different countries",
                    "summary": "Print Page by: Joseph Lichterman | NiemanLab Since it launched in earnest this spring, members of the Coral Project, a collaborative effort to rethink community engagement around news, have heard from all kinds of people. They’ve talked with everyone from trolls who plague comment sections to representatives from more than 125 different organizations in 25 different countries.",
                    "source_name": "www.editorandpublisher.com",
                    "source_id": 1,
                    "published": "02/10/2015",
                    "main_image": "https://1.bp.blogspot.com/-q3cMxsYAdbQ/W8HDLUu0pYI/AAAAAAAAyYQ/rXDPjQsaYqcrP4gpok18Y93z3lVh_aUFwCLcBGAs/s728-e100/hack-facebook-account.jpg",
                    "int_published": 172,
                    "cat_date": "14/10/2018"
                }
    ]
  };




    DesplegarNoticia(noticia,search){
      return(

      <div className="Div-Articulo">
      <div className="row">
      <div className="col-sm-3 no-padding-left">
      <img alt = {noticia.title} className= "imagen-articulo" src={noticia.main_image} />
      </div>
      <div className="col-sm-9 no-padding">
      <a href = {noticia.url}><h4 className="titulo-articulo">{noticia.title}</h4></a>
      <p className="resumen-articulo">{noticia.summary}</p>
      </div>
      </div>
      </div>);
    }


      componentDidMount() {
               fetch("http://localhost:4000/api/relevant_suggestions?topic_id=" + this.props.id, {
                   method: 'GET',
                   headers: {
                     'Content-Type': 'application/json',
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
                     console.log(res.data,res.status)
                     this.setState({noticias:res.data,isLoading:false});

                   });

                 } else {
                   console.log('bad request');
                 }
               })
               .catch(function(error) {
                 console.log('Hubo un problema con la petición Fetch:' + error.message);
               });
           }


  HandleSearch(event) {
    if (true) {
       const target = event.target;
       const valor_busqueda = target.value;
       this.setState({search: valor_busqueda});
    }

  }
  HandleOrden(event,valor) {
       console.log(valor);
       if(this.state.orden !== valor){
          this.setState({ orden: valor });
       }
   }


  render(){

    if(!(this.state.isLoading)){
      return(
        <div >
        <div className="margin-top">
      {this.state.noticias.map((noticia,i,arr) => (
       this.DesplegarNoticia(noticia,this.props.search)
     ))}  </div> </div>);
    }
    else{



    return (

        <div >

        </div>

    );}
  }
}

export default SeccionNoticias;
