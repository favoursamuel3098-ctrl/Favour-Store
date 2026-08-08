export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-semibold text-white text-lg">Favour Store</p>
        <p className="mt-2 text-sm">Owned by Favour Samuel Olakunle</p>
        <p className="mt-1 text-sm">
          Email: favoursamuel3098@gmail.com · Phone: 09054434502 · Opay: 7075627260
        </p>
        <p className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} Favour Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
