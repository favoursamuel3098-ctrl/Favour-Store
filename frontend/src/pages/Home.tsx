import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WHATSAPP = "2349054434502"; // 09054434502

const services = [
  { title: "Custom Tumblers & Cups", desc: "Engraved gift tumblers for birthdays, events & brands", emoji: "🥤" },
  { title: "Birthday & Event Posters", desc: "Professional birthday, wedding & celebration designs", emoji: "🎂" },
  { title: "Business Cards", desc: "Premium business cards with QR codes & branding", emoji: "💳" },
  { title: "Award Certificates & Frames", desc: "Elegant award frames and certificates", emoji: "🏆" },
  { title: "School Badges & Pins", desc: "Prefect badges, lapel pins & name tags", emoji: "🎖️" },
  { title: "Jerseys & Apparel Print", desc: "Custom jersey names, numbers & branding", emoji: "👕" },
  { title: "Water Bottle Labels", desc: "Event & birthday bottle label designs", emoji: "💧" },
  { title: "Flyers & Banners", desc: "Restaurant, salon, church & business flyers", emoji: "📜" },
  { title: "Custom Mugs", desc: "Photo mugs for birthdays and gifts", emoji: "☕" },
  { title: "Invoices & Stationery", desc: "Cash invoices, letterheads & forms", emoji: "📄" },
  { title: "Logo & Branding", desc: "Logo design, brand identity & graphics", emoji: "🎨" },
  { title: "Frames & Mounting", desc: "Photo frames, certificate framing", emoji: "🖼️" },
];

export default function Home() {
  const whatsappLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Hello Favour Store! I want to order a design / print job."
  )}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-100 text-sm font-medium mb-2">PRINTING PRESS · DESIGN · BRANDING</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Favour Store
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-2">
            Quality Printing & Creative Design by Favour Samuel Olakunle
          </p>
          <p className="text-sm opacity-75 mb-8">
            Tumblers · Posters · Business Cards · Badges · Jerseys · Frames · Banners & more
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/products"
              className="inline-block bg-white text-brand-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              View Our Work
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-600 transition"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-center mb-2">What We Print & Design</h2>
        <p className="text-center text-gray-500 text-sm mb-10">
          Tell us what you need — we design and print it
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <a
              key={s.title}
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                `Hello! I want to order: ${s.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border rounded-2xl p-5 text-center hover:shadow-md hover:border-brand-300 transition"
            >
              <div className="text-3xl mb-2">{s.emoji}</div>
              <h3 className="font-semibold text-sm">{s.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">How to Order</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl">
              <div className="text-3xl font-bold text-brand-600 mb-2">1</div>
              <h3 className="font-semibold">Message us</h3>
              <p className="text-sm text-gray-500 mt-1">WhatsApp what you want (frame, banner, cards, etc.)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl">
              <div className="text-3xl font-bold text-brand-600 mb-2">2</div>
              <h3 className="font-semibold">We design</h3>
              <p className="text-sm text-gray-500 mt-1">We create the design and send you preview</p>
            </div>
            <div className="bg-white p-6 rounded-2xl">
              <div className="text-3xl font-bold text-brand-600 mb-2">3</div>
              <h3 className="font-semibold">Pay & Print</h3>
              <p className="text-sm text-gray-500 mt-1">Pay to Opay 7075627260 — we print & deliver</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-600"
            >
              Chat on WhatsApp — 09054434502
            </a>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="text-3xl mb-2">🎨</div>
          <h3 className="font-semibold text-lg">Custom Design</h3>
          <p className="text-gray-600 text-sm mt-1">We design exactly what you need</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="text-3xl mb-2">🖨️</div>
          <h3 className="font-semibold text-lg">Quality Print</h3>
          <p className="text-gray-600 text-sm mt-1">Sharp prints on premium materials</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="text-3xl mb-2">💬</div>
          <h3 className="font-semibold text-lg">Easy WhatsApp Order</h3>
          <p className="text-gray-600 text-sm mt-1">09054434502 · favoursamuel3098@gmail.com</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
