import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    // el nombre de nuestro slice
    name: 'counter',
    // el valor inicial de nuestro slice
    initialState: 1,
    // funciones de actualizacion del estado, pueden ser todas las que queramos
    // y se pueden llamar como queramos.
    reducers: {
        increment: (state) => {
            return state = state + 1
        },
        decrement: (state) => {
            return state = state - 1
        },
    }
})

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;