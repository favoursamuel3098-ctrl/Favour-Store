import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import UserDashboard from "./pages/account/Dashboard";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";

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
      <Route path="/cart" element={<Cart />} />
      <Route path="/pay/:reference" element={<Payment />} />

      <Route path="/account" element={<UserDashboard />} />
      <Route path="/account/orders" element={<Placeholder title="My Orders" />} />
      <Route path="/account/downloads" element={<Placeholder title="Downloads" />} />
      <Route path="/account/settings" element={<Placeholder title="Settings" />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/users" element={<Placeholder title="Admin Users" />} />
      <Route path="/admin/refunds" element={<Placeholder title="Admin Refunds" />} />

      <Route path="*" element={<Placeholder title="Page not found" />} />
    </Routes>
  );
}
