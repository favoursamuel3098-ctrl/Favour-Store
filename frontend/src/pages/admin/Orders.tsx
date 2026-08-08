import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!token || user.role !== "ADMIN") {
      navigate("/login");
      return;
    }
    // For now we fetch via a simple approach - in production add admin list endpoint
    // Using /api/orders/my won't work for all orders, so we'll show a note
    // and allow confirming by reference
    setLoading(false);
  }, []);

  const confirmPayment = async (reference: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/orders/${reference}/confirm-payment`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Order ${reference} confirmed and fulfilled!`);
      } else {
        setMessage(data.error || "Failed");
      }
    } catch {
      setMessage("Network error");
    }
  };

  const [refInput, setRefInput] = useState("");

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:block">
        <h1 className="text-xl font-bold text-indigo-400 mb-8">Favour Store</h1>
        <p className="text-xs text-slate-500 mb-6">ADMIN PANEL</p>
        <nav className="space-y-2 text-sm">
          <Link to="/admin" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Overview</Link>
          <Link to="/admin/products" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Products</Link>
          <Link to="/admin/orders" className="block px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">Orders</Link>
          <Link to="/admin/users" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Users</Link>
          <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 mt-6 text-slate-400">← Back to Store</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6">Orders & Payment Confirmation</h2>

        {message && (
          <div className="bg-green-900/40 text-green-300 p-3 rounded-lg mb-6 text-sm">{message}</div>
        )}

        <div className="bg-slate-800 rounded-2xl p-6 max-w-lg">
          <h3 className="font-semibold mb-3">Confirm a Payment</h3>
          <p className="text-slate-400 text-sm mb-4">
            When a customer pays to your Opay (7075627260), enter their Order Reference below and confirm.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="FS-XXXXXX"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value.toUpperCase())}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => confirmPayment(refInput)}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Confirm & Fulfill
            </button>
          </div>
        </div>

        <div className="mt-8 bg-slate-800 rounded-2xl p-6">
          <h3 className="font-semibold mb-2">How it works</h3>
          <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
            <li>Customer pays to Opay <strong className="text-white">7075627260</strong> (Favour Samuel Olakunle)</li>
            <li>Customer clicks "I have paid"</li>
            <li>You check your Opay and see the transfer</li>
            <li>Enter the Order Reference here and click Confirm</li>
            <li>Product is automatically released to the customer</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
