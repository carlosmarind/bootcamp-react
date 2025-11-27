import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";
import type { ProductSliceType } from "../../types/ProductSliceType";
import type { CartProduct } from "../../types/CartProduct";

/*
    Archivo: productSlice.ts
    Propósito: manejar el estado del carrito de compras (slice `products`).

    - `productList`: lista de productos en el carrito con su `cantidad`.
    - `total`: valor total del carrito.
    - `createAt`: timestamp para persistencia y caducidad del respaldo.

    Consejo: usar funciones nativas como `find`, `reduce` y `splice` hace
    el código más legible y evita loops manuales con banderas booleanas.
*/


const defaultInitialState: ProductSliceType = {
    productList: [],
    total: 0,
    createAt: Date.now(),
};

const initialState = () => {
    const now = Date.now();
    const secondsPerDay = 60 * 60 * 24;

    const estadoCarrito = localStorage.getItem("carrito");
    if (estadoCarrito) {
        try {
            const parsed = JSON.parse(estadoCarrito) as ProductSliceType;
            const ageInSeconds = (now - parsed.createAt) / 1000;
            if (ageInSeconds < secondsPerDay) return parsed;
        } catch {
            // ignorar errores de parseo y devolver default
        }
    }
    return defaultInitialState;
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const payload = action.payload;
            const existing = state.productList.find((p) => p.id === payload.id);
            if (existing) {
                existing.cantidad += 1;
            } else {
                state.productList.push({ ...payload, cantidad: 1 } as CartProduct);
            }
            state.total = state.productList.reduce((accumulator, p) => accumulator + p.valor * p.cantidad, 0);
            state.createAt = Date.now();
        },

        removeProduct: (state, action: PayloadAction<number>) => {
            const idToRemove = action.payload;
            const idx = state.productList.findIndex((p) => p.id === idToRemove);
            if (idx === -1) return;
            const product = state.productList[idx];
            if (product.cantidad > 1) {
                product.cantidad -= 1;
            } else {
                state.productList.splice(idx, 1);
            }
            state.total = state.productList.reduce((accumulator, p) => accumulator + p.valor * p.cantidad, 0);
            state.createAt = Date.now();
        },
        emptyProducts: () => {
            // retornamos el estado por defecto para limpiar el carrito
            return defaultInitialState;
        }
    }
})

export const { addProduct, removeProduct, emptyProducts } = productSlice.actions;
export default productSlice.reducer;
