import z from "zod"
import { create } from "zustand"
import { consultarPerfil, solicitarCierre, solicitarToken, type ModoAutenticacion, type UsuarioAutenticado } from "../servicios/autenticacion"
import { persist } from "zustand/middleware"

type EstadoAuth = {
    accessToken: string | null,
    modo: ModoAutenticacion,
    usuario: UsuarioAutenticado | null,
    cargando: boolean,
    error: string,
    iniciarSesion: (username: string, password: string, modo?: ModoAutenticacion) => Promise<boolean>,
    verificarSesion: (modo?: ModoAutenticacion) => Promise<boolean>
    cerrarSesion: () => Promise<void>,
}

const esquemaPersistido = z.object({
    accessToken: z.string().min(1).nullable(),
    modo: z.enum(['header', 'cookie']),
})

const sesionVacia = { accessToken: null, usuario: null, cargando: false, error: '' }

let controlador = new AbortController()

// Cancelamos la petición anterior para que su respuesta no restaure una sesión cerrada.
function nuevaPeticion() {
    controlador.abort()
    controlador = new AbortController()
    return controlador.signal
}

export const useAuthStore = create<EstadoAuth>()(
    persist(
        //definicion de estado
        (set, get) => ({
            ...sesionVacia,
            modo: 'header',
            iniciarSesion: async (username, password, modo = 'header') => {
                const signal = nuevaPeticion()
                set({ ...sesionVacia, modo, cargando: true })
                try {
                    const accessToken = await solicitarToken(username, password, modo, signal)
                    if (signal.aborted) return false
                    set({ accessToken })
                    return await get().verificarSesion(modo);
                } catch (error) {
                    if (!signal.aborted) set({ cargando: false, error: error instanceof Error ? error.message : 'Hubo un error al autenticar' })
                    return false;
                }
            },
            verificarSesion: async (modo = 'header') => {
                const signal = nuevaPeticion()
                const accessToken = get().accessToken;
                set({ usuario: null, modo, cargando: true, error: '' })
                try {

                    if (modo === 'header' && !accessToken) throw new Error('Inicia sesion para obtener un token')

                    const usuario = await consultarPerfil(accessToken, modo, signal)
                    if (signal.aborted) return false
                    if (!usuario) {
                        set({ ...sesionVacia, error: 'La sesion no es valida o expiro, inicia sesion nuevamente' })
                        return false
                    }
                    set({ usuario })
                    return true
                } catch (error) {
                    if (!signal.aborted) set({ error: error instanceof Error ? error.message : 'No fue posible iniciar sesion' })
                    return false
                } finally {
                    if (!signal.aborted) set({ cargando: false })
                }
            },
            cerrarSesion: async () => {
                const signal = nuevaPeticion()
                const { accessToken, modo } = get()
                set({ ...sesionVacia, cargando: true })
                try {
                    await solicitarCierre(accessToken, modo, signal);
                } catch (error) {
                    if (!signal.aborted) set({ error: error instanceof Error ? error.message : 'Se cerro la sesion solo localmente' })
                } finally {
                    if (!signal.aborted) set({ cargando: false })
                }
            },
        })
        ,
        //definicion de persistencia
        {
            name: 'bootcamp-auth',
            partialize: (estado) => ({ accessToken: estado.accessToken, modo: estado.modo }),
            merge: (estadoLocalStorage, estadoActual) => {
                const validacion = esquemaPersistido.safeParse(estadoLocalStorage)
                if (!validacion.success) return { ...estadoActual, ...sesionVacia }
                return { ...estadoActual, ...sesionVacia, ...validacion.data, cargando: false }
            },
        }
    )
)