export function Ejercicio() {
  return (
    <section className="exercise" id="estados-reto" aria-labelledby="estados-reto-title">
      <p className="eyebrow">Tu turno</p>
      <h2 id="estados-reto-title">Tu turno: inscripciones para un taller</h2>
      <p>Construye un componente para inscribir personas a un taller. Usa como guía el formulario de la sección anterior y avanza en el siguiente orden.</p>
      <p>Implementa tu solución en el componente <code>Resolucion</code>, ubicado en <code>03-estados-forms/ejercicio/Resolucion.tsx</code>. Reemplaza el contenido de ejemplo que encontrarás en ese archivo.</p>

      <h3>Paso 1 · Prepara los datos</h3>
      <ul>
        <li>Crea un solo estado llamado <code>formulario</code> con los campos nombre, dirección, correo, curso, jornada, comentario y aceptación de condiciones.</li>
        <li>Los textos comienzan vacíos, el checkbox comienza en <code>false</code> y curso y jornada comienzan sin selección.</li>
        <li>Crea <code>usuarios</code> como un estado que comience con un arreglo vacío.</li>
        <li>Crea un estado booleano llamado <code>inscripcionesAbiertas</code> que comience en <code>true</code>.</li>
        <li>Crea un estado para guardar el resultado de la validación de Zod.</li>
      </ul>
      <p>El taller tendrá 5 cupos. No necesitas otro estado para los cupos disponibles: puedes calcularlos con <code>5 - usuarios.length</code>.</p>

      <h3>Paso 2 · Construye el formulario</h3>
      <p>Todos los controles deben leer y actualizar el objeto <code>formulario</code>:</p>
      <ul>
        <li>Nombre y dirección.</li>
        <li>Correo.</li>
        <li>Curso, con las opciones React y JavaScript.</li>
        <li>Jornada, con las opciones Mañana, Tarde y Ambas.</li>
        <li>Comentario opcional.</li>
        <li>Aceptación de las condiciones mediante un checkbox.</li>
      </ul>
      <p>Usa un botón de tipo <code>button</code> y ejecuta la función <code>enviarFormulario</code> con <code>onClick</code>.</p>

      <h3>Paso 3 · Valida antes de guardar</h3>
      <p>Crea un esquema de Zod con las mismas reglas del ejemplo:</p>
      <ul>
        <li>Nombre y dirección son obligatorios y aceptan hasta 64 caracteres.</li>
        <li>El correo debe tener un formato válido.</li>
        <li>Curso y jornada deben tener una opción seleccionada.</li>
        <li>El comentario puede tener hasta 200 caracteres.</li>
        <li>Las condiciones deben estar aceptadas.</li>
      </ul>
      <p>Dentro de <code>enviarFormulario</code>, usa <code>safeParse</code> y guarda su resultado. Si hay errores, muéstralos bajo cada control usando <code>map</code> y termina la función con <code>return</code>.</p>
      <p>Si la validación fue exitosa, los datos listos para guardar están en <code>validacion.data</code>. No agregues al arreglo el objeto original sin validar.</p>

      <h3>Paso 4 · Guarda y muestra las inscripciones</h3>
      <ol>
        <li>Crea un usuario con <code>crypto.randomUUID()</code> como identificador y agrega los datos validados.</li>
        <li>Agrega el usuario al arreglo sin modificar directamente el arreglo anterior. Usa la función de actualización del estado <code>setUsuarios</code>.</li>
        <li>Muestra una confirmación con el nombre de la persona inscrita.</li>
        <li>Muestra el total con <code>usuarios.length</code>.</li>
        <li>Muestra los cupos disponibles con <code>5 - usuarios.length</code>.</li>
        <li>Recorre <code>usuarios</code> con <code>map</code> y muestra al menos el nombre de cada persona.</li>
        <li>Usa el identificador de cada usuario como <code>key</code>.</li>
      </ol>

      <h3>Paso 5 · Abre o cierra las inscripciones</h3>
      <ul>
        <li>Agrega un botón que cambie <code>inscripcionesAbiertas</code> usando la función de actualización del estado <code>setInscripcionesAbiertas</code>.</li>
        <li>Muestra en pantalla si las inscripciones están abiertas o cerradas.</li>
        <li>Deshabilita el botón Inscribirme cuando las inscripciones estén cerradas o cuando los cupos disponibles sean 0.</li>
      </ul>

      <h3>Comprueba el resultado</h3>
      <ul>
        <li>Un formulario con errores no agrega usuarios.</li>
        <li>Un formulario correcto agrega exactamente un usuario.</li>
        <li>La lista muestra el nombre del nuevo usuario.</li>
        <li>El total aumenta y los cupos disponibles disminuyen.</li>
        <li>Al cerrar las inscripciones o completar los 5 cupos, el botón Inscribirme queda deshabilitado.</li>
      </ul>

      <p><strong>Desafío opcional:</strong> Agrega un botón para eliminar una persona. Como los cupos se calculan desde <code>usuarios.length</code>, el cupo se recuperará automáticamente.</p>

      <h3>Pistas · ábrelas solo si te atascas</h3>
      <details>
        <summary>¿Cómo actualizo cualquier campo del formulario?</summary>
        <p>Usa el atributo <code>name</code> de cada control. Crea un objeto nuevo con los datos anteriores y reemplaza solamente la propiedad que cambió.</p>
      </details>
      <details>
        <summary>¿Cómo creo el nuevo usuario?</summary>
        <p>Después de comprobar que <code>validacion.success</code> es verdadero, combina un identificador con <code>validacion.data</code>.</p>
      </details>
      <details>
        <summary>¿Cómo agrego el usuario al arreglo?</summary>
        <p>Entrega una función a <code>setUsuarios</code>. Esa función recibe el arreglo anterior y debe devolver un arreglo nuevo que también incluya al nuevo usuario.</p>
      </details>
      <details>
        <summary>TypeScript no me deja agregar usuarios al arreglo</summary>
        <p>Define un tipo <code>Usuario</code> con un <code>id</code> y los campos del formulario. Luego declara el estado como <code>useState&lt;Usuario[]&gt;([])</code>.</p>
      </details>
      <details>
        <summary>¿Cómo deshabilito el botón?</summary>
        <p>El botón debe quedar deshabilitado si las inscripciones no están abiertas o si <code>5 - usuarios.length</code> es igual a 0.</p>
      </details>

      <p className="prompt">Antes de terminar, explica el recorrido: cambio de un control → objeto formulario actualizado → validación → datos válidos → nuevo usuario → lista y cupos actualizados.</p>
    </section>
  )
}
