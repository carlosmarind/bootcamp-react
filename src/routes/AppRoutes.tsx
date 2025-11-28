import { Route, Routes } from "react-router";
import { ProtectedComponent } from "../components/common/ProtectedComponent";
import { BootstrapDemo } from "../pages/BootstrapDemo";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProductDetail } from "../pages/ProductDetail";
import { Products } from "../pages/Products";
import { LoginLayout } from "../layout/LoginLayout";
import { LayoutTresColumnas } from "../layout/LayoutTresColumnas";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<LayoutTresColumnas />}>
                <Route index element={<Home />}></Route>
                <Route path="products" element={<ProtectedComponent element={<Products />} allowedRoles={["user", "admin"]} />}></Route>
                <Route path="products/:productId" element={<ProductDetail />}></Route>
                <Route path="bootstrap" element={<BootstrapDemo />}></Route>
            </Route>
            <Route element={<LoginLayout />}>
                <Route path="login" element={<Login />}></Route>
            </Route>
        </Routes>
    )
}