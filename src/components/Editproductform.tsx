"use client";
import { useState } from "react";
import { uploadImageToSupabase } from "@/app/actions/uploadimagetosupabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { editProduct } from "@/app/actions/editProduct";


export default function EditProductForm({
  product
}: {
  product: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    initialStock: number;
    availableStock: number;
  };
}) {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>(product.name); // Pre-fill with current product name
  const [description, setDescription] = useState<string>(product.description); // Pre-fill with current description
  const [initialStock, setInitialStock] = useState<number>(product.initialStock); // Pre-fill with current initial stock
  const [availableStock, setAvailableStock] = useState<number>(product.availableStock); // Pre-fill with current available stock

  const handleSubmit = async () => {

    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);
      formData.set("initial_stock", initialStock.toString());
      formData.set("available_stock", availableStock.toString());

      // If a new image is selected, upload it and add it to the form data
      if (image) {
        const imageUrl = await uploadImageToSupabase(image);
        formData.set("image_url", imageUrl);
      } else {
        formData.set("image_url", product.imageUrl); // Keep the old image URL if no new image is selected
      }

      // Calling the server action for product
      await editProduct(formData, product.id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Edit Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg w-full">
        {/* Product Name */}
        <Input
          name="name"
          value={name} // Use the state value for name
          onChange={(e) => setName(e.target.value)} // Update state when the input value changes
          className="border-gray-300 placeholder:text-gray-400"
          required
        />

        {/* Product Description */}
        <Input
          name="description"
          value={description} // Use the state value for description
          onChange={(e) => setDescription(e.target.value)} // Update state when the input value changes
          className="border-gray-300 placeholder:text-gray-400"
          required
        />

        {/* Initial Stock */}
        <Input
         
          value={initialStock} // Use the state value for initial stock
          onChange={(e) => setInitialStock(Number(e.target.value))} // Update state when the value changes
          className="border-gray-300 placeholder:text-gray-400"
          required
        />

        {/* Available Stock */}
        <Input
          value={availableStock} // Use the state value for available stock
          onChange={(e) => setAvailableStock(Number(e.target.value))} // Update state when the value changes
          className="border-gray-300 placeholder:text-gray-400"
          required
        />
      
         

        {/* Product Image */}
        <div className="relative mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={100}
            height={100}
            className="w-24 h-24 object-cover rounded"
          />
          <Input
            type="file"
            name="image_url"
            onChange={(e) => setImage(e.target.files?.[0] || null)} // Update image state when a file is selected
            className="border-gray-300 placeholder:text-gray-400 mt-2"
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 shadow-md"
          type="submit"
        >
          Update Product
        </Button>
      </form>
    </div>
  );
}
