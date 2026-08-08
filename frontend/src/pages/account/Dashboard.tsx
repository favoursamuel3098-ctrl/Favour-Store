import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Account</h1>
            <p className="text-gray-600 text-sm mt-1">
              Welcome back, {user.fullName || "Customer"}
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Link
            to="/account/orders"
            className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-semibold">My Orders</h3>
            <p className="text-sm text-gray-500 mt-1">View purchase history</p>
          </Link>
          <Link
            to="/account/downloads"
            className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">⬇️</div>
            <h3 className="font-semibold">Downloads</h3>
            <p className="text-sm text-gray-500 mt-1">Access your digital products</p>
          </Link>
          <Link
            to="/account/settings"
            className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-semibold">Settings</h3>
            <p className="text-sm text-gray-500 mt-1">Update your profile</p>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-semibold mb-3">Account Info</h2>
          <div className="text-sm space-y-2">
            <p><span className="text-gray-500">Name:</span> {user.fullName}</p>
            <p><span className="text-gray-500">Email:</span> {user.email}</p>
            {user.phone && <p><span className="text-gray-500">Phone:</span> {user.phone}</p>}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
