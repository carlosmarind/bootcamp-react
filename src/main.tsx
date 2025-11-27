import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Login } from './pages/Login.tsx'
import { Products } from './pages/Products.tsx'
import { Home } from './pages/Home.tsx'
import { SecondLayout } from './layout/SecondLayout.tsx'
import { ProductDetail } from './pages/ProductDetail.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BootstrapDemo } from './pages/BootstrapDemo.tsx'
import { BootstrapLayout } from './layout/BootstrapLayout.tsx'
import { ProtectedComponent } from './components/common/ProtectedComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<BootstrapLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="products" element={<ProtectedComponent element={<Products />} allowedRoles={["user", "admin"]} />}></Route>
            <Route path="products/:productId" element={<ProductDetail />}></Route>
            <Route path="bootstrap" element={<BootstrapDemo />}></Route>
          </Route>
          <Route element={<SecondLayout />}>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,

)
