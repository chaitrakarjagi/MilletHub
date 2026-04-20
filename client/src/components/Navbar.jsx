import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <span className="text-2xl">🛒 🌾 </span> */}
            {/* <span className="text-2xl"><img src="/images/millethub.png" alt="MilletHub" className="inline-block h-20 md:h- ml-2" /></span> */}
            <span className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              MilletHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/whole-millet"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              Whole Millet
            </Link>
            <Link
              to="/flour-millet"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              Flour Millet
            </Link>
            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M16 19a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-gray-700 hidden sm:block">
                    {user.user?.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
