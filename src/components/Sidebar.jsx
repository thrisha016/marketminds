import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <aside className="fixed w-64 bg-gradient-to-b from-blue-800 to-indigo-900 min-h-screen text-white hidden md:flex flex-col p-6 left-0 top-0 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center text-lg font-bold">M</div>
        <div>
          <div className="font-bold text-lg">Marketmind</div>
          <div className="text-xs text-white/70">Inventory</div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="px-3 py-2 rounded-md hover:bg-white/5">
            <Link to="/" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">🏠</span> Dashboard
            </Link>
          </li>
          <li className="px-3 py-2 rounded-md bg-white/6">
            <Link to="/" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">📦</span> Inventory
            </Link>
          </li>
          <li className="px-3 py-2 rounded-md hover:bg-white/5">
            <Link to="/product-form" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">➕</span> Add Product
            </Link>
          </li>

          {/* Sales Section */}
          <li className="pt-4 mt-4 border-t border-white/10 px-3 py-2 rounded-md hover:bg-white/5">
            <Link to="/sales" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-lg">💼</span> Sales
            </Link>
          </li>

          {/* Billing Link */}
          <li className="px-3 py-2 rounded-md hover:bg-white/5">
            <Link to="/billing" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">💳</span> Billing
            </Link>
          </li>
          <li className="px-3 py-2 rounded-md hover:bg-white/5">
            <a href="#" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">❓</span> Help
            </a>
          </li>
          <li className="px-3 py-2 rounded-md hover:bg-white/5">
            <a href="#" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">ℹ️</span> About Us
            </a>
          </li>
          <li className="px-3 py-2 rounded-md hover:bg-white/5">
            <a href="#" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">📧</span> Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="mt-6 text-sm text-white/80 pt-4 border-t border-white/10">
        <button className="w-full bg-white/10 hover:bg-white/12 px-3 py-2 rounded-md text-left">Contact Support</button>
      </div>
    </aside>
  );
}
