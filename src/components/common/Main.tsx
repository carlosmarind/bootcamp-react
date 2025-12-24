import {  type ReactNode } from "react";
import { NavLink } from "react-router";
import './Main.css'

type MainProps = {
    children: ReactNode;
}

type NavLinkType = {
    isActive: boolean
}

function Main({ children }: MainProps) {

    const cantidadProductos = 10;

    function validarActivo({ isActive }: NavLinkType): string {
        console.log(isActive);
        return isActive ? "active" : "inactive";
    }

    return (
        <div className="mainContainer">
            <aside className="sidebar">
                <nav className="navMenu">
                    <li>
                        <NavLink
                            className={validarActivo}
                            to="/">home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={validarActivo}
                            to="/products">
                            {
                                ({ isActive }) => {
                                    if (isActive) {
                                        return `🔒 Products ${cantidadProductos}`
                                    } else {
                                        return "🔒 Products"
                                    }
                                }
                            }
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={validarActivo}
                            to="/login">login</NavLink>
                    </li>
                </nav>
            </aside>
            <main className="mainContent">
                {children}
            </main>
        </div>
    )
}

export { Main };