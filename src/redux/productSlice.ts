import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

type CartProduct = Product & {
    cantidad: number;
};

type productSliceType = {
    productList: CartProduct[],
    total: number
    createAt: number
}

const defaultInitialState: productSliceType = {
    productList: [],
    total: 0,
    // new Date()  <- objeto fecha de javascript
    // new Date().getTime() <- getTime devuelve los milisegundos transcurridos desde el 1 de enero de 1970 a la fecha actual
    // si se divide por 1000 ( /1000 ), se tienen los segundos.
    createAt: new Date().getTime()
}

const initialState = () => {
    const fechaActual = new Date().getTime();
    // cuantos segundos hay en un dia
    const duracionCarrito = 60 * 60 * 24 // <- segundos * minutos * horas del dia.

    const estadoCarrito = localStorage.getItem("carrito");

    const carritoRespaldado = JSON.parse(estadoCarrito) as productSliceType;

    const segundosTranscurridosCarrito = (fechaActual - carritoRespaldado.createAt) / 1000;

    if (segundosTranscurridosCarrito > duracionCarrito) {
        return defaultInitialState;
    }

    return carritoRespaldado;
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {

            const newProduct: CartProduct = { ...action.payload, cantidad: 1 }

            let exists = false;

            state.productList.forEach((producto) => {
                if (newProduct.id === producto.id) {
                    producto.cantidad++
                    exists = true;
                }
            })

            if (!exists) {
                state.productList.push(newProduct)
            }

            let newTotal = 0;
            state.productList.forEach(producto => {
                newTotal = newTotal + (producto.valor * producto.cantidad);
            })
            state.total = newTotal;
            state.createAt = new Date().getTime();
        },

        removeProduct: (state, action: PayloadAction<number>) => {

            const newProductList = state.productList.filter((product) => {

                if (product.id !== action.payload) {
                    return true;
                }
                if (product.cantidad <= 1) {
                    return false;
                }
                product.cantidad--;
                return true;
            });

            let newTotal = 0;
            newProductList.forEach(producto => {
                newTotal = newTotal + (producto.valor * producto.cantidad);
            })

            state.total = newTotal;
            state.productList = newProductList;
            state.createAt = new Date().getTime();

        },
        emptyProducts: (state) => {
            return state = defaultInitialState;
        }
    }
})

export const { addProduct, removeProduct, emptyProducts } = productSlice.actions;
export default productSlice.reducer;
export type { CartProduct };