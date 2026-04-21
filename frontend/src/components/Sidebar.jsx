import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "📊 Dashboard" },
  { to: "/products", label: "📦 Products" },
  { to: "/categories", label: "🏷️ Categories" },
  { to: "/suppliers", label: "🏭 Suppliers" },
  { to: "/inventory", label: "🏬 Inventory" },
  { to: "/orders", label: "🛒 Orders" },
  { to: "/deliveries", label: "🚚 Deliveries" },
];

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-indigo-900 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8 text-indigo-200">⚡ RetailChain</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-300 hover:bg-indigo-700 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;