import { useState, useEffect } from "react";

const stats = [
  { label: "Products", emoji: "📦", endpoint: "products" },
  { label: "Categories", emoji: "🏷️", endpoint: "categories" },
  { label: "Suppliers", emoji: "🏭", endpoint: "suppliers" },
  { label: "Warehouses", emoji: "🏬", endpoint: "warehouses" },
  { label: "Orders", emoji: "🛒", endpoint: "orders" },
  { label: "Deliveries", emoji: "🚚", endpoint: "deliveries" },
];

function Dashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    stats.forEach(({ label, endpoint }) => {
      fetch(`http://127.0.0.1:8000/api/${endpoint}/`)
        .then((res) => res.json())
        .then((data) => setCounts((prev) => ({ ...prev, [label]: data.length })))
        .catch(() => setCounts((prev) => ({ ...prev, [label]: 0 })));
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">📊 Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome to RetailChain — your supply chain overview</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(({ label, emoji }) => (
          <div key={label} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="text-4xl">{emoji}</div>
            <div>
              <p className="text-gray-500 text-sm">{label}</p>
              <p className="text-3xl font-bold text-indigo-600">
                {counts[label] !== undefined ? counts[label] : "..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;