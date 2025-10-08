import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
        updateByNumber: (state, action: PayloadAction<number>) => {
            return state = action.payload;
        }
    }
})

export const { increment, decrement, updateByNumber} = counterSlice.actions;
export default counterSlice.reducer;