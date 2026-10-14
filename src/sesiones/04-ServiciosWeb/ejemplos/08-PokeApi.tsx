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
        <>
            <h3>
                Mi PokeApi
            </h3>
            {pokemones.map((pokemon) => { return <p key={pokemon.name}>{pokemon.name}</p> })}
        </>
    )
}