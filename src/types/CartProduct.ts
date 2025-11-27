import type { Product } from "./Product";

export type CartProduct = Product & {
    cantidad: number;
};