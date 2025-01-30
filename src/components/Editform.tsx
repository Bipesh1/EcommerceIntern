"use client";
import { useState } from "react";
import { createCategory } from "@/app/actions/category";
import { uploadImageToSupabase } from "@/app/actions/uploadimagetosupabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editCategory } from "@/app/actions/editCategory";
import Image from "next/image";

export default function Editform({category}:{
    category:{
        id: number
        name: string
        imageUrl: string
    }
}) {
  const [image, setImage] = useState<File | null>(null);

  const [name, setName] = useState<string>(category.name)

  const handleSubmit = async (formData: FormData) => {
    try {
        const formData = new FormData();
        formData.set("name", name);
  
        // If a new image is selected, upload  and add it to the form data
        if (image) {
          const imageUrl = await uploadImageToSupabase(image);
          formData.set("image_url", imageUrl); // Set the new image URL if it exists
        } else {
          formData.set("image_url", category.imageUrl); // Keep the old image URL if no new image is selected
        }
  
        // Calling the server action for category
        await editCategory(formData, category.id);
      } catch (error) {
        console.error("Error:", error);
      }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Create a Category
      </h2>
      <form action={handleSubmit} className="space-y-4 max-w-lg w-full">
      <Input
          name="name"
          value={name} // Use the state value for name
          onChange={(e) => setName(e.target.value)} // Update state when the input value changes
          className="border-gray-300 placeholder:text-gray-400"
          required
        />
        <div className="relative mb-4">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <Input
                    type="file"
                    onChange={(e) => setImage(e.target.files?.[0] || null)} // Update image state when a file is selected
                    className="border-gray-300 placeholder:text-gray-400 mt-2"
                  />
                </div>
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 shadow-md"
          type="submit"
        >
          Update Category
        </Button>
      </form>
    </div>
  );
}
