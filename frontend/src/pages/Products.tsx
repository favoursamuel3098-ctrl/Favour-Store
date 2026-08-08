import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  id: string;
  title: string;
  slug: string;
  price: string;
  coverImageUrl?: string;
  deliveryType: string;
  category?: { name: string; slug: string };
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load products. Backend may not be running yet.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-8">Browse our digital products</p>

        {loading && (
          <div className="text-center py-20 text-gray-500">Loading products...</div>
        )}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl text-sm">
            {error}
            <p className="mt-2 text-xs">
              Products will appear here once the backend is running and you have added products from the admin panel.
            </p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products yet.</p>
            <p className="text-sm text-gray-400 mt-2">
              Products will show here after you add them from the Admin Dashboard.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                {product.coverImageUrl ? (
                  <img
                    src={product.coverImageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">📦</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-brand-600 font-medium mb-1">
                  {product.category?.name || "Digital"}
                </p>
                <h3 className="font-semibold text-lg leading-tight">{product.title}</h3>
                <p className="mt-2 text-brand-700 font-bold">
                  ₦{Number(product.price).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {product.deliveryType.replace("_", " ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
