"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react";
import { Button } from './ui/button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
export default function Sidebar() {
  const {isSignedIn}= useUser()
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
    <div className="md:hidden">
    <Sheet>
      <SheetTrigger><MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40}/></SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className='text-white'>Menu</SheetTitle>
           {/* Show only if user is signed in */}
          {isSignedIn && (
                <div className="flex flex-col space-y-3 mt-4">
                  <Link href={"/dashboard/categories"}>
                    <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
                      Categories
                    </Button>
                  </Link>
                  <Link href={"/dashboard/allproducts"}>
                    <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
                      All Products
                    </Button>
                  </Link>
                </div>
              )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
    </div>
    
    <div className="hidden md:flex md:flex-col md:items-center md:space-y-5">
    <h2 className='font-semibold'>Menu</h2>
    {/* Show only if user is signed in */}
    {isSignedIn && (
          <>
            <Link href={"/dashboard/categories"}>
              <Button className="bg-transparent text-gray-800 hover:scale-105 transition-all">
                Categories
              </Button>
            </Link>
            <Link href={"/dashboard/allproducts"}>
              <Button className="bg-transparent text-gray-800 hover:scale-105 transition-all">
                All Products
              </Button>
            </Link>
          </>
        )}
    </div>
  </div>
  )
}
