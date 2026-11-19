import { Link } from 'react-router'
import type { ReactNode } from 'react'
import { useAuthStore } from '../stores/useAuthStore'

export type Rol = 'admin' | 'moderator' | 'user'

type PropsProtegido = {
    rolesPermitidos?: Rol[]
    children: ReactNode
}

export function Protegido({ rolesPermitidos = [], children }: PropsProtegido) {

    const usuario = useAuthStore((estado) => estado.usuario) // sacar del store
    const cargando = useAuthStore((estado) => estado.cargando) // sacar del store

    if (cargando) return <p role="status">Verificando permisos...</p>
    if (!usuario) {
        return <p><Link to="/autenticacion-autorizacion">Inicia sesión</Link> para ver este contenido.</p>
    }
    if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.role)) {
        return <p>No tienes un rol permitido para ver este contenido.</p>
    }
    // Controla lo que se renderiza; el backend también debe autorizar cada operación.
    return <>{children}</>
}
