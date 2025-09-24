import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home'
function App() {

  const contenido = <Home></Home>

  return (
    <>
      <MainLayout>
        {contenido}
      </MainLayout>
    </>
  )
}
export default App
