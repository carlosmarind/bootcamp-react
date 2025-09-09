import type { ReactNode } from "react"

import { Footer } from './Footer'
import { Header } from "./Header";
import { Main } from "./Main";

type MainProps = {
    children: ReactNode;
}
function Layout(props: MainProps) {

    return (
        <>

            <div style={{
                minHeight: '100vh',
                backgroundColor: '#4a7db8',
                padding: '20px',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    backgroundColor: '#4a7db8',
                    borderRadius: '15px',
                    padding: '10px',
                    minHeight: '100vh'
                }}>
                    <Header></Header>
                    <Main>{props.children}</Main>
                    <Footer></Footer>
                </div>
            </div>

        </>
    )
}

export { Layout }