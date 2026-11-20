import z from "zod"

export type ModoAutenticacion = 'header' | 'cookie'

const esquemaToken = z.object({ accessToken: z.string().min(1) })

export const esquemaUsuario = z.object({
    id: z.number().int().positive(),
    username: z.string().min(1),
    firstName: z.string(),
    lastName: z.string(),
    role: z.enum(["admin", "user", "moderator"])
})

export type UsuarioAutenticado = z.infer<typeof esquemaUsuario>

const URL_AUTH = '/dummyjson/auth'


export async function solicitarToken(username: string, password: string, modo: ModoAutenticacion, signal?: AbortSignal) {
    const respuesta = await fetch(`${URL_AUTH}/login`, {
        method: 'POST',
        signal,
        headers: { 'Content-Type': 'application/json' },
        // include permite que el navegador acepte Set-Cookie; omit aísla el ejemplo Bearer.
        credentials: modo === 'cookie' ? 'include' : 'omit',
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
    })
    if (!respuesta.ok) {
        throw new Error(respuesta.status === 400 || respuesta.status === 401
            ? 'Revisa el usuario o la contraseña.'
            : 'No fue posible iniciar sesión. Inténtalo nuevamente.')
    }
    const validacion = esquemaToken.safeParse(await respuesta.json())
    if (!validacion.success) throw new Error('La API no devolvió un token válido.')
    return validacion.data.accessToken
}


export async function consultarPerfil(token: string | null, modo: ModoAutenticacion, signal?: AbortSignal) {
    const respuesta = await fetch(`${URL_AUTH}/me`, {
        signal,
        // Por cookie no agregamos Authorization: el navegador adjunta la cookie HttpOnly.
        credentials: modo === 'cookie' ? 'include' : 'omit',
        headers: modo === 'header' ? { Authorization: `Bearer ${token}` } : undefined,
    })
    if ([400, 401, 403].includes(respuesta.status)) {
        return null // No hay un usuario autenticado con ese token o cookie.
    }
    if (!respuesta.ok) throw new Error('No fue posible consultar el usuario. Inténtalo nuevamente.')
    const validacion = esquemaUsuario.safeParse(await respuesta.json())
    if (!validacion.success) throw new Error('El perfil recibido no contiene un usuario y rol válidos.')
    return validacion.data
}

export async function solicitarCierre(token: string | null, modo: ModoAutenticacion, signal?: AbortSignal) {
    const respuesta = await fetch(`${URL_AUTH}/logout`, {
        method: 'POST',
        signal,
        // El servidor debe expirar sus cookies HttpOnly; JavaScript no puede borrarlas.
        credentials: 'include',
        headers: modo === 'header' ? { Authorization: `Bearer ${token}` } : undefined,
    })
    if (!respuesta.ok && respuesta.status !== 401) {
        throw new Error('La sesión local se cerró, pero no se confirmó el cierre remoto. Reintenta iniciar y cerrar sesión.')
    }
}