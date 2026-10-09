import { useEffect, useState } from "react"

export function SinDependencias() {

    const [contador, setContador] = useState(0)
    const [curso, setCurso] = useState("React")

    useEffect(() => {
        console.log("El efecto (useEffect) sin ninguna dependencia, se ejecuto", { contador, curso })
    })
    // este es innecesario, pero es bueno ejemplificar que se pueden tener varios useEffect
    useEffect(() => {
        console.log("Segundo El efecto (useEffect) sin ninguna dependencia, se ejecuto", { contador, curso })
    })

    return (
        <article className="card">
            <h2>Contador: {contador}</h2>
            <button className="button" type="button" onClick={() => setContador((valorActual) => valorActual + 1)}>Incrementar</button>
            <br />
            <label>
                <p>Curso:</p>
                <select value={curso} onChange={(evento) => setCurso(evento.target.value)}>
                    <option>React</option>
                    <option>JavaScript</option>
                </select>
            </label>
        </article>
    )
}