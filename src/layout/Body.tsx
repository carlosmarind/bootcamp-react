import { Outlet } from "react-router";

export function Body() {
    return (
        <main id="contenido" tabIndex={-1}>
            <Outlet />
        </main>
    )
}