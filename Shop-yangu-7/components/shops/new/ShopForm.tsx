import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router"; // For navigation after form submission
import { Separator } from "../../ui/separator";
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
import { Textarea } from "../../ui/textarea";

// Updated form schema
const formSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
});

const ShopForm = () => {
  const router = useRouter(); // Initialize router for navigation after submission
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const shopData = {
      name: values.name,
      description: values.description,
    };

    try {
      const response = await fetch("http://localhost:5000/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      });

      if (response.ok) {
        console.log("Shop created successfully!");
        // Redirect to the dashboard or homepage
        router.push("/dashboard"); // Redirect using Next.js router
      } else {
        console.error("Failed to create shop");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-10 space-y-10 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Delete Shop Button */}
      <div className="flex justify-start">
        <Button variant="destructive" size="sm">
          Delete Shop
        </Button>
      </div>

      {/* Form Title */}
      <p className="text-2xl font-bold">Create Shop</p>
      <Separator className="bg-grey-1 mt-4 mb-7" />

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Shop Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Shop Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter shop name"
                    {...field}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Shop Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Shop Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what the shop sells and where it's located"
                    {...field}
                    rows={5}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 mt-6"
          >
            Submit
          </Button>
        </form>
      </Form>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8 space-x-4">
        {/* View Products Button */}
        <Button variant="outline" className="w-full py-3">
          View Products
        </Button>
        {/* Edit Shop Button */}
        <Button variant="secondary" className="w-full py-3">
          Edit Shop
        </Button>
      </div>
    </div>
  );
};

export default ShopForm;
