
/*
  Archivo: rootReducer.ts
  Propósito: agrupar todos los reducers (slices) en un solo objeto `rootReducer`
  y exponer un tipo `RootState` derivado de los reducers.

  Explicación:
  - Imagina que cada slice (p. ej. counter, products) es una habitación en una casa
    (tu aplicación). Cada habitación tiene su propio responsable (el reducer) que
    sabe cómo actualizar lo que hay dentro (el estado del slice).
  - El `rootReducer` es como el plano de la casa que junta todas las habitaciones.
    Cuando quieres leer o escribir datos, usas la ruta en el plano, p. ej. `state.products`.

  Por qué derivamos `RootState` desde los reducers:
  - Evitamos referencias circulares (no derivar tipos desde el `store` que a su vez depende
    de los reducers).
  - Si un reducer cambia su tipo, `RootState` se actualiza automáticamente.

  Cómo usar estas exportaciones en componentes:
  - Para seleccionar datos: `useSelector((state: RootState) => state.products)`
  - Para tipar `dispatch`: exportamos `AppDispatch` desde `store.ts` y usamos `useDispatch<AppDispatch>()`.

  Añadir un nuevo slice:
  1) Crea el slice en `src/redux/slices/miSlice.ts`.
  2) Importa el reducer abajo en este archivo.
  3) Añádelo al objeto `rootReducer` con una clave: `miSlice: miSliceReducer`.
  4) Actualiza `RootState` si es necesario (si sigues la derivación automática usando `ReturnType`,
     no necesitas modificar manualmente `RootState`).
*/

import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice';

// Agrupación de reducers: cada propiedad corresponde a un slice del estado.
export const rootReducer = {
  counter: counterReducer,
  products: productReducer,
};

// RootState: tipo derivado de los reducers. Úsalo en `useSelector` y otras utilidades.
export type RootState = {
  counter: ReturnType<typeof counterReducer>;
  products: ReturnType<typeof productReducer>;
};