import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";


export type CartItem = {
    producto: Product,
    cantidad: number,
}

type CartState = {
    items: CartItem[],
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.producto.id === action.payload.id);
            if (existingItem) {
                existingItem.cantidad += 1;
            } else {
                state.items.push({ producto: action.payload, cantidad: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.producto.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateQuantity: (state, action: PayloadAction<{ id: number, cantidad: number }>) => {
            const existingItem = state.items.find(item => item.producto.id === action.payload.id);
            if (existingItem) {
                existingItem.cantidad = action.payload.cantidad;
                if (existingItem.cantidad <= 0) {
                    state.items = state.items.filter(item => item.producto.id !== action.payload.id);
                }
            }
        }
    }
});


export { cartSlice }

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;