import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderForm, setOrderForm] = useState({ user_id: "", status: "pending", total_amount: "" });
  const [itemForm, setItemForm] = useState({ order_id: "", product_id: "", quantity: "", unit_price: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders/")
      .then((res) => res.json()).then((data) => setOrders(data));
    fetch("http://127.0.0.1:8000/api/order-items/")
      .then((res) => res.json()).then((data) => setOrderItems(data));
    fetch("http://127.0.0.1:8000/api/users/")
      .then((res) => res.json()).then((data) => setUsers(data));
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json()).then((data) => setProducts(data));
  }, []);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...orderForm,
        user_id: parseInt(orderForm.user_id),
        total_amount: parseFloat(orderForm.total_amount),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setOrders([...orders, data]);
      setMessage("Order created successfully!");
      setIsError(false);
      setOrderForm({ user_id: "", status: "pending", total_amount: "" });
    } else {
      setMessage(JSON.stringify(data));
      setIsError(true);
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/order-items/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...itemForm,
        order_id: parseInt(itemForm.order_id),
        product_id: parseInt(itemForm.product_id),
        quantity: parseInt(itemForm.quantity),
        unit_price: parseFloat(itemForm.unit_price),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setOrderItems([...orderItems, data]);
      setMessage("Order item added successfully!");
      setIsError(false);
      setItemForm({ order_id: "", product_id: "", quantity: "", unit_price: "" });
    } else {
      setMessage(JSON.stringify(data));
      setIsError(true);
    }
  };

  const getUserName = (id) => users.find((u) => u.id === id)?.name || "Unknown";
  const getProductName = (id) => products.find((p) => p.id === id)?.name || "Unknown";

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-600",
    processing: "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">🛒 Orders</h1>

      {message && <p className={`mb-4 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>{isError ? "❌" : "✅"} {message}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Create Order */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Order</h2>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <select
              value={orderForm.user_id}
              onChange={(e) => setOrderForm({ ...orderForm, user_id: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            <select
              value={orderForm.status}
              onChange={(e) => setOrderForm({ ...orderForm, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              placeholder="Total Amount"
              type="number"
              step="0.01"
              value={orderForm.total_amount}
              onChange={(e) => setOrderForm({ ...orderForm, total_amount: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
              Create Order
            </button>
          </form>
        </div>

        {/* Add Order Item */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Order Item</h2>
          <form onSubmit={handleItemSubmit} className="space-y-4">
            <select
              value={itemForm.order_id}
              onChange={(e) => setItemForm({ ...itemForm, order_id: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Order</option>
              {orders.map((o) => (
                <option key={o.id} value={o.id}>Order #{o.id} — {getUserName(o.user_id)}</option>
              ))}
            </select>
            <select
              value={itemForm.product_id}
              onChange={(e) => setItemForm({ ...itemForm, product_id: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              placeholder="Quantity"
              type="number"
              value={itemForm.quantity}
              onChange={(e) => setItemForm({ ...itemForm, quantity: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Unit Price"
              type="number"
              step="0.01"
              value={itemForm.unit_price}
              onChange={(e) => setItemForm({ ...itemForm, unit_price: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
              Add Item
            </button>
          </form>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Order #</th>
                <th className="pb-2">User</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b hover:bg-indigo-50 transition">
                  <td className="py-2 font-medium text-gray-700">#{o.id}</td>
                  <td className="py-2 text-gray-500">{getUserName(o.user_id)}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[o.status] || "bg-gray-100 text-gray-600"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-2 text-indigo-600 font-semibold">${o.total_amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Items List */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Items</h2>
        {orderItems.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No order items yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Order #</th>
                <th className="pb-2">Product</th>
                <th className="pb-2">Quantity</th>
                <th className="pb-2">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-indigo-50 transition">
                  <td className="py-2 font-medium text-gray-700">#{item.order_id}</td>
                  <td className="py-2 text-gray-500">{getProductName(item.product_id)}</td>
                  <td className="py-2 text-gray-500">{item.quantity}</td>
                  <td className="py-2 text-indigo-600 font-semibold">${item.unit_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Orders;