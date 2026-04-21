import { useState, useEffect } from "react";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/suppliers/")
      .then((res) => res.json())
      .then((data) => setSuppliers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/suppliers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setSuppliers([...suppliers, data]);
      setMessage("Supplier created successfully!");
      setIsError(false);
      setForm({ name: "", email: "", phone: "", address: "" });
    } else {
      setMessage(JSON.stringify(data));
      setIsError(true);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">🏭 Suppliers</h1>

      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Supplier</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "address"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required={field === "name" || field === "email"}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
            Add Supplier
          </button>
        </form>
        {message && <p className={`mt-3 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>{isError ? "❌" : "✅"} {message}</p>}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Suppliers</h2>
        {suppliers.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No suppliers yet.</p>
        ) : (
          <ul className="space-y-3">
            {suppliers.map((s) => (
              <li key={s.id} className="border border-gray-100 rounded-xl px-4 py-3 hover:bg-indigo-50 transition">
                <p className="font-semibold text-gray-700">{s.name}</p>
                <p className="text-sm text-gray-400">{s.email} • {s.phone || "No phone"}</p>
                <p className="text-sm text-gray-400">{s.address || "No address"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Suppliers;