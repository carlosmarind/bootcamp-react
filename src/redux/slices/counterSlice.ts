import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/*
  Archivo: counterSlice.ts
  Contenido: slice para el contador (counter) con acciones para incrementar,
  decrementar, resetear y actualizar el contador con un número específico.

  - Un "slice" en Redux Toolkit agrupa: estado inicial, reducers y acciones.
  - `createSlice` genera automáticamente las acciones y el reducer.
  - Las funciones dentro de `reducers` parecen mutar el estado (p.ej. state++),
    pero en realidad ReduxToolKit usa "Immer" por debajo: puedes escribir código mutable
    y se aplicará de forma inmutable (safe) al estado final.

  Cómo usar este slice en un componente (ejemplo):
  - dispatch(increment())
  - dispatch(decrement())
  - dispatch(updateByNumber(10))
  - dispatch(reset())
  - obtener valor: const value = useSelector((s: RootState) => s.counter)
*/

const counterSlice = createSlice({
    // Nombre del slice: usado para prefijar el tipo de las acciones (p.ej. 'counter/increment')
    name: 'counter',
    // Estado inicial: en este caso un número simple
    initialState: 1,
    // Reducers: funciones que reciben (state, action) y devuelven el nuevo estado
    reducers: {
        // reset: vuelve a 0
        /**
         * reset
         * --------
         * ¿Qué hace?: Restablece el contador a 0.
         * ¿Por qué devolvemos un valor (return)?
         * - El estado del slice es un valor primitivo (number). Con valores primitivos
         *   no es suficiente reasignar la variable `state`, hay que `return` el nuevo valor.
         * - Si no retornas el valor, Immer no detectará el cambio y el estado no se actualizará.
         *
         * Ejemplo de uso:
         *  dispatch(reset());
         */
        reset: () => 0 // Retornamos 0 (return implicito en funciones flecha) para reemplazar el valor primitivo del slice
        ,
        // increment: suma 1
        /**
         * increment
         * ---------
         * ¿Qué hace?: Incrementa el contador en 1.
         * ¿Por qué retornamos? Porque el estado es primitivo (number). Retornar la expresión
         * asegura que Immer reemplace el valor actual por el nuevo.
         *
         * Ejemplo de uso:
         *  dispatch(increment());
         */
        increment: (state) => state + 1 // Retornamos estado + 1 (return implicito en funciones flecha) para reemplazar el valor primitivo del slice
        ,
        // decrement: resta 1
        /**
         * decrement
         * ---------
         * ¿Qué hace?: Decrementa el contador en 1.
         * Nota: igual que `increment`, retornamos la nueva primitiva.
         *
         * Ejemplo:
         *  dispatch(decrement());
         */
        decrement: (state) => state - 1 // Retornamos 0 estado - 1 (return implicito en funciones flecha) para reemplazar el valor primitivo del slice
        ,
        // updateByNumber: actualiza el contador con el número que venga en action.payload
        /**
         * updateByNumber
         * ---------------
         * ¿Qué hace?: Actualiza el contador con un número especificado por `action.payload`.
         * Parámetros: `action.payload` debe ser un `number`.
         *
         * Nota importante:
         * - Al tratarse de un valor primitivo, debemos devolver la nueva primitiva (return).
         * - No uses `state = action.payload;` sin `return` porque no cambia el estado externo.
         *
         * Ejemplo:
         *  dispatch(updateByNumber(10)); // el contador quedará en 10
         */
        updateByNumber: (_state, action: PayloadAction<number>) => action.payload // Retornamos  el numero que tenga el payload (return implicito en funciones flecha)
    }
});

// Exportar las acciones para que los componentes las puedan despachar
export const { increment, decrement, updateByNumber, reset } = counterSlice.actions;

// Exportar el reducer del slice como default (para combinar en rootReducer)
export default counterSlice.reducer;

/*
    Nota didáctica: ¿Qué es un "primitivo" y cuál es su diferencia con un objeto?
    ------------------------------------------------------------------------
    1) Primitivo (primitive):
         - Son tipos simples y se copian por valor. Ejemplos: number, string, boolean,
             null, undefined, symbol, bigint.
         - Al asignarlos a otra variable, se crea una copia del valor.
             Ejemplo: let a = 1; let b = a; b = 2; // a sigue siendo 1
         - En reducers, si el estado del slice es un primitivo (p.ej. contador: number),
             debes devolver el nuevo valor con `return` (no basta asignar la variable local `state`).

    2) Objeto (object):
         - Son estructuras con propiedades (arrays, objetos literales, funciones, Map, etc.).
         - Se manejan por referencia; al asignarlos a otra variable, ambas apuntan al mismo objeto.
             Ejemplo: let obj = {x:1}; let a = obj; a.x = 2; // obj.x ahora es 2
         - En reducers (RTK con Immer), puedes "mutar" el draft de estado (p.ej. state.prop = 1)
             porque Immer aplicará esos cambios de forma inmutable por debajo.
         - Si quieres reemplazar el objeto completo, usa `return newObject`.

    Resumen práctico para reducers:
    - Si el estado es primitivo: usa `return nuevoValor`.
    - Si el estado es un objeto/array:
        - Para cambiar una propiedad o elemento: muta `state` (ej. state.total = x).
        - Para reemplazar todo el objeto: `return nuevoObjeto`.
    - Evita reasignar `state = ...` sin `return` cuando el estado sea primitivo.
*/