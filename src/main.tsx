import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Login } from './pages/Login.tsx'
import { MainLayout } from './layout/MainLayout.tsx'
import { Products } from './pages/Products.tsx'
import { Home } from './pages/Home.tsx'
import { SecondLayout } from './layout/SecondLayout.tsx'
import { ProductDetail } from './pages/ProductDetail.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="products/:productId" element={<ProductDetail />}></Route>
        </Route>
        <Route element={<SecondLayout />}>
          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
