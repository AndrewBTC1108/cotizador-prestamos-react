import React, { createContext, useContext, useReducer, useRef } from 'react';

// Crear un contexto para el contador
const CounterContext = createContext();

// Definir el reducer para el contador
const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            return state;
    }
}

// Componente de contador
// Componente de contador
function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const inputRef = useRef(null);

    const resetCount = () => {
        dispatch({ type: 'reset' });
        inputRef.current.value = '0'; // Actualiza el valor del input
        inputRef.current.focus();
    };

    const incrementCount = () => {
        dispatch({ type: 'increment' });
        inputRef.current.value = state.count + 1; // Actualiza el valor del input
        inputRef.current.focus();
    };

    const decrementCount = () => {
        dispatch({ type: 'decrement' });
        inputRef.current.value = state.count - 1; // Actualiza el valor del input
        inputRef.current.focus();
    };

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            <div className="bg-gray-200 p-4 rounded-lg">
                <p className="text-xl font-semibold mb-4">Count: {state.count}</p>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                    onClick={incrementCount}
                >
                    Increment
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2"
                    onClick={decrementCount}
                >
                    Decrement
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                    onClick={resetCount}
                >
                    Reset
                </button>
            </div>
            <TextInput inputRef={inputRef} />
        </CounterContext.Provider>
    );
}

// Componente de entrada de texto
function TextInput({ inputRef }) {
    const { state } = useContext(CounterContext);

    return (
        <div className="mt-4">
            <p className="text-xl font-semibold">Count in TextInput: {state.count}</p>
            <input
                type="text"
                className="border rounded px-2 py-1 mt-2 focus:outline-none focus:border-blue-500"
                ref={inputRef}
            />
        </div>
    );
}
export default Counter;