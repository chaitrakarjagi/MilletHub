import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import SideNavbar from "./components/SideNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductDetail from "./pages/ProductDetail";
import FlourMillet from "./pages/FlourMillet";
import WholeMillet from "./pages/WholeMillet";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Home/> : <Navigate to="/login" replace />}/>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login/>}/>
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout/>
        </ProtectedRoute>
      }/>
      <Route path="/payment-success" element={<PaymentSuccess/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/flour-millet" element={<FlourMillet/>}/>
      <Route path="/whole-millet" element={<WholeMillet/>}/>
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="lg:flex">
        {!isAuthPage && <SideNavbar />}
        <main className={isAuthPage ? "w-full" : "flex-1 lg:pl-72"}>
          <AppRoutes />
        </main>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
