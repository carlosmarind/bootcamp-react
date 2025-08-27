import React, { useState } from 'react'

type Props = {
    nombre: string,
    edad: number,
    children?: React.ReactNode
}

function Card(props: Props) {

    const [count, setCount] = useState(0)
    const [contador, setContador] = useState(0)
    const presentador = "Eugenia";
    const mensajeGenerico = <h3>Mensaje de saludo inicial</h3>;
    const mensajePersonalizado = <h3>Mensaje de saludo inicial a {presentador}</h3>;
    return (
        <>
            <div className="card">
                <h2>Hola {props.nombre} , con edad {props.edad}</h2>
                {
                    presentador !== props.nombre ?
                        mensajeGenerico :
                        mensajePersonalizado
                }
                <h3>{
                    presentador === props.nombre ? <div>El presentador es {presentador}</div> : <span>El presentador no es {presentador}</span>
                }</h3>
                <div>{props.children}</div>
                <button onClick={() => setCount(function (valorActual) {
                    console.log(`imprimiendo el valor actual de el estado count ${valorActual}`)
                    return valorActual + 1
                })}>
                    count is {count}
                </button>
                <button onClick={() => setContador(contador + 1)}>
                    count is {contador}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
        </>
    )
}
export { Card }