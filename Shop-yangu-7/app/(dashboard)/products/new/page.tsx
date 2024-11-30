// CreateProduct.tsx

"use client"; // Ensure the component is client-side rendered

import ProductsForm from "@/components/products/ProductsForm";

const CreateProduct = () => {
  const handleProductSubmit = (productData: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }) => {
    // Handle the product data submission, e.g., send to API or manage state
    console.log(productData);
    // You can send this data to a server or use it in another part of your app.
  };

  return <ProductsForm onSubmit={handleProductSubmit} />;
};

export default CreateProduct;
