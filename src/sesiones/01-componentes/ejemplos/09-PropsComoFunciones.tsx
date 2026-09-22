function saludarDesdePadreUno() {
    alert("El componente parent envio el primer saludo");
}

function saludarDesdePadreDos() {
    alert("El componente parent envio el segundo saludo");
}

function saludarDesdePadreTres() {
    alert("El componente parent envio el tercer saludo");
}

type BotonSaludarPropsType = {
    onSaludar: () => void
}

function BotonSaludar({ onSaludar }: BotonSaludarPropsType) {
    return (
        <button className="button" type="button" onClick={onSaludar}>
            Saludar desde el Parent
        </button>
    )
}


export function EjemploPropFuncion() {
    return (
        <section className="lesson" id="funciones" aria-labelledby="funciones-title">
            <header className="lesson-heading">
                <span className="lesson-number">09</span>
                <h2 id="funciones-title">El padre entrega una función</h2>
            </header>
            <p>onSaludar es una prop elegida por nosotros. El padre entrega una función y el hijo la conecta al clic. El tipo de onSaludar describe una función sin argumentos cuyo resultado no usamos.</p>
            <pre><code>{"type BotonSaludarProps = {\n  onSaludar: () => void\n}\n\nfunction BotonSaludar({ onSaludar }: BotonSaludarProps) {\n  return (\n    <button className=\"button\" type=\"button\" onClick={onSaludar}>\n      Saludar desde el padre\n    </button>\n  )\n}\n\nfunction saludarDesdePadre() {\n  alert('El padre decidió este saludo.')\n}\n\n<BotonSaludar onSaludar={saludarDesdePadre} />"}</code></pre>

            <BotonSaludar onSaludar={saludarDesdePadreUno} />
            <BotonSaludar onSaludar={saludarDesdePadreDos} />
            <BotonSaludar onSaludar={saludarDesdePadreTres} />

            <p className="prompt">Cambia el mensaje en saludarDesdePadre. ¿Necesitas modificar BotonSaludar?</p>
        </section>
    )
}

// Esto son ejemplos de funciones
function miFuncion() {
    return "me invocaron";
}

miFuncion();

let otraFuncion = miFuncion;

otraFuncion();

let terceraFuncion = function () {
    return "tambien me invocaron";
}
terceraFuncion();

let cuartaFuncion = () => {
    return "tambien me invocaron";
}
cuartaFuncion();

let saludarPersona = () => (
    `hola a todos`
)


saludarPersona();

let persona = {
    nombre: "Rocio",
    saludar: () => (
        `hola a todos`
    )
}

persona.saludar();