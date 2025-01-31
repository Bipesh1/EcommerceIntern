"use client"
import { Button } from "@/components/ui/button";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to Admin Panel
      </h1>
      <p className="text-gray-600 mb-6">
        Please sign in to manage your categories and products.
      </p>
      <SignInButton >
       <Button className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 text-lg">Sign In</Button>
      </SignInButton>
    </div>
  );
}
