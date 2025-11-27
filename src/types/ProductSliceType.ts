import type { CartProduct } from "./CartProduct"

export type ProductSliceType = {
    productList: CartProduct[],
    total: number
    createAt: number
}