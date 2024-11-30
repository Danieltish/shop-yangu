import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

// Updated form schema to remove logo
const formSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
});

const ShopForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const shopData = {
      name: values.name,
      description: values.description,
    };

    // Send a POST request to the json-server endpoint (http://localhost:5000/shops)
    try {
      const response = await fetch("http://localhost:5000/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData), // Convert object to JSON without logo
      });

      if (response.ok) {
        console.log("Shop created successfully!");
        // Redirect to the dashboard or homepage
        window.location.href = "http://localhost:3000/"; // Update to redirect to the desired location
      } else {
        console.error("Failed to create shop");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-10">
      <p className="text-heading2-bold">Create Shop</p>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Shop Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Name</FormLabel>
                <FormControl>
                  <Input placeholder="Shop name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Shop Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe what the shop sells and where it is located"
                    {...field}
                    rows={5}
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

export default ShopForm;
