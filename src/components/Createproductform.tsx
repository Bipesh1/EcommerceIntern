"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { createProduct } from "@/app/actions/product";
import { uploadImageToSupabase } from "@/app/actions/uploadimagetosupabase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateProductForm({categories}:{
    categories:{
        id: number
        name: string
        imageUrl: string
    }[]
}) {
   
     const [image, setImage] = useState<File | null>(null);
     const [selectedcategory,setSelectedCategory]=useState<string>("")
     const [isPending,startTransition]= useTransition()

      const handleSubmit = (formData: FormData) => {
        startTransition(async()=>{
          try {
            if (image) {
              const imageUrl = await uploadImageToSupabase(image);
              formData.set("image_url", imageUrl);
            }
      
            // Calling the server action for product
            await createProduct(formData);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
      };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Create a Product
        </h2>
        <form action={handleSubmit} className="space-y-4 max-w-lg w-full">
          <Input
            name="name"
            placeholder="Product Name"
            className="border-gray-300 placeholder:text-gray-400"
            required
          />
          <Input
            name="description"
            placeholder="Description"
            className="border-gray-300 placeholder:text-gray-400"
            required
          />
          <Input
            type="file"
            onChange={(e)=>setImage(e.target.files?.[0]||null)}
            className="border-gray-300"
            required
          />
          <Input
            name="initial_stock"
            placeholder="Initial Stock"
            className=" border-gray-300 placeholder:text-gray-400"
            required
          />
          <Input
            name="available_stock"
            placeholder="Available Stock"
            className="border-gray-300 placeholder:text-gray-400"
            required
          />
          {/* Category Dropdown */}
      <Select onValueChange={(value) => setSelectedCategory(value)} name="category_id" >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id}  value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2  shadow-md" type="submit">
            {isPending?"Creating...":"Create Product"}
          </Button>
        </form>
    </div>
  );
}
