import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Brand & Copyright */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-1 hover:text-white transition-colors">
              <span className="text-lg">🛒</span>
              <span className="text-sm font-semibold text-white">MilletHub</span>
            </Link>
            <span className="text-xs text-gray-500">|</span>
            <p className="text-xs text-gray-400">
              &copy; {currentYear} All rights reserved
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-4 text-xs">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
