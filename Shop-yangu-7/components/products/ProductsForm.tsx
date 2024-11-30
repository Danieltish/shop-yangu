import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Updated form schema for product (name, description, price, etc.)
const formSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  price: z.number().min(0.01, "Price must be greater than zero"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

const ProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0.0,
      quantity: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const productData = {
      name: values.name,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
    };

    // Send a POST request to the json-server endpoint (http://localhost:5000/products)
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log("Product created successfully!");
        // Redirect to the products page or another page
        window.location.href = "http://localhost:3000/products"; // Update to redirect to the desired location
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-10">
      <p className="text-heading2-bold">Create Product</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Product Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Product price"
                    {...field}
                    step="0.01"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Product quantity"
                    {...field}
                    min="1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
