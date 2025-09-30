import cliente from '../data/cliente.json'

function Home() {


    return (
        <>
            <h2>Pagina de Home</h2>

            <p>Bienvenida {cliente.nombre} {cliente.apellido}, tu estado es {cliente.activo}</p>
        </>

    )
}
export { Home }