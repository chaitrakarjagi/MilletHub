import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideNavbar from "./components/SideNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductDetail from "./pages/ProductDetail";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <div className="lg:flex">
            <SideNavbar />
            <main className="flex-1 lg:pl-72">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout/>
                  </ProtectedRoute>
                }/>
                <Route path="/payment-success" element={<PaymentSuccess/>}/>
                <Route path="/product/:id" element={<ProductDetail/>}/>
              </Routes>
            </main>
          </div>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
