import { type ReactNode } from "react";
import { NavLink } from "react-router";
import './Main.css'

type MainProps = {
    children: ReactNode;
}

type NavLinkType = {
    isActive: boolean
}

function Main({ children }: MainProps) {

    //className={cantidadProductos > 10 ? "superior" : "inferior"}

    function validarActivo({ isActive }: NavLinkType): string {
        console.log(isActive);
        return isActive ? "activo" : "inactivo";
    }

    // f(x) = y
    // calcular(x) = y
    // calcular(parametro1,parametro2,parametroN....) = y
    // calcular(parametro1,parametro2,parametroN....):number = resultado 
    // (x) = y
    // nombreFuncion(parametrosEntrada...) = SalidaORetorno["opcional"]

    //let valorRetorno = (input) => { return "uno" }
    //let valorRetorno = input => "uno"
    //let valorRetorno = function (input) { return "uno" }

    // miVariable = calcular(parametro1,parametro2,parametroN....) 
    // miVariable = void



    return (
        <>
            <div style={{ display: 'flex', minHeight: '500px' }}>
                <aside style={{
                    backgroundColor: '#7cb342',
                    width: '150px',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <ul>
                        <li>

                            <NavLink
                                className={validarActivo}
                                style={({ isActive }) =>
                                ({
                                    fontSize: isActive ? "24px" : "16px",
                                    fontWeight: isActive ? "bold" : "normal",
                                    color: isActive ? "red" : "black"
                                })
                                }
                                to="/">new home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={validarActivo}
                                to="/products">
                                {
                                    ({ isActive }) => {
                                        if (isActive) {
                                            return `➡️Products ${cantidadProductos}`
                                        } else {
                                            return "new products"
                                        }
                                    }
                                }
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={validarActivo}
                                to="/login">new login</NavLink>
                        </li>

                    </ul>
                </aside>
                <main style={{
                    backgroundColor: '#ff7f50',
                    flex: 1,
                    padding: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    {children}
                </main>
            </div >
        </>
    )
}

export { Main };