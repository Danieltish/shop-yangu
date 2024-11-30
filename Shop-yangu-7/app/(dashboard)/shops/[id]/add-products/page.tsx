"use client"; // Ensures this is a Client Component

import ProductForm from "../../../../../components/products/new/ProductForm";


const CreateProduct = () => {
  const handleShopSubmit = (productData: {
    name: string;
    description: string;
  }) => {
    // Handle the data submission
    console.log(productData);
    // You can send this data to a server or use it in another part of your app.
  };

  return <ProductForm onSubmit={handleShopSubmit} />;
};

export default CreateProduct;
