import { useEffect, useState } from "react";
import { set } from "zod";
import { tr } from "zod/locales";

type PokemonListado = {
    name: string
    url: string
}

type RespuestaPokeApi = {
    results: PokemonListado[]
}

type PokemonDetalle = {
    id: number
    sprites: {
        front_default: string
    }
}

type Pokemon = PokemonListado & {
    id: number
    imagen: string
}

export function EjemploPokeApi() {

    const [pokemones, setPokemones] = useState<Pokemon[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {


        const cargarDetalle = async (pokemon: PokemonListado): Promise<Pokemon> => {

            const respuestaDetalle = await fetch(pokemon.url);

            if (!respuestaDetalle.ok) {
                throw new Error(`Error HTTP : ${respuestaDetalle.status}`)
            }

            const detalle: PokemonDetalle = await respuestaDetalle.json()

            return ({
                name: pokemon.name,
                url: pokemon.url,
                id: detalle.id,
                imagen: detalle.sprites.front_default
            })
        }


        const queryPokemones = async () => {
            setCargando(true)
            try {
                //intenta este codigo
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10", {
                    method: 'GET',
                    headers: {
                        apikey: '12323dasfdas',
                        otra: "verduras"
                    }
                })
                if (!response.ok) {
                    throw new Error('Error en llamada HTTP')
                }
                const responsePokeApi: RespuestaPokeApi = await response.json();

                const listadoPokemones: Promise<Pokemon>[] = [];

                for (const pokemonGeneral of responsePokeApi.results) {
                    // por cada uno
                    //const pokemon = await cargarDetalle(pokemonGeneral)
                    //listadoPokemones.push(pokemon);

                    //todos
                    listadoPokemones.push(cargarDetalle(pokemonGeneral))
                }
                // por cada uno
                //setPokemones(listadoPokemones)

                //todos
                const pokemonesResueltos = await Promise.all(listadoPokemones);
                setPokemones(pokemonesResueltos);

                console.log("llamada api", responsePokeApi.results);
            } catch (error) {
                //que hago en caso de error
                console.log(error)
                setError("No fue posible cargar pokemones")
            } finally {
                //Esto se ejecuta a todo evento al terminar ya sea por try o por catch
                setCargando(false)
            }
        }

        queryPokemones()

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
                {cargando ? <p>Cargando pokemones</p> : null}
                {error ? <p role="alert">Problemas al cargar pokemones: {error}</p> : null}

                <h3>Mis pokemones</h3>

                {!cargando && !error ? (
                    <table>
                        <caption>Primeros pokemones</caption>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Enlace</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemones.map((pokemon) => {
                                return (
                                    <tr key={pokemon.id}>
                                        <td>{pokemon.id}</td>
                                        <td> <img src={pokemon.imagen} alt={`Imagen de ${pokemon.name}`}></img></td>
                                        <td>{pokemon.name}</td>
                                        <td><a href={pokemon.url}>Ver JSON</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                ) : null}
            </article>
        </section>
    )
}