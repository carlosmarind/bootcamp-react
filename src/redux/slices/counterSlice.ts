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
        reset: (state) => {
            state = 0;
            return state;
        },
        // increment: suma 1
        increment: (state) => {
            return state = state + 1;
        },
        // decrement: resta 1
        decrement: (state) => {
            return state = state - 1;
        },
        // updateByNumber: actualiza el contador con el número que venga en action.payload
        updateByNumber: (state, action: PayloadAction<number>) => {
            state = action.payload;
            return state;
        }
    }
});

// Exportar las acciones para que los componentes las puedan despachar
export const { increment, decrement, updateByNumber, reset } = counterSlice.actions;

// Exportar el reducer del slice como default (para combinar en rootReducer)
export default counterSlice.reducer;