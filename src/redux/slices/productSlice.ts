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

const getInitialState = (force: boolean = false) => {
    // 1) `force`: si `true` ignoramos cualquier respaldo en `localStorage`
    //    y devolvemos un estado nuevo. Si `false`, intentamos usar el
    //    respaldo si está disponible y "fresco".

    const now = Date.now(); // 2) `now` = timestamp actual (ms desde 1970). Usaremos esto para calcular antigüedad.
    const secondsPerDay = 60 * 60 * 24; // 3) segundos en 24 horas (usado como TTL simple)
    // 4) Intentamos leer `carrito` desde `localStorage`. `localStorage` guarda solo strings.
    const estadoCarrito = localStorage.getItem("carrito");

    // 5) Solo intentamos usar el respaldo si existe y `force` es false.
    if (estadoCarrito && !force) {
        try {
            // 6) Convertimos la cadena JSON a objeto. Esto puede fallar si
            //    el JSON está dañado, por eso usamos try/catch.
            const parsed = JSON.parse(estadoCarrito) as ProductSliceType;
            // 7) Calculamos la edad del respaldo: resto entre `now` y el momento
            //    en que se guardó (`parsed.createAt`). Lo convertimos a segundos.
            const ageInSeconds = (now - parsed.createAt) / 1000;
            // 8) Si el respaldo tiene menos de un día (TTL), lo consideramos
            //    válido y lo devolvemos como estado inicial.
            if (ageInSeconds < secondsPerDay) return parsed;
        } catch {
            // 9) Si JSON.parse falla, ignoramos el respaldo y devolvemos
            //    el estado por defecto más abajo. No queremos que un JSON
            //    inválido rompa la aplicación en este punto.
        }
    }
    // 10) Si no había respaldo, éste estaba caducado, o `force` es `true`,
    //     creamos y devolvemos un estado por defecto: carrito vacío, total 0
    //     y `createAt` con el timestamp actual.
    return {
        productList: [],
        total: 0,
        createAt: Date.now(),
    };
}

export const productSlice = createSlice({
    name: 'products',
    initialState: getInitialState(),
    reducers: {
        /*
                Nota didáctica sobre `mutar` vs `return` en reducers
                ----------------------------------------------------
                - Redux Toolkit (RTK) usa Immer bajo el capó; eso permite escribir
                    código que parece mutar el estado (por ejemplo `state.total = 0`
                    o `state.productList.push(...)`), y Immer se encarga de producir
                    de forma segura el nuevo estado inmutable.

                - Reglas prácticas:
                    * Para estados que son objetos o arrays, está bien usar
                        operaciones mutativas (push, splice, asignación de propiedades)
                        porque Immer las convierte internamente en actualizaciones
                        inmutables.
                    * Si quieres reemplazar completamente el state (por ejemplo,
                        limpiar todo el carrito), debes `return` el nuevo estado.
                        Eso es equivalente a reasignar `state = { ... }` pero `return`
                        es la forma correcta dentro de reducers (y obliga a Immer a
                        sustituir el valor del slice en lugar de aplicar parches).
                    * Si el slice contiene un valor primitivo (ej. number, string),
                        usar `return` ES OBLIGATORIO para cambiarlo; no se puede
                        mutar directamente porque no hay propiedades que modificar.

                - Ejemplos rápidos:
                    * Mutación segura (objeto/array):
                        existing.cantidad += 1
                        state.productList.push(newProduct)
                    * Reemplazo total (devuelve el nuevo estado):
                        return defaultInitialState

                Estas reglas ayudan a evitar errores sutiles y a entender cuándo
                Immer está actuando y cuándo estamos sustituyendo el estado.
        */
        // addProduct
        // --------------
        // ¿Qué hace?: Añade un producto al carrito. Si el producto ya existe,
        // incrementa su cantidad; si no existe, lo agrega con cantidad 1.
        // Uso: dispatch(addProduct(product));
        addProduct: (state, action: PayloadAction<Product>) => {
            const payload = action.payload;
            const existing = state.productList.find((p) => p.id === payload.id);
            if (existing) {
                // Aquí mutamos la propiedad `cantidad` del producto existente.
                // Esto está bien porque `state` es un objeto y RTK con Immer
                // aplicará las modificaciones de forma inmutable.
                existing.cantidad += 1;
            } else {
                // Añadimos un nuevo `CartProduct` con `cantidad` inicial 1.
                // Usar `push` también es válido dentro de los reducers RTK.
                state.productList.push({ ...payload, cantidad: 1 } as CartProduct);
            }
            state.total = state.productList.reduce((accumulator, p) => accumulator + p.precio * p.cantidad, 0);
            state.createAt = Date.now();
        },

        // removeProduct
        // -----------------
        // ¿Qué hace?: Elimina una unidad del producto especificado por id.
        // Si la cantidad del producto queda en 0, lo elimina totalmente del carrito.
        // Uso: dispatch(removeProduct(id));
        removeProduct: (state, action: PayloadAction<number>) => {
            const idToRemove = action.payload;
            const posicion = state.productList.findIndex((p) => p.id === idToRemove);
            if (posicion === -1) return;
            const product = state.productList[posicion];
            if (product.cantidad > 1) {
                // Reducción de una unidad: mutamos la propiedad `cantidad`.
                // Immer generará la copia inmutable necesaria.
                product.cantidad -= 1;
            } else {
                // Eliminamos el producto entero del array con `splice`.
                // Esta operación también está permitida y será reflejada
                // en el nuevo estado devuelto por Immer tras el reducer.
                state.productList.splice(posicion, 1);
            }
            state.total = state.productList.reduce((accumulator, p) => accumulator + p.precio * p.cantidad, 0);
            state.createAt = Date.now();
        },
        // emptyProducts
        // --------------
        // ¿Qué hace?: Limpia todo el carrito devolviendo el estado por defecto.
        // Uso: dispatch(emptyProducts());
        emptyProducts: () => {
            // Aquí devolvemos un nuevo estado completo en lugar de mutar el
            // estado actual. Es la forma correcta de 'resetear' el slice.
            // Si hubiésemos intentado asignar directamente a `state` (por
            // ejemplo `state = defaultInitialState`), no funcionaría: dentro
            // del reducer la forma de reemplazar el state es `return`.
            //
            // Para recordar:
            //  - Usar `return` para sustituir todo el estado del slice
            //  - Usar mutaciones para modificar propiedades o elementos
            //    del objeto/array del estado cuando solo cambian partes del
            //    estado.
            return getInitialState();
        }
    }
})

export const { addProduct, removeProduct, emptyProducts } = productSlice.actions;
export default productSlice.reducer;
/*
    Nota didáctica: ¿Qué es un "primitivo" y cuál es su diferencia con un objeto?
    ------------------------------------------------------------------------
    1) Primitivo (primitive):
         - Son tipos simples y se copian por valor. Ejemplos: number, string, boolean,
             null, undefined, symbol, bigint.
         - Al asignarlos a otra variable, se crea una copia del valor.
             Ejemplo: let a = 1; let b = a; b = 2; // a sigue siendo 1
         - En reducers, si el estado del slice es un primitivo (p.ej. contador: number),
             debes devolver el nuevo valor con `return` (no basta asignar la variable local `state`).

    2) Objeto (object):
         - Son estructuras con propiedades (arrays, objetos literales, funciones, Map, etc.).
         - Se manejan por referencia; al asignarlos a otra variable, ambas apuntan al mismo objeto.
             Ejemplo: let obj = {x:1}; let a = obj; a.x = 2; // obj.x ahora es 2
         - En reducers (RTK con Immer), puedes "mutar" el draft de estado (p.ej. state.prop = 1)
             porque Immer aplicará esos cambios de forma inmutable por debajo.
         - Si quieres reemplazar el objeto completo, usa `return newObject`.

    Resumen práctico para reducers:
    - Si el estado es primitivo: usa `return nuevoValor`.
    - Si el estado es un objeto/array:
        - Para cambiar una propiedad o elemento: muta `state` (ej. state.total = x).
        - Para reemplazar todo el objeto: `return nuevoObjeto`.
    - Evita reasignar `state = ...` sin `return` cuando el estado sea primitivo.
*/