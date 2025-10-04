# INTEGRACIONES.md

Este documento sirve como ejemplo para centralizar la información de cada página implementada en el proyecto.  
Por cada página se debe registrar:

1. **Página:** nombre de la página, su ruta en el router y el componente (tsx) asociado.  
2. **Objeto de dominio:** descripción breve del objeto principal que maneja.  
3. **Tipo en TypeScript:** definición del objeto usando `type` indicando los campos y tipos de datos.

---

## Página: Home
- **Ruta:** `/`
- **Componente:** [`Home.tsx`](src/pages/Home.tsx)

### Objetos de dominio
[**Product**](src/types/Product.ts): representa a un cliente del sistema.