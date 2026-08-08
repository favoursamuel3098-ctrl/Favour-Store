import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/account/Dashboard";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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

      <Footer />
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600">Coming soon...</p>
          <Link to="/" className="text-brand-600 mt-4 inline-block">
            ← Back home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Placeholder title="Cart" />} />

      {/* User Dashboard */}
      <Route path="/account" element={<UserDashboard />} />
      <Route path="/account/orders" element={<Placeholder title="My Orders" />} />
      <Route path="/account/downloads" element={<Placeholder title="Downloads" />} />
      <Route path="/account/settings" element={<Placeholder title="Settings" />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<Placeholder title="Admin Products" />} />
      <Route path="/admin/orders" element={<Placeholder title="Admin Orders" />} />
      <Route path="/admin/users" element={<Placeholder title="Admin Users" />} />
      <Route path="/admin/refunds" element={<Placeholder title="Admin Refunds" />} />

      <Route path="*" element={<Placeholder title="Page not found" />} />
    </Routes>
  );
}
