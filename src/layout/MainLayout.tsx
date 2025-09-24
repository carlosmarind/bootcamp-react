import type { ReactNode } from "react"

import { Footer } from '../components/common/Footer'
import { Header } from "../components/common/Header";
import { Main } from "../components/common/Main";
import { Outlet } from "react-router";

type MainProps = {
    children?: ReactNode;
}
function MainLayout(props: MainProps) {

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
                    <Main>
                        <Outlet />
                    </Main>
                    <Footer></Footer>
                </div>
            </div>
        </>
    )
}

export { MainLayout }