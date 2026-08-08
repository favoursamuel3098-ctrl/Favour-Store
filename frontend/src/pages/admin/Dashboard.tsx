import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:block">
        <h1 className="text-xl font-bold text-indigo-400 mb-8">Favour Store</h1>
        <p className="text-xs text-slate-500 mb-6">ADMIN PANEL</p>
        <nav className="space-y-2 text-sm">
          <Link to="/admin" className="block px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">
            Overview
          </Link>
          <Link to="/admin/products" className="block px-3 py-2 rounded-lg hover:bg-slate-800">
            Products
          </Link>
          <Link to="/admin/orders" className="block px-3 py-2 rounded-lg hover:bg-slate-800">
            Orders
          </Link>
          <Link to="/admin/users" className="block px-3 py-2 rounded-lg hover:bg-slate-800">
            Users
          </Link>
          <Link to="/admin/refunds" className="block px-3 py-2 rounded-lg hover:bg-slate-800">
            Refunds
          </Link>
          <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 mt-6 text-slate-400">
            ← Back to Store
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p className="text-slate-400 text-sm mt-1">Welcome, {user.fullName || "Admin"}</p>
          </div>
          <button
            onClick={logout}
            className="text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400 text-sm">Today's Revenue</p>
            <p className="text-2xl font-bold mt-1">₦0</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400 text-sm">Total Orders</p>
            <p className="text-2xl font-bold mt-1">0</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400 text-sm">Products</p>
            <p className="text-2xl font-bold mt-1">0</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl">
            <p className="text-slate-400 text-sm">Customers</p>
            <p className="text-2xl font-bold mt-1">0</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/products"
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm"
            >
              Manage Products
            </Link>
            <Link
              to="/admin/orders"
              className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm"
            >
              View Orders
            </Link>
          </div>
        </div>

        <p className="text-slate-500 text-xs mt-10">
          Admin panel for Favour Store · Contact: favoursamuel3098@gmail.com
        </p>
      </main>
    </div>
  );
}
