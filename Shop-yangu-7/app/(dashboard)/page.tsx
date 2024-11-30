"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Shop {
  id: string;
  name: string;
  description: string;
  logo: string | null; // Ensure the correct URL is used
}

export default function DashboardPage() {
  const [shops, setShops] = useState<Shop[]>([]);

  // Fetch shops data from the mock API (db.json)
  const fetchShops = async () => {
    const response = await fetch("http://localhost:3001/shops");
    const data = await response.json();
    setShops(data);
  };

  // Function to delete a shop
  const deleteShop = async (id: string) => {
    // Make the API call to delete the shop from db.json
    await fetch(`http://localhost:3001/shops/${id}`, {
      method: "DELETE",
    });

    // Remove the shop from the state to update the UI
    setShops(shops.filter((shop) => shop.id !== id));
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome to Duka Yangu Dashboard
      </h1>

      {shops.length === 0 ? (
        <div className="text-center">
          <p className="mb-6 text-gray-600">You have no shops at the moment.</p>
          <Link
            href="/shops/new"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Create New Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative flex flex-col justify-between" // Added flexbox for better layout control
            >
              {/* Delete Icon */}
              <button
                onClick={() => deleteShop(shop.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                🗑️ {/* Trash icon */}
              </button>

              {/* Shop Name */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {shop.name}
                </h3>
              </div>

              {/* Shop Description - Centered */}
              <div className="flex-grow flex items-center justify-center p-5">
                <p className="text-gray-600 text-center">{shop.description}</p>
              </div>

              {/* Shop Logo - Small and at the bottom */}
              <div className="p-5 flex justify-center">
                {shop.logo ? (
                  <img
                    src={`http://localhost:3001/uploads/${shop.logo}`} // Ensure correct path
                    alt={`${shop.name} logo`}
                    className="w-16 h-16 object-contain" // Small logo
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Logo</span>
                  </div>
                )}
              </div>

              {/* Add Products Button */}
              <div className="p-5 text-center">
                <Link
                  href={`/shops/${shop.id}/add-products`} // Assuming a page for adding products exists
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Add Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Button to add a new shop, will always be visible */}
      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-4">
          Add another shop to your collection!
        </p>
        <Link
          href="/shops/new"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          Add New Shop
        </Link>
      </div>
    </div>
  );
}
