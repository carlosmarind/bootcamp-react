import { configureStore, type Middleware } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import productSlice from "./productSlice";

const modStoreMiddleware: Middleware = (store) => (next) => (action) => {
    // todo lo que esta aqui antes del next(action)
    // se ejecuta ANTES de invocar al reducer.
    //console.log(action)
    //console.log("Imprimiendo store antes del next:", store.getState());

    next(action);
    // todo lo que esta aqui DESPUES del next(action)
    // se ejecuta DESPUES de haber invocado al reducer.
    // es decir, cuando el estado YA CAMBIO.
    // console.log("Imprimiendo store despues del next:", store.getState());

    const inputAction = action.type;
    // action = {
    // type: string <---- nombreSlice/nombreReducer
    // payload: Depende 
    //}

    if (inputAction.startsWith('counter')) {
        console.log('llamando reducer de couterSlice');
    }
    if (inputAction.startsWith('products')) {
        console.log('llamando reducer de productsSlice');
        const state = store.getState();
        localStorage.setItem("carrito", JSON.stringify(state.products));
    }
}

const store = configureStore({
    reducer: {
        counter: counterSlice,
        products: productSlice,
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(modStoreMiddleware)
})

export type RootType = ReturnType<typeof store.getState>
export { store }