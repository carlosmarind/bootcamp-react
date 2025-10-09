import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

type productSliceType = {
    productList: Product[],
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
            const newProduct = action.payload
            state.productList.push(newProduct)
            let newTotal = 0;
            state.productList.forEach(producto => {
                newTotal = newTotal + producto.valor;
            })
            state.total = newTotal;
        },
        removeProduct: (state, action: PayloadAction<number>) => {

            const newProductList = state.productList.filter((product) => {
                return product.id !== action.payload
            })

            let newTotal = 0;
            newProductList.forEach(producto => {
                newTotal = newTotal + producto.valor;
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