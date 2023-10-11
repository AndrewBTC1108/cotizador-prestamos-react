import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Button from './components/Button';
import { formatearDinero, calcularTotalPagar } from './helpers';
function App() {
  /*
  JSX es una sintaxis que permite combinar JS y HTML 
  en la parte del return, todos los elementos HTML se pueden utilizar
  pero no todas las funciones de JS se pueden utilizar
  */

  /*
    state
    no modificar el state directamente
  */
  const [cantidad, setCantidad] = useState(10000); //cantidad con la que empezara
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  //Hook use efect, se ejecuta una vez que el componente este listo y toma un array de dependencias
  //en su listado de dependencias se le puede pasar un state para "escuchar" los cambios que ocurren
  //en ese state, en caso de que el state se actualice el useEffect se va a ejecutar nuevamente
  //al cambiar el valor del arreglo de dependencias se llamara el useEfect
  useEffect(() => {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);
  }, [cantidad, meses]);

  useEffect(() => {
    //calcular el pago mensual
    setPago(total / meses);
  }, [total]);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  /********************************************* */
  //convenciones
  function handleChange(e) {
    setCantidad(+e.target.value);
  }
  function handleClickDecremento() {
    const valor = cantidad - STEP;

    if (valor < MIN) {
      alert('Cantidad no valida');
      return;
    }

    setCantidad(valor);
  }
  function handleClickIncremento() {
    const valor = cantidad + STEP;

    if (valor > MAX) {
      alert('Cantidad no valida');
      return;
    }

    setCantidad(valor);
  }
  /************************************************************** */
  //lo que esta en el return es lo que se imprime en pantalla
  return (
    <>
      {/*class es una palabra reservada en Javascript por lo tanto para React debe ser className*/}
      <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header />

        <div className="flex justify-between my-6">
          {/* componente con props para los botones*/}
          <Button
            operador='-'
            fn={handleClickDecremento}
          />
          <Button
            operador='+'
            fn={handleClickIncremento}
          />
        </div>

        <input
          type="range"
          className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
          onChange={handleChange}
          min={MIN}
          max={MAX}
          step={STEP}
          value={cantidad}
        />

        <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
          {formatearDinero(cantidad)}
        </p>

        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Elige un <span className='text-indigo-600'>Plazo</span> a pagar
        </h2>

        <select
          className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center
          text-xl font-bold text-gray-500'
          value={meses}
          onChange={e => setMeses(+e.target.value)}
        >
          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
        </select>

        <div className='my-5 space-y-3 bg-gray-50 p-5'>
          <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
            Resumen <span className='text-indigo-600'>de pagos</span>
          </h2>

          <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
          <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
          <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} Mensuales</p>
        </div>
      </div>
    </>
  )
}

export default App
