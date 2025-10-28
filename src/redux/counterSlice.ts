import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    // el nombre de nuestro slice
    name: 'counter',
    // el valor inicial de nuestro slice
    initialState: 1,
    // funciones de actualizacion del estado, pueden ser todas las que queramos
    // y se pueden llamar como queramos.
    reducers: {
        reset: (state) => {
            state = 0
            return state;
        },
        increment: (state) => {
            return state = state + 1
        },
        decrement: (state) => {
            return state = state - 1
        },
        updateByNumber: (state, action: PayloadAction<number>) => {
            state = action.payload;
            return state;
        }
    }
})

export const { increment, decrement, updateByNumber, reset } = counterSlice.actions;
export default counterSlice.reducer;