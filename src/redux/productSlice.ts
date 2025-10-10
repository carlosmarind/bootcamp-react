import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

type CartProduct = Product & {
    cantidad: number;
};

type productSliceType = {
    productList: CartProduct[],
    total: number
}

const initialState: productSliceType = {
    productList: [],
    total: 0
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
        },

        removeProduct: (state, action: PayloadAction<number>) => {

            const newProductList = state.productList.filter((product) => {

                return product.id !== action.payload
            })

            let newTotal = 0;
            newProductList.forEach(producto => {
                newTotal = newTotal + (producto.valor * producto.cantidad);
            })

            state.total = newTotal;
            state.productList = newProductList;

        },
        emptyProducts: (state) => {
            return state = initialState;
        }
    }

})

export const { addProduct, removeProduct, emptyProducts } = productSlice.actions;
export default productSlice.reducer;
export type { CartProduct };