"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming this is your custom button component
import Link from "next/link"; // Import Link for navigation

interface Shop {
  id: number;
  name: string;
  description: string;
}

const Dashboard = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [editingShop, setEditingShop] = useState<Shop | null>(null); // Track the shop being edited
  const [editedName, setEditedName] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");

  // Fetch shops data when the component mounts
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://localhost:5000/shops");
        if (response.ok) {
          const data = await response.json();
          setShops(data);
        } else {
          console.error("Failed to fetch shops");
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  // Delete shop handler
  const deleteShop = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/shops/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove shop from state after successful delete
        setShops(shops.filter((shop) => shop.id !== id));
        console.log("Shop deleted successfully!");
      } else {
        console.error("Failed to delete shop");
      }
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  // Start editing a shop
  const startEditing = (shop: Shop) => {
    setEditingShop(shop);
    setEditedName(shop.name);
    setEditedDescription(shop.description);
  };

  // Submit edited shop details
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShop) return;

    const updatedShop = {
      ...editingShop,
      name: editedName,
      description: editedDescription,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/shops/${editingShop.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedShop),
        }
      );

      if (response.ok) {
        // Update the shop in the local state
        setShops(
          shops.map((shop) => (shop.id === editingShop.id ? updatedShop : shop))
        );
        setEditingShop(null);
        console.log("Shop updated successfully!");
      } else {
        console.error("Failed to update shop");
      }
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  return (
    <div className="p-10">
      <p className="text-2xl font-bold">Dashboard</p>

      {/* Conditional Rendering for shops */}
      {shops.length === 0 ? (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center">
          <p className="text-lg font-semibold text-gray-700">
            No shops available.{" "}
            <Link href="/shops/new" className="text-blue-500 underline">
              Click here to add shops
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-white p-6 rounded-lg shadow-lg">
              {/* Shop title with larger size, custom font, and color */}
              <h3 className="text-4xl font-serif text-blue-700">{shop.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{shop.description}</p>

              {/* Buttons for View Products, Edit, and Delete */}
              <div className="flex justify-between items-center mt-4">
                <Button
                  size="sm"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  View Products
                </Button>
                <Button
                  size="sm"
                  className="bg-yellow-500 text-white hover:bg-yellow-600"
                  onClick={() => startEditing(shop)} // Trigger edit form
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => deleteShop(shop.id)} // Add onClick handler for Delete
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Shop Form */}
      {editingShop && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Edit Shop
            </h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => setEditingShop(null)} // Cancel editing
                  className="bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
