import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [summary, setSummary] = useState({ itemCount: 0, subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);

  const token = localStorage.getItem("accessToken");

  const loadCart = () => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setSummary(data.summary || { itemCount: 0, subtotal: 0 });
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load cart");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId: string) => {
    if (!token) return;
    await fetch(`/api/cart/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadCart();
  };

  const checkout = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    setCheckingOut(true);
    try {
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/pay/${data.order.reference}`);
      } else {
        setError(data.error || "Checkout failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setCheckingOut(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="mb-4">Please login to view your cart</p>
            <Link to="/login" className="text-brand-600 hover:underline">
              Login →
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

        {!loading && items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/products" className="text-brand-600 hover:underline">
              Browse products →
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.product.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.product.deliveryType?.replace("_", " ")}
                    </p>
                    <p className="text-brand-700 font-bold mt-1">
                      ₦{Number(item.product.price).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white border rounded-xl p-5">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal ({summary.itemCount} items)</span>
                <span className="font-bold text-lg">
                  ₦{Number(summary.subtotal).toLocaleString()}
                </span>
              </div>
              <button
                onClick={checkout}
                disabled={checkingOut}
                className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 disabled:opacity-50"
              >
                {checkingOut ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
