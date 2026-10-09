import { useEffect, useState } from "react"

export function DependenciasVacias() {
    const [contador, setContador] = useState(0)

    //se va a llamar solo cuando el componente se monte(muestre) por primera vez
    useEffect(() => {
        console.log("El efecto (useEffect) con dependencias Vacias, se ejecuto", { contador })
    }, [])

    return (
        < article className="card" >
            <h2>Contador: {contador}</h2>
            <button className="button" type="button" onClick={() => setContador((valorActual) => valorActual + 1)}>Incrementar</button>
        </article >
    )
}