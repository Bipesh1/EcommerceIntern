"use client";
import { useState } from "react";
import { createCategory } from "@/app/actions/category";
import { uploadImageToSupabase } from "@/app/actions/uploadimagetosupabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateCategoriesForm() {
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      if (image) {
        const imageUrl = await uploadImageToSupabase(image);
        formData.set("image_url", imageUrl);
      }

      // Calling the server action for category
      await createCategory(formData);
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
          placeholder="Category Name"
          className="border-gray-300 placeholder:text-gray-400"
          required
        />
        <Input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border-gray-300 placeholder:text-gray-400"
          required
        />
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 shadow-md"
          type="submit"
        >
          Create Category
        </Button>
      </form>
    </div>
  );
}
