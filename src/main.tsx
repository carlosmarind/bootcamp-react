import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Formulario } from './components/Formulario.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Formulario />
  </StrictMode>,
)
