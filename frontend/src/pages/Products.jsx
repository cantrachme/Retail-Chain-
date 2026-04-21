import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", sku: "", category_id: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), category_id: form.category_id || null }),
    });
    const data = await res.json();
    if (res.ok) {
      setProducts([...products, data]);
      setMessage("Product created successfully!");
      setIsError(false);
      setForm({ name: "", description: "", price: "", sku: "", category_id: "" });
    } else {
      setMessage(JSON.stringify(data));
      setIsError(true);
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "Uncategorized";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">📦 Products</h1>

      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            placeholder="Price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            placeholder="SKU (unique code)"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Category (optional)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
            Add Product
          </button>
        </form>
        {message && <p className={`mt-3 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>{isError ? "❌" : "✅"} {message}</p>}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No products yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2">Name</th>
                <th className="pb-2">SKU</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-indigo-50 transition">
                  <td className="py-2 font-medium text-gray-700">{p.name}</td>
                  <td className="py-2 text-gray-400">{p.sku}</td>
                  <td className="py-2 text-indigo-600 font-semibold">${p.price.toFixed(2)}</td>
                  <td className="py-2 text-gray-500">{getCategoryName(p.category_id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Products;