import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Digital Products Store
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Software licenses, ebooks, templates, courses & more — delivered instantly.
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-brand-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold text-lg">Instant Delivery</h3>
          <p className="text-gray-600 text-sm mt-1">Get your product right after payment</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold text-lg">Secure Payment</h3>
          <p className="text-gray-600 text-sm mt-1">Pay safely with Opay</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="text-3xl mb-2">💬</div>
          <h3 className="font-semibold text-lg">Support</h3>
          <p className="text-gray-600 text-sm mt-1">09054434502 · favoursamuel3098@gmail.com</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-semibold text-white text-lg">Favour Store</p>
          <p className="mt-2 text-sm">
            Owned by Favour Samuel Olakunle
          </p>
          <p className="mt-1 text-sm">
            Email: favoursamuel3098@gmail.com · Phone: 09054434502 · Opay: 7075627260
          </p>
          <p className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Favour Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">Coming soon...</p>
        <Link to="/" className="text-brand-600 mt-4 inline-block">← Back home</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Placeholder title="Products" />} />
      <Route path="/contact" element={<Placeholder title="Contact" />} />
      <Route path="/login" element={<Placeholder title="Login" />} />
      <Route path="/cart" element={<Placeholder title="Cart" />} />
      <Route path="*" element={<Placeholder title="Page not found" />} />
    </Routes>
  );
}
