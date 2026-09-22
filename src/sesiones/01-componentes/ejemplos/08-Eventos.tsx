function saludarClase() {
    alert('Hola, clase!');
    console.log("Han presionado el boton");
}

function BotonSaludoClase() {
    return (
        <button className="button" type="button" onClick={saludarClase} >
            Saludar a la clase
        </button>
    )
}

export function EjemploEventos() {
    return (
        <section className="lesson" id="eventos" aria-labelledby="eventos-title">
            <header className="lesson-heading">
                <span className="lesson-number">08</span>
                <h2 id="eventos-title">Esperar un clic antes de ejecutar</h2>
            </header>
            <p>onClick es el manejador de clic del botón HTML en React. Recibe una función. Escribir saludarClase sin paréntesis entrega la función; saludarClase() la ejecutaría durante el render.</p>
            <pre><code>{"function saludarClase() {\n  alert('¡Hola, clase!')\n}\n\nfunction BotonSaludoClase() {\n  return (\n    <button className=\"button\" type=\"button\" onClick={saludarClase}>\n      Saludar a la clase\n    </button>\n  )\n}\n\n<BotonSaludoClase />"}</code></pre>

            <BotonSaludoClase />

            <p className="prompt">Al cargar no debe aparecer una alerta. Pulsa el botón y sigue la llamada hasta saludarClase.</p>
        </section>
    )

}