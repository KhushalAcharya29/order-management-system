"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast"; // NEW: For notifications

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- NEW: State for filters and editing ---
  const [productFilter, setProductFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null); // Track which order is being edited
  const [editingQuantity, setEditingQuantity] = useState(0); // Track the new quantity

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      // Build the URL with both filters
      const params = new URLSearchParams();
      if (productFilter) params.append("productName", productFilter);
      if (dateFilter) params.append("date", dateFilter);
      const url = `http://localhost:5000/api/orders?${params.toString()}`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) { throw new Error("Failed to fetch orders"); }
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [productFilter, dateFilter, router]);

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 10000); // Polling can be slightly less frequent
    return () => clearInterval(intervalId);
  }, [fetchOrders]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders(orders.filter((o) => o._id !== id));
      toast.success("Order deleted successfully!"); // NEW: Notification
    } catch (err) {
      toast.error(err.message); // NEW: Notification
    }
  };

  // --- NEW: Updated Edit/Save Flow ---
  const handleEditClick = (order) => {
    setEditingOrderId(order._id);
    setEditingQuantity(order.quantity);
  };

  const handleCancelClick = () => {
    setEditingOrderId(null);
  };

  const handleSaveClick = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quantity: editingQuantity }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      
      // Update the local state with the new quantity
      setOrders(orders.map(o => o._id === id ? { ...o, quantity: editingQuantity } : o));
      setEditingOrderId(null); // Exit editing mode
      toast.success("Quantity updated!"); // NEW: Notification
    } catch (err) {
      toast.error(err.message); // NEW: Notification
    }
  };

  if (loading) return <p className="text-center text-white mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <>
      <Toaster position="top-right" /> {/* NEW: Add Toaster component */}
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        
        {/* --- NEW: Filter Section --- */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by product name..."
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* --- NEW: Empty State --- */}
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o._id} className="border-t border-gray-700 hover:bg-gray-800">
                    <td className="p-3"><Image src={`http://localhost:5000/${o.productImage.replace(/\\/g, '/')}`} alt={o.productName} width={56} height={56} className="object-cover rounded"/></td>
                    <td className="p-3 align-middle">{o.customerName}</td>
                    <td className="p-3 align-middle">{o.productName}</td>
                    <td className="p-3 align-middle">
                      {/* --- NEW: Conditional rendering for edit mode --- */}
                      {editingOrderId === o._id ? (
                        <input
                          type="number"
                          value={editingQuantity}
                          onChange={(e) => setEditingQuantity(Number(e.target.value))}
                          className="w-20 bg-gray-600 text-white p-1 rounded border border-gray-500"
                        />
                      ) : (
                        o.quantity
                      )}
                    </td>
                    <td className="p-3 align-middle">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 align-middle">
                      {/* --- NEW: Conditional rendering for action buttons --- */}
                      {editingOrderId === o._id ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleSaveClick(o._id)} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm">Save</button>
                          <button onClick={handleCancelClick} className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm">Cancel</button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => handleEditClick(o)} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">Edit</button>
                          <button onClick={() => handleDelete(o._id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}