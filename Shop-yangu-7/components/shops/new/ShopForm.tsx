import { useState, useEffect } from "react"; // Import useState, useEffect
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

// Updated form schema to accept a File
const formSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  logo: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Shop logo is required"),
});

const ShopForm = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // State for image preview
  const [isClient, setIsClient] = useState(false); // Flag to check if it's client-side

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: undefined,
    },
  });

  // Ensure we only update logo preview on the client
  useEffect(() => {
    setIsClient(true); // Set the client-side flag after component mounts
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const file = values.logo[0]; // Access the uploaded file
    const shopData = {
      name: values.name,
      description: values.description,
      logo: file.name, // Include file name; saving the file itself requires a more advanced setup
    };

    // Send a POST request to the JSON server
    try {
      const response = await fetch("http://localhost:3001/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData), // Convert object to JSON
      });

      if (response.ok) {
        console.log("Shop created successfully!");
        // Redirect to dashboard
        window.location.href = "http://localhost:3000/";
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

          {/* Shop Logo Upload */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field: { onChange, ref } }) => (
              <FormItem>
                <FormLabel>Shop Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(e.target.files);
                        if (isClient) {
                          setLogoPreview(URL.createObjectURL(file)); // Create preview URL on client-side
                        }
                      }
                    }}
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display Logo Preview */}
          {logoPreview && (
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Logo Preview:</p>
              <img
                src={logoPreview}
                alt="Shop Logo Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ShopForm;
