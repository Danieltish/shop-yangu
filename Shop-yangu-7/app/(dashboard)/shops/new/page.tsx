// CreateShop.tsx

"use client"; // Add this line here as well

import ShopForm from "@/components/shops/new/ShopForm";

// This will make sure CreateShop is a Client Component as well.
const CreateShop = () => {
  const handleShopSubmit = (shopData: {
    name: string;
    description: string;
    logo: string | null;
  }) => {
    // Handle the data submission
    console.log(shopData);
    // You can send this data to a server or use it in another part of your app.
  };

  return <ShopForm onSubmit={handleShopSubmit} />;
};

export default CreateShop;
