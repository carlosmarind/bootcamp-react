import z from "zod"
import { create } from "zustand"
import { solicitarToken, type ModoAutenticacion } from "../servicios/autenticacion"

const esquemaUsuario = z.object({
    id: z.number().int().positive(),
    username: z.string().min(1),
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(["admin", "user", "moderator"])
})

type UsuarioAutenticado = z.infer<typeof esquemaUsuario>



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

export const useAuthStore = create<EstadoAuth>()(
    (set, get) => ({
        accessToken: null,
        usuario: null,
        cargando: false,
        error: '',
        modo: 'header',
        iniciarSesion: async (username, password, modo = 'header') => {
            set({ cargando: true })
            try {
                const accessToken = await solicitarToken(username, password, modo)
                set({ accessToken })
                return await get().verificarSesion(modo);
            } catch (error) {
                set({ cargando: false, error: 'Hubo un error al autenticar' })
            }
            return false;
        },
        verificarSesion: async (modo = 'header') => { return true },
        cerrarSesion: async () => { },
    })
)