/**
 * ============================================================================
 * QUÉ ES UN HOOK PERSONALIZADO (CUSTOM HOOK)
 * ============================================================================
 * Un hook personalizado es una función de JavaScript que reutiliza la lógica
 * de los hooks de React (como useState, useEffect, etc.). Permite extraer
 * lógica de componentes para que sea reutilizable en múltiples componentes.
 * 
 * REGLAS IMPORTANTES:
 * 1. Debe empezar con "use" (ej: useFetch, useForm, useAuth)
 * 2. Solo puede usarse dentro de componentes de React
 * 3. Debe estar en un archivo separado, generalmente en una carpeta "hooks"
 * 
 * VENTAJAS:
 * - Código más limpio y organizado
 * - Lógica reutilizable
 * - Fácil de testear
 * - Facilita el mantenimiento
 * ============================================================================
 */

import { useEffect, useState } from "react";

/**
 * Hook personalizado para hacer fetch de datos desde una URL
 * 
 * @template T - El tipo de datos que esperas recibir de la API
 *               Ejemplo: interface Producto { id: number; nombre: string; }
 *               useFetch<Producto>(url) tipará correctamente el response
 * 
 * @param {string} url - La URL del endpoint de la API de donde obtener datos
 *                       Ejemplo: "https://api.ejemplo.com/productos"
 * 
 * @returns {Object} Un objeto con tres propiedades:
 *   - data: Los datos obtenidos de la API (o null mientras se carga)
 *   - error: Mensaje de error si algo falla (o null si va bien)
 *   - cargando: true mientras se está haciendo la petición, false cuando termina
 * 
 * EJEMPLO DE USO EN UN COMPONENTE:
 * 
 * interface Producto {
 *   id: number;
 *   nombre: string;
 *   precio: number;
 * }
 * 
 * export function MiComponente() {
 *   const { data, error, cargando } = useFetch<Producto[]>(
 *     "https://api.ejemplo.com/productos"
 *   );
 * 
 *   if (cargando) return <div>Cargando...</div>;
 *   if (error) return <div>Error: {error}</div>;
 * 
 *   return (
 *     <ul>
 *       {data?.map(producto => (
 *         <li key={producto.id}>{producto.nombre}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 */
export function useFetch<T>(url: string) {

    // ========================================================================
    // ESTADO (useState)
    // useState crea variables de estado que React detecta cuando cambian
    // y vuelve a renderizar el componente
    // ========================================================================

    // Estado para almacenar los datos obtenidos
    // null inicialmente porque aún no hemos hecho la petición
    // Tipo genérico <T> permite tipar correctamente los datos esperados
    // Ejemplo: Si T = Producto[], entonces data será Producto[] | null
    const [data, setData] = useState<T | null>(null);

    // Estado para almacenar mensajes de error
    // null significa que no hay error
    // Ejemplo: "Error 404: No encontrado" o "Error de red"
    const [error, setError] = useState<string | null>(null);

    // Estado para saber si está en proceso de carga
    // true = esperando la respuesta del servidor
    // false = la petición terminó (exitosa o con error)
    // Sirve para mostrar spinners de carga: {cargando && <Spinner />}
    const [cargando, setCargando] = useState(true);

    // ========================================================================
    // EFECTO SECUNDARIO (useEffect)
    // useEffect ejecuta código cuando el componente monta o sus dependencias
    // cambian. Es donde hacemos operaciones asincrónicas como fetch
    // ========================================================================

    useEffect(() => {

        // AbortController es una API del navegador que permite cancelar
        // peticiones HTTP en progreso
        // Útil cuando el componente se desmonta mientras está cargando
        // Evita warnings y actualizaciones de estado en componentes desmontados
        const controller = new AbortController();

        // Función asincrónica que hace la petición al servidor
        const fetchData = async () => {
            // Iniciamos el estado de carga
            setCargando(true);
            // Limpiamos errores previos
            setError(null);

            try {
                // fetch() hace una petición HTTP GET por defecto
                // signal: controller.signal permite cancelar esta petición
                // Ejemplo: fetch("https://jsonplaceholder.typicode.com/posts")
                const response = await fetch(url, { signal: controller.signal });

                // Verificamos que la respuesta fue exitosa (status 200-299)
                // Si el status es 404, 500, etc., response.ok será false
                if (!response.ok) {
                    if (!response.ok) throw new Error('Error al cargar datos desde url: ' + url);
                }

                // response.json() convierte el texto JSON a un objeto JavaScript
                // "as T" es una aserción de tipo que le dice a TypeScript
                // que el JSON coincide con nuestro tipo genérico T
                // Ejemplo de JSON recibido: { "id": 1, "nombre": "Producto" }
                const json = await response.json() as T;

                // Guardamos los datos en el estado para que el componente
                // se re-renderice y muestre los datos
                setData(json);

            } catch (err) {
                // Si algo falla (error de red, JSON inválido, etc.)
                // capturamos el error y lo convertimos a string
                // Ejemplo: fetch falla por sin internet
                setError(err instanceof Error ? err.message : 'Error desconocido');

            } finally {
                // Finalmente, marca que terminó la carga
                // Esto se ejecuta SIEMPRE, éxito o error
                // Así el componente sabe que puede dejar de mostrar el spinner
                setCargando(false);
            }
        };

        // Ejecuta la función de fetch
        fetchData();

        // ====================================================================
        // FUNCIÓN DE LIMPIEZA (Cleanup Function)
        // Se ejecuta cuando el componente se desmonta o antes de ejecutar
        // el efecto nuevamente (cuando url cambia)
        // ====================================================================
        // 
        // IMPORTANTE: Esta línea está comentada pero es recomendable usarla
        // Para evitar memory leaks y warnings, descomenta la siguiente línea:
        // return () => { controller.abort(); }
        // 
        // Qué hace: cancela cualquier petición HTTP en progreso cuando el
        // componente se desmonta o la URL cambia. Evita que React intente
        // actualizar el estado de un componente que ya no existe.
        // 
        // EJEMPLO DE PROBLEMA SIN CLEANUP:
        // 1. Usuario entra a página de productos
        // 2. Comienza a cargar lista de productos
        // 3. Usuario hace click para ir a otra página ANTES de terminar carga
        // 4. El componente se desmonta pero fetch sigue en segundo plano
        // 5. Cuando termina fetch, intenta hacer setState en componente muerto
        // 6. React muestra warning: "Can't perform a React state update on
        //    an unmounted component"
        // 
        // CON CLEANUP (controller.abort()):
        // En el paso 3, la función cleanup cancela el fetch automáticamente
        // ====================================================================

    }, [url]); // Dependencia: re-ejecuta este efecto cuando url cambia
                // Esto permite cambiar de producto sin tener que crear
                // un nuevo hook. Ejemplo:
                // const url = id ? `api/producto/${id}` : null;
                // Cuando id cambia, automáticamente fetch hace nueva petición

    // ========================================================================
    // RETORNO
    // Devolvemos un objeto con los tres valores de estado
    // El componente que use este hook puede hacer:
    // const { data, error, cargando } = useFetch<Producto>(url);
    // ========================================================================
    return { data, error, cargando };
}