import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-700">
          Favour Store
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/products" className="hover:text-brand-600">Products</Link>
          <Link to="/contact" className="hover:text-brand-600">Contact</Link>
          <Link to="/login" className="hover:text-brand-600">Login</Link>
          <Link
            to="/cart"
            className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700"
          >
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}
