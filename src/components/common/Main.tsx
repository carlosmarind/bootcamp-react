import type { ReactNode } from "react";
import { Link } from "react-router";

type MainProps = {
    children: ReactNode;
}
function Main({ children }: MainProps) {
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
                            <Link to="/">new home</Link>
                        </li>
                        <li>
                            <Link to="/products">new products</Link>
                        </li>
                        <li>
                            <Link to="/login">new login</Link>
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
            </div>
        </>
    )
}

export { Main };