export function Ejercicio() {
  return (
    <section className="exercise" id="router-reto" aria-labelledby="router-reto-title">
      <p className="eyebrow">Tu turno</p>
      <h2 id="router-reto-title">Tu turno: una biblioteca navegable</h2>
      <p>Retoma los libros de la práctica de componentes. Agrega una biblioteca a esta aplicación usando el router que ya existe.</p>
      <ul>
        <li>El principito — Antoine de Saint-Exupéry — id: <code>principito</code>.</li>
        <li>Cien años de soledad — Gabriel García Márquez — id: <code>cien-anos</code>.</li>
        <li>Papelucho — Marcela Paz — id: <code>papelucho</code>.</li>
      </ul>
      <ol>
        <li>Crea <code>/biblioteca</code> con el listado y un enlace al detalle de cada libro.</li>
        <li>Usa una sola página para los tres detalles: <code>/biblioteca/:libroId</code>.</li>
        <li>Muestra título y autor. Si el id no existe, muestra “Libro no encontrado” y un enlace al listado.</li>
        <li>Agrega Biblioteca al menú y comprueba que permanece activo dentro de los detalles.</li>
        <li>Prueba un enlace, una URL escrita directamente y los botones Atrás y Adelante.</li>
        <li>Crea todos tus componentes en esta carpeta de ejercicios.</li>
      </ol>
      <p>No necesitas CSS nuevo ni una API. Usa un arreglo local, exportaciones nombradas y componentes pequeños.</p>
      <details>
        <summary>¿Cómo empiezo?</summary>
        <p>Crea primero una página con un título y registra su ruta. Cuando funcione, agrega los libros y sus enlaces.</p>
      </details>
      <details>
        <summary>El detalle no encuentra el libro</summary>
        <p>Compara tres valores: el nombre del parámetro en Route, el que lees con useParams y el id guardado en el arreglo.</p>
      </details>
      <details>
        <summary>La ruta existe, pero solo veo el menú</summary>
        <p>Revisa el Outlet del componente padre y dónde declaraste la ruta hija.</p>
      </details>
      <p className="prompt">Antes de terminar, explica el recorrido completo: clic → URL → Route → useParams → libro encontrado → contenido visible.</p>
    </section>
  )
}
