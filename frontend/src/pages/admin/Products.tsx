import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    deliveryType: "DOWNLOAD_FILE",
    categoryId: "",
    isFeatured: false,
  });

  useEffect(() => {
    if (!token || user.role !== "ADMIN") {
      navigate("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/products?limit=50"),
        fetch("/api/categories"),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      setProducts(prodData.products || []);
      setCategories(catData.categories || []);
      if (catData.categories?.length && !form.categoryId) {
        setForm((f) => ({ ...f, categoryId: catData.categories[0].id }));
      }
    } catch {
      setMessage("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
          description: form.description,
          price: parseFloat(form.price),
          deliveryType: form.deliveryType,
          categoryId: form.categoryId,
          isFeatured: form.isFeatured,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Product created successfully!");
        setShowForm(false);
        setForm({
          title: "",
          slug: "",
          description: "",
          price: "",
          deliveryType: "DOWNLOAD_FILE",
          categoryId: categories[0]?.id || "",
          isFeatured: false,
        });
        loadData();
      } else {
        setMessage(data.error || "Failed to create product");
      }
    } catch {
      setMessage("Network error");
    }
  };

  const deactivate = async (id: string) => {
    if (!token) return;
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadData();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:block">
        <h1 className="text-xl font-bold text-indigo-400 mb-8">Favour Store</h1>
        <p className="text-xs text-slate-500 mb-6">ADMIN PANEL</p>
        <nav className="space-y-2 text-sm">
          <Link to="/admin" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Overview</Link>
          <Link to="/admin/products" className="block px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-300">Products</Link>
          <Link to="/admin/orders" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Orders</Link>
          <Link to="/admin/users" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Users</Link>
          <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800 mt-6 text-slate-400">← Back to Store</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium"
          >
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        </div>

        {message && (
          <div className="bg-indigo-900/40 text-indigo-200 p-3 rounded-lg mb-6 text-sm">{message}</div>
        )}

        {showForm && (
          <form onSubmit={createProduct} className="bg-slate-800 rounded-2xl p-6 mb-8 max-w-xl space-y-4">
            <h3 className="font-semibold text-lg">New Product</h3>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Slug (optional)</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated-from-title"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Description</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Price (₦)</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Delivery Type</label>
                <select
                  value={form.deliveryType}
                  onChange={(e) => setForm({ ...form, deliveryType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="DOWNLOAD_FILE">Download File</option>
                  <option value="LICENSE_KEY">License Key</option>
                  <option value="COURSE_ACCESS">Course Access</option>
                  <option value="EMAIL_DELIVERY">Email Delivery</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Category</label>
              <select
                required
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              />
              Featured product
            </label>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg text-sm font-medium"
            >
              Create Product
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-slate-400">No products yet. Click "Add Product" to create one.</p>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-slate-800 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-slate-400">
                    ₦{Number(p.price).toLocaleString()} · {p.category?.name} · {p.deliveryType}
                  </p>
                </div>
                <button
                  onClick={() => deactivate(p.id)}
                  className="text-red-400 text-sm hover:underline"
                >
                  Deactivate
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
