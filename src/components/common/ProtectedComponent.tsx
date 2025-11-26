import type React from "react"
import { Navigate } from "react-router"
import type { MetaDataAuth } from "../../types/MetaDataAuth"

type Props = {
    element: React.ReactNode
    allowedRoles: string[]
}
function ProtectedComponent(props: Props) {

    const authLocal = localStorage.getItem("auth")
    if (!authLocal) {
        return <Navigate to="/login" replace />
    }

    const metadataUsuario: MetaDataAuth = JSON.parse(authLocal!)

    const isAuthorized = props.allowedRoles.some((rolPermitodo) => metadataUsuario.role.includes(rolPermitodo))

    if (!isAuthorized) {
        return <Navigate to="/login" replace />
    }

    return (
        props.element
    )
}
export { ProtectedComponent }