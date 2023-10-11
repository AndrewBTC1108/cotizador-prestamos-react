//este archivo main.jsx es el archivo principal, es el que se
//encarga de importar react
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Counter from './Counter.jsx'
import './index.css'
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <div className="App">
      <h1>Contador con useContext, useRef y useReducer</h1>
      <Counter />
    </div>
  </React.StrictMode>,
)
