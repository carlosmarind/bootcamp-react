import { useEffect, useState } from "react";

type PokemonListado = {
    name: string
    url: string
}

type RespuestaPokeApi = {
    results: PokemonListado[]
}

export function EjemploPokeApi() {

    const [pokemones, setPokemones] = useState<PokemonListado[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {

        fetch("https://pokeapi.co/api/v2/pokemon?limit=10", {
            method: 'GET',
            headers: {
                apikey: '12323dasfdas',
                otra: "verduras"
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error en llamada HTTP')
            }
            return response.json() as Promise<RespuestaPokeApi>
        }).then((respuestaFinal) => {
            setPokemones(respuestaFinal.results);
            console.log("llamada api", respuestaFinal.results);
        })
    }, []);
    return (
        <section className="lesson" id="poke-api" aria-labelledby="poke-api-title">
            <header className="lesson-heading">
                <span className="lesson-number">08</span>
                <h2 id="poke-api-title">Cargar una tabla desde PokeAPI</h2>
            </header>
            <p>Este efecto aplica <code>Promise.all</code> en un caso real. Realiza una petición GET cuando el componente aparece y después usa las URL recibidas para obtener el identificador y la imagen de cada Pokémon.</p>
            <p>El bucle <code>for...of</code> crea una petición por cada Pokémon y las guarda en un arreglo. Después, <code>Promise.all</code> espera que todas terminen antes de construir la tabla.</p>
            <p>El arreglo vacío <code>[]</code> indica que el efecto se ejecuta al montar el componente.</p>
            <p>La petición activa usa promesas con <code>then()</code>. Debajo dejamos comentada la misma idea con <code>async/await</code>. Usa solo una versión a la vez.</p>
            <pre><code>{"fetch(URL_POKEMON)\n  .then((respuesta) => respuesta.json())\n  .then((datos) => {\n    const peticionesDetalle = []\n\n    for (const pokemon of datos.results) {\n      const peticion = fetch(pokemon.url)\n        .then((respuesta) => respuesta.json())\n        .then((detalle) => ({\n          ...pokemon,\n          id: detalle.id,\n          imagen: detalle.sprites.front_default,\n        }))\n\n      peticionesDetalle.push(peticion)\n    }\n\n    // Espera que todas las peticiones terminen.\n    return Promise.all(peticionesDetalle)\n  })\n  .then((pokemonesConImagen) => {\n    setPokemones(pokemonesConImagen)\n  })"}</code></pre>
            <pre><code>{"/* Alternativa con async/await\nconst peticionesDetalle = []\n\nfor (const pokemon of datos.results) {\n  peticionesDetalle.push(cargarDetalle(pokemon))\n}\n\n// Espera que todas las peticiones terminen.\nconst pokemonesConImagen = await Promise.all(\n  peticionesDetalle\n)\n\nsetPokemones(pokemonesConImagen)\n*/"}</code></pre>

            <article className="card">
                <h3>Mis pokemones</h3>
                {pokemones.map((pokemon) => { return <p key={pokemon.name}>{pokemon.name}</p> })}
            </article>

        </section>
    )
}