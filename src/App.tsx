import { Route, Router, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'
import { SesionRouter } from './sesiones/02-react-router/SesionRouter'
import { Cursos } from './sesiones/01-componentes/ejercicio/Cursos'
import { SesionComponentes } from './sesiones/01-componentes/SesionComponentes'
import { PaginaNoEncontrada } from './sesiones/02-react-router/paginas/PaginaNoEncontrada'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route path="/componentes" element={<SesionComponentes />} />
          <Route path="/router" element={<SesionRouter />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </>
  )
}
