import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WHATSAPP = "2349054434502";

export default function Contact() {
  const whatsappLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Hello Favour Store! I want to discuss a print/design job."
  )}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Printing Press · Design · Branding — Favour Samuel Olakunle
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="font-semibold text-lg mb-4">Business Details</h2>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-gray-500">Owner:</span>{" "}
                  <span className="font-medium">Favour Samuel Olakunle</span>
                </p>
                <p>
                  <span className="text-gray-500">WhatsApp:</span>{" "}
                  <a href={whatsappLink} className="text-green-600 font-semibold hover:underline">
                    09054434502
                  </a>
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  <a href="mailto:favoursamuel3098@gmail.com" className="text-brand-600 hover:underline">
                    favoursamuel3098@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-gray-500">Opay:</span>{" "}
                  <span className="font-medium">7075627260</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="font-semibold text-lg mb-3">What we do</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Custom tumblers & engraved cups</li>
                <li>• Birthday / event posters & flyers</li>
                <li>• Business cards & branding</li>
                <li>• Award certificates & frames</li>
                <li>• School badges, pins & name tags</li>
                <li>• Jerseys, mugs, bottle labels</li>
                <li>• Banners, invoices & more</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center flex flex-col justify-center">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-xl font-bold mb-2">Order on WhatsApp</h2>
            <p className="text-sm text-gray-600 mb-6">
              Tell us what you want — frame, banner, cards, jersey, tumbler, poster…
              We design, you approve, then we print.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-600"
            >
              Chat Now — 09054434502
            </a>
            <p className="text-xs text-gray-500 mt-4">
              Pay to Opay: 7075627260 (Favour Samuel Olakunle)
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
