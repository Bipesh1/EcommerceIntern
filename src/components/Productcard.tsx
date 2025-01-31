"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from '@/app/actions/deleteProduct'

export default function Productcard({
  product,
}: {
  product: {
    id: number
    imageUrl: string
    name: string
    description: string
    initialStock: number
    availableStock: number
  }
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // Track if delete is in progress

  // Handle delete request
  const handleDelete = async (id: number) => {
  
    setIsDeleting(true) // Set deleting state to true while deleting
    try {
      const{success}=await deleteProduct(id)
      
      if(success){
        alert('Product deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product')
    } finally {
      setIsDeleting(false) // Reset the deleting state after the request
      setIsModalOpen(false) // Close the modal after deletion attempt
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl text-gray-800 font-semibold text-center">{product.name}</h2>
        <p className="text-sm text-gray-600 text-center mb-3">{product.description}</p>
        <div className="text-gray-700 text-sm text-center mb-4">
          <p>Initial Stock: {product.initialStock}</p>
          <p>Available: {product.availableStock}</p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          {/* Edit Button */}
          <Link href={`/dashboard/allproducts/edit/${product.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
          </Link>
          {/* Delete Icon */}
          <Trash2
            className="text-red-600 cursor-pointer hover:text-red-800"
            onClick={() => setIsModalOpen(true)} // Open the modal when clicked
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg text-center mb-4">Are you sure you want to delete this product?</h3>
            <div className="flex justify-center space-x-4">
              <Button
                className="bg-gray-900 hover:bg-gray-700 text-white"
                onClick={() => {
                  handleDelete(product.id) // Handle delete when 'Yes' is clicked
                }}
                disabled={isDeleting} // Disable button if delete is in progress
              >
                {isDeleting ? 'Deleting...' : 'Yes'}
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setIsModalOpen(false)} // Close the modal without deleting
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
