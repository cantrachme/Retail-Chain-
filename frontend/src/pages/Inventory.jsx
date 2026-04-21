import { useState, useEffect } from "react";

function Inventory() {
  const [warehouses, setWarehouses] = useState([]);
  const [stock, setStock] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouseForm, setWarehouseForm] = useState({ name: "", location: "" });
  const [stockForm, setStockForm] = useState({ product_id: "", warehouse_id: "", quantity: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/warehouses/")
      .then((res) => res.json()).then((data) => setWarehouses(data));
    fetch("http://127.0.0.1:8000/api/stock/")
      .then((res) => res.json()).then((data) => setStock(data));
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json()).then((data) => setProducts(data));
  }, []);

  const handleWarehouseSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/warehouses/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(warehouseForm),
    });
    const data = await res.json();
    if (res.ok) {
      setWarehouses([...warehouses, data]);
      setMessage("Warehouse added successfully!");
      setIsError(false);
      setWarehouseForm({ name: "", location: "" });
    } else {
      setMessage(JSON.stringify(data));
      setIsError(true);
    }
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/stock/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...stockForm,
        product_id: parseInt(stockForm.product_id),
        warehouse_id: parseInt(stockForm.warehouse_id),
        quantity: parseInt(stockForm.quantity),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setStock([...stock, data]);
      setMessage("Stock added successfully!");
      setIsError(false);
      setStockForm({ product_id: "", warehouse_id: "", quantity: "" });
    } else {
      setMessage(JSON.stringify(data));
      setIsError(true);
    }
  };

  const getProductName = (id) => products.find((p) => p.id === id)?.name || "Unknown";
  const getWarehouseName = (id) => warehouses.find((w) => w.id === id)?.name || "Unknown";

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">🏬 Inventory</h1>

      {message && <p className={`mb-4 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>{isError ? "❌" : "✅"} {message}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Add Warehouse */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Warehouse</h2>
          <form onSubmit={handleWarehouseSubmit} className="space-y-4">
            <input
              placeholder="Warehouse Name"
              value={warehouseForm.name}
              onChange={(e) => setWarehouseForm({ ...warehouseForm, name: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Location (optional)"
              value={warehouseForm.location}
              onChange={(e) => setWarehouseForm({ ...warehouseForm, location: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
              Add Warehouse
            </button>
          </form>
        </div>

        {/* Add Stock */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Stock</h2>
          <form onSubmit={handleStockSubmit} className="space-y-4">
            <select
              value={stockForm.product_id}
              onChange={(e) => setStockForm({ ...stockForm, product_id: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <select
              value={stockForm.warehouse_id}
              onChange={(e) => setStockForm({ ...stockForm, warehouse_id: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
            <input
              placeholder="Quantity"
              type="number"
              value={stockForm.quantity}
              onChange={(e) => setStockForm({ ...stockForm, quantity: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
              Add Stock
            </button>
          </form>
        </div>
      </div>

      {/* Warehouses List */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Warehouses</h2>
        {warehouses.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No warehouses yet.</p>
        ) : (
          <ul className="space-y-3">
            {warehouses.map((w) => (
              <li key={w.id} className="border border-gray-100 rounded-xl px-4 py-3 hover:bg-indigo-50 transition">
                <p className="font-semibold text-gray-700">{w.name}</p>
                <p className="text-sm text-gray-400">{w.location || "No location"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stock List */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Stock Levels</h2>
        {stock.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No stock entries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Product</th>
                <th className="pb-2">Warehouse</th>
                <th className="pb-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((s) => (
                <tr key={s.id} className="border-b hover:bg-indigo-50 transition">
                  <td className="py-2 font-medium text-gray-700">{getProductName(s.product_id)}</td>
                  <td className="py-2 text-gray-500">{getWarehouseName(s.warehouse_id)}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.quantity > 10 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                      {s.quantity} units
                    </span>
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

export default Inventory;