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
              <h3 className="text-xl font-semibold">{shop.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{shop.description}</p>

              {/* Buttons for View Details, Edit, and Delete */}
              <div className="flex justify-between items-center mt-4">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="secondary">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteShop(shop.id)} // Add onClick handler for Delete
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
