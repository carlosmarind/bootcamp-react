function retornaLista() {
    const listaNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return listaNumeros;
}

function destructuracion() {

    const [a, b, ...resto] = retornaLista();
    console.log(a, b, resto)

    let persona = {
        nombre: "Adriana",
        apellido: "Lopez",
        edad: 35,
        nacionalidad: "chilena"
    }

    const { nombre, apellido } = persona;
    const { edad } = persona;
    const { nacionalidad } = persona;

    const persona2 = {
        nombre: "Alejandra",
        apellido: "Diaz",
        edad: 30,
        nacionalidad: "Colombia",
        fallecida: true
    }

    persona = persona2;
    const persona3 = { ...persona2 }
    persona2.edad = 50;
    persona3.edad = 60

    const llave = "apellido";

    persona[llave] = "Camila";


    const nuevoAtributo = "vacunado";
    const persona4 = { ...persona, altura: 1.5, [nuevoAtributo]: true }

    return (
        <div>
            <p>{nombre} y {apellido} y {edad} y {nacionalidad}</p>
            <p>{persona.edad}</p>
            <p>{persona2.edad}</p>
            <p>{persona3.edad}</p>
            <p>{JSON.stringify(persona)}</p>
            <p>{JSON.stringify(persona4)}</p>
        </div>
    )
}

export { destructuracion }