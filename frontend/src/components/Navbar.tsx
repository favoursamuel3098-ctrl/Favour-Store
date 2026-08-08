import { Link } from "react-router-dom";

const WHATSAPP = "2349054434502";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-700">
          Favour Store
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link to="/products" className="hover:text-brand-600 hidden sm:inline">Work</Link>
          <Link to="/contact" className="hover:text-brand-600 hidden sm:inline">Contact</Link>
          <Link to="/login" className="hover:text-brand-600 hidden sm:inline">Login</Link>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello! I want to place a print order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 text-xs sm:text-sm font-medium"
          >
            WhatsApp
          </a>
          <Link
            to="/cart"
            className="bg-brand-600 text-white px-3 py-2 rounded-lg hover:bg-brand-700 text-xs sm:text-sm"
          >
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}
