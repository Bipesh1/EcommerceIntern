"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { deleteCategory } from '@/app/actions/deleteCategory' 

export default function Categorycard({
  category,
}: {
  category: {
    id: number
    name: string
    imageUrl: string
  }
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // Track if delete is in progress

  // Handle delete request
  const handleDelete = async (id: number) => {
    setIsDeleting(true) // Set deleting state to true while deleting
    try {
      const { success } = await deleteCategory(id)

      if (success) {
        alert('Category deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Error deleting category')
    } finally {
      setIsDeleting(false) // Reset the deleting state after the request
      setIsModalOpen(false) // Close the modal after deletion attempt
    }
  }

  return (
    <div
      key={category.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={400}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl text-gray-800 font-semibold text-center mb-4">
          {category.name}
        </h2>
        <div className="flex justify-center items-center space-x-4">
          {/* Edit Button */}
          <Link href={`/dashboard/categories/edit/${category.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Edit
            </Button>
          </Link>
          {/* View Button */}
          <Link href={`/dashboard/categories/${category.id}`}>
            <Button className="bg-gray-900 hover:bg-gray-700 text-white">
              View all products
            </Button>
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
            <h3 className="text-lg text-center mb-4">Are you sure you want to delete this category?</h3>
            <div className="flex justify-center space-x-4">
              <Button
                className="bg-gray-900 hover:bg-gray-700 text-white"
                onClick={() => {
                  handleDelete(category.id) // Handle delete when 'Yes' is clicked
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
