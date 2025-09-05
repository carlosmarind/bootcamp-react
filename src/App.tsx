import { Card } from './components/card/Card'
import { Formulario } from './components/Formulario'
import { Layout } from './components/Layout/Layout'
function App() {

  const contenido = <Formulario></Formulario>
  const contenido2 = <Card edad={31} nombre="Josefina">Saludos</Card>

  return (
    <>
      <Layout>
        {contenido}
      </Layout>
    </>
  )
}
export default App
