import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router'
import { useAuthStore } from './sesiones/06-AutenticacionAutorizacion/stores/useAuthStore.ts'

const sesion = useAuthStore.getState()
if (sesion.accessToken) void sesion.verificarSesion()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
