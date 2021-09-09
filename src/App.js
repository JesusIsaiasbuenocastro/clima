import React,{ Fragment, useState, useEffect } from 'react';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';
import Error from './Components/Error';

function App() {

  const[busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais:''
  });

  const [ consultar,  guardarConsultar] = useState(false);
  const [ resultado,  guardarresultado] = useState({});
  const [ error,  guardarError] = useState(false);

  const { ciudad, pais }= busqueda;

  //En cuanto se carga la aplicacion entra aqui 
  useEffect( () => {    
    const consultarAPI = async () => {
      if(consultar){
        const appKey='1f1324cec94cc4386cae0adfadda67d9';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appKey}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarresultado(resultado);
        guardarConsultar(false);

        //Detecta si hubo resultados correctos en la consulta
        if(resultado.cod==="404"){
          guardarError(true);
        }else{
          guardarError(false);
        }
      }
    };
    consultarAPI();
    // Quitar los warning cuando marca que no se usan 
    // eslint-disable-next-line
  }, [consultar]);

  //Carga condicional de componentes
  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados"/>
  }else{
    componente =  <Clima
                    resultado={resultado}
                  />
  }

  return (
    <Fragment>
      <Header
      titulo={'React App'}
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
                <Formulario
                  busqueda = {busqueda}
                  guardarBusqueda = { guardarBusqueda}
                  guardarConsultar = { guardarConsultar }
                />
            </div>
            <div className="col m6 s12">
                {componente}
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default App;

