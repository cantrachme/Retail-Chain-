import { useState, useEffect } from "react";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ order_id: "", supplier_id: "", status: "processing", estimated_delivery: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/deliveries/")
      .then((res) => res.json()).then((data) => setDeliveries(data));
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((res) => res.json()).then((data) => setOrders(data));
    fetch("http://127.0.0.1:8000/api/suppliers/")
      .then((res) => res.json()).then((data) => setSuppliers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/deliveries/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        order_id: parseInt(form.order_id),
        supplier_id: form.supplier_id ? parseInt(form.supplier_id) : null,
        estimated_delivery: form.estimated_delivery || null,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setDeliveries([...deliveries, data]);
      setMessage("Delivery created successfully!");
      setIsError(false);
      setForm({ order_id: "", supplier_id: "", status: "processing", estimated_delivery: "" });
    } else {
      setMessage(JSON.stringify(data));
      setIsError(true);
    }
  };

  const getOrderLabel = (id) => {
    const o = orders.find((o) => o.id === id);
    return o ? `Order #${o.id}` : "Unknown";
  };
  const getSupplierName = (id) => suppliers.find((s) => s.id === id)?.name || "N/A";

  const statusColors = {
    processing: "bg-blue-100 text-blue-600",
    shipped: "bg-yellow-100 text-yellow-600",
    delivered: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">🚚 Deliveries</h1>

      {message && <p className={`mb-4 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>{isError ? "❌" : "✅"} {message}</p>}

      {/* Create Delivery Form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Delivery</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={form.order_id}
            onChange={(e) => setForm({ ...form, order_id: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Order</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>Order #{o.id}</option>
            ))}
          </select>
          <select
            value={form.supplier_id}
            onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Supplier (optional)</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="datetime-local"
            value={form.estimated_delivery}
            onChange={(e) => setForm({ ...form, estimated_delivery: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
            Create Delivery
          </button>
        </form>
      </div>

      {/* Deliveries List */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Deliveries</h2>
        {deliveries.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No deliveries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Delivery #</th>
                <th className="pb-2">Order</th>
                <th className="pb-2">Supplier</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Est. Delivery</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((d) => (
                <tr key={d.id} className="border-b hover:bg-indigo-50 transition">
                  <td className="py-2 font-medium text-gray-700">#{d.id}</td>
                  <td className="py-2 text-gray-500">{getOrderLabel(d.order_id)}</td>
                  <td className="py-2 text-gray-500">{getSupplierName(d.supplier_id)}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[d.status] || "bg-gray-100 text-gray-600"}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-2 text-gray-500">
                    {d.estimated_delivery ? new Date(d.estimated_delivery).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Deliveries;