import type { ReactNode } from "react";

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
                    <h2 style={{ color: 'white', fontSize: '1.5em', fontWeight: 'normal', margin: 0 }}>sidebar</h2>
                    
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