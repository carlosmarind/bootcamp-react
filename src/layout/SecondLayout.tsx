import { Main } from "../components/common/Main";
import { Outlet } from "react-router";

function SecondLayout() {
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
                    <Main>
                        <Outlet />
                    </Main>
                </div>
            </div>

        </>
    )
}

export { SecondLayout }