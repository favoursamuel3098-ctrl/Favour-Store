import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Payment() {
  const { reference } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || !reference) return;

    fetch(`/api/orders/${reference}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.order);
        setPayment(data.payment);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load order");
        setLoading(false);
      });
  }, [reference]);

  const markPaid = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !reference) return;

    try {
      const res = await fetch(`/api/orders/${reference}/mark-paid`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Network error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-red-600">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-lg mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center mb-2">Complete Payment</h1>
          <p className="text-center text-gray-500 text-sm mb-6">
            Order: <span className="font-mono font-medium">{order?.reference}</span>
          </p>

          {message ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm text-center">
              {message}
              <div className="mt-4">
                <Link to="/account" className="text-brand-600 hover:underline">
                  Go to My Account →
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-6">
                <p className="text-sm text-gray-600 mb-1">Pay to this Opay Account:</p>
                <p className="text-3xl font-bold tracking-wide text-brand-800 my-2">
                  7075627260
                </p>
                <p className="font-semibold text-gray-800">Favour Samuel Olakunle</p>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount to Pay</span>
                  <span className="font-bold text-lg">
                    ₦{Number(order?.total || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Reference</span>
                  <span className="font-mono font-medium">{order?.reference}</span>
                </div>
              </div>

              <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg mb-6">
                Transfer the <strong>exact amount</strong> to the Opay account above.
                You can put the Order Reference as narration if possible.
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>
              )}

              <button
                onClick={markPaid}
                className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 transition"
              >
                I have paid
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                After you click, we will verify your payment and release your product.
              </p>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
