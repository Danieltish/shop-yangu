"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  shopId: string;
}

export default function ProductForm({ shopId }: ProductFormProps) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [stockLevel, setStockLevel] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!productName || !price || !stockLevel || !description || !image) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price.toString());
    formData.append("stockLevel", stockLevel.toString());
    formData.append("description", description);
    formData.append("image", image);

    // Sending the product details to the server
    const response = await fetch(
      `http://localhost:3001/shops/${shopId}/products`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      // After successfully adding the product, redirect to the shop's page or dashboard
      router.push(`/shops/${shopId}`);
    } else {
      setError("There was an error adding the product.");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Product to Your Shop
      </h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md"
      >
        <div className="mb-6">
          <label htmlFor="productName" className="block text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="stockLevel" className="block text-gray-700 mb-2">
            Stock Level
          </label>
          <input
            type="number"
            id="stockLevel"
            value={stockLevel}
            onChange={(e) => setStockLevel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
