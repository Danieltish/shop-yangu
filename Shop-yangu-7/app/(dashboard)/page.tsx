"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link for navigation

interface Shop {
  id: number;
  name: string;
  description: string;
  products?: never[]; // Assuming products are added later to the shop
}

interface Product {
  id: number;
  name: string;
  price: number;
  stockLevel: number;
  description: string;
}

const Dashboard = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [editingShop, setEditingShop] = useState<Shop | null>(null); // Track the shop being edited
  const [editedName, setEditedName] = useState<string>(""); // Edited name state
  const [editedDescription, setEditedDescription] = useState<string>(""); // Edited description state
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false); // Track if Add Product popup is open
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stockLevel: 0,
    description: "",
  });

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // Handle adding new product
  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productToAdd = { ...newProduct };

    try {
      const response = await fetch(`http://localhost:5000/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToAdd),
      });

      if (response.ok) {
        // Close the form and refresh the product data
        setIsAddingProduct(false);
        setNewProduct({
          id: 0,
          name: "",
          price: 0,
          stockLevel: 0,
          description: "",
        });
        console.log("Product added successfully!");
        // Reload shops to update product list
        const data = await response.json();
        setShops(data);
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-10">
      <p className="text-2xl font-bold">Dashboard</p>

      {/* Button for creating new shop */}
      <div className="mt-6 p-6 bg-blue-50 rounded-lg shadow-lg flex items-center justify-between mb-6">
        <p className="text-lg font-semibold text-blue-700">
          Want to add a new shop? Click below!
        </p>
        <Link href="/shops/new">
          <Button className="bg-green-500 text-white hover:bg-green-600">
            Add New Shop
          </Button>
        </Link>
      </div>

      {/* Conditional Rendering for shops */}
      {shops.length === 0 ? (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center">
          <p className="text-lg font-semibold text-gray-700">
            {/* Empty message */}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white p-6 rounded-lg shadow-lg relative"
            >
              {/* Delete Icon (top right corner) */}
              <span
                className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => deleteShop(shop.id)}
              >
                <span className="material-icons">delete</span>{" "}
                {/* Trash icon */}
              </span>

              <h3 className="text-4xl font-serif text-blue-700">{shop.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{shop.description}</p>

              {/* Buttons for Edit and Add/View Products in one line */}
              <div className="flex justify-between items-center mt-4">
                {/* If shop has products, show View Products button */}
                {shop.products && shop.products.length > 0 ? (
                  <Link href={`/products/${shop.id}`}>
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      View Products
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="sm"
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => setIsAddingProduct(true)}
                  >
                    Add Products
                  </Button>
                )}

                {/* Edit Button */}
                <div className="ml-2">
                  <Button
                    size="sm"
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                    onClick={() => startEditing(shop)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Popup */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Add Product
            </h3>
            <form onSubmit={handleAddProductSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Stock Level
                </label>
                <input
                  type="number"
                  value={newProduct.stockLevel}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stockLevel: parseInt(e.target.value),
                    })
                  }
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Add Product
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
