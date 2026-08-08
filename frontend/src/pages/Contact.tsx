import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just show success (later we can connect to backend)
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          We are here to help. Reach out anytime.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="font-semibold text-lg mb-4">Business Details</h2>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-gray-500">Owner:</span>{" "}
                  <span className="font-medium">Favour Samuel Olakunle</span>
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  <a
                    href="mailto:favoursamuel3098@gmail.com"
                    className="text-brand-600 hover:underline"
                  >
                    favoursamuel3098@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  <a href="tel:09054434502" className="text-brand-600 hover:underline">
                    09054434502
                  </a>
                </p>
                <p>
                  <span className="text-gray-500">Opay:</span>{" "}
                  <span className="font-medium">7075627260</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="font-semibold text-lg mb-3">Support Hours</h2>
              <p className="text-sm text-gray-600">
                Digital products are delivered automatically 24/7 after payment.
                Human support is available via email and phone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="font-semibold text-lg mb-3">FAQ</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">How fast is delivery?</p>
                  <p className="text-gray-600">Instant after successful payment.</p>
                </div>
                <div>
                  <p className="font-medium">Can I get a refund?</p>
                  <p className="text-gray-600">
                    Yes, within 7 days if the product is defective or undeliverable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="font-semibold text-lg mb-4">Send a Message</h2>

            {sent ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm">
                Thank you! Your message has been received. We will get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
