import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WHATSAPP = "2349054434502";

const samples = [
  { title: "Custom Tumblers", category: "Gifts", emoji: "🥤" },
  { title: "Birthday Posters", category: "Events", emoji: "🎂" },
  { title: "Business Cards", category: "Branding", emoji: "💳" },
  { title: "Award Frames", category: "Awards", emoji: "🏆" },
  { title: "School Badges", category: "Schools", emoji: "🎖️" },
  { title: "Lapel Pins", category: "Branding", emoji: "📌" },
  { title: "Custom Jerseys", category: "Apparel", emoji: "👕" },
  { title: "Bottle Labels", category: "Events", emoji: "💧" },
  { title: "Food Flyers", category: "Business", emoji: "🍔" },
  { title: "Photo Mugs", category: "Gifts", emoji: "☕" },
  { title: "Invoices", category: "Stationery", emoji: "📄" },
  { title: "Salon Flyers", category: "Business", emoji: "💇" },
  { title: "Graphics Design", category: "Design", emoji: "🎨" },
  { title: "Fashion Cards", category: "Branding", emoji: "👔" },
  { title: "Banners & Frames", category: "Events", emoji: "🖼️" },
];

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold mb-2">Our Work</h1>
        <p className="text-gray-600 mb-8">
          Samples of what we design and print. Tap any item to order on WhatsApp.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {samples.map((s) => (
            <a
              key={s.title}
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                `Hello Favour Store! I want to order: ${s.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition text-center p-5"
            >
              <div className="text-4xl mb-3">{s.emoji}</div>
              <p className="text-xs text-brand-600 font-medium">{s.category}</p>
              <h3 className="font-semibold text-sm mt-1">{s.title}</h3>
              <p className="text-xs text-green-600 mt-2">Order on WhatsApp →</p>
            </a>
          ))}
        </div>

        {!loading && products.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">Catalog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                  <div className="h-36 bg-gray-100 flex items-center justify-center text-4xl">📦</div>
                  <div className="p-4">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-brand-700 font-bold mt-1">
                      ₦{Number(product.price).toLocaleString()}
                    </p>
                    <a
                      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                        `Hello! I want to buy: ${product.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm text-green-600 font-medium"
                    >
                      Order on WhatsApp →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-12 text-center bg-green-50 border border-green-200 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-2">Need something custom?</h2>
          <p className="text-sm text-gray-600 mb-4">
            Frame, banner, jersey, tumbler, poster, badge — just tell us.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
              "Hello! I want a custom design/print job."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-600"
          >
            Chat on WhatsApp — 09054434502
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
