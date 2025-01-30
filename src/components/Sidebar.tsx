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
export default function Sidebar() {
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
    <div className="md:hidden">
    <Sheet>
      <SheetTrigger><MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40}/></SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className='text-white'>Menu</SheetTitle>
          <Link href={"/dashboard/categories"}><Button className="text-white">Categories</Button></Link>
          <Link href={"/dashboard/allproducts"}><Button className="text-white">Categories</Button></Link>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    </div>
    
    <div className="hidden md:flex md:flex-col md:items-center md:space-y-5">
    <h2 className='font-semibold'>Menu</h2>
    <Link href={'/dashboard/categories'}><Button className='bg-transparent text-gray-800 hover:scale-105 transition-all'>Categories</Button></Link>
    <Link href={'/dashboard/allproducts'}><Button className='bg-transparent text-gray-800 hover:scale-105 transition-all'>All Products</Button></Link>
    </div>
  </div>
  )
}
