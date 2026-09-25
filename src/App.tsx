import { Route, Routes } from 'react-router'
import { MainLayout } from './layout/MainLayout'
import { SesionRouter } from './sesiones/02-react-router/SesionRouter'
import { Cursos } from './sesiones/01-componentes/ejercicio/Cursos'
import { SesionComponentes } from './sesiones/01-componentes/SesionComponentes'
import { PaginaNoEncontrada } from './sesiones/02-react-router/paginas/PaginaNoEncontrada'
import { Inicio } from './sesiones/02-react-router/paginas/Inicio'
import { DetalleCurso } from './sesiones/01-componentes/ejercicio/DetalleCurso'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Inicio />} />
          <Route path="/componentes" element={<SesionComponentes />} />
          <Route path="/router" element={<SesionRouter />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/detalle" element={<DetalleCurso />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </>
  )
}
