import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import productSlice from "./productSlice";

const store = configureStore({
    reducer: {
        counter: counterSlice,
        products: productSlice,
    }
})

export type RootType = ReturnType<typeof store.getState>
export { store }