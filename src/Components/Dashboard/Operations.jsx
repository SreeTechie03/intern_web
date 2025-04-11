import React from 'react'

const Operations = () => {
  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
                <span className="text-blue-500 text-2xl">Icon</span>
                <span className="ml-4 text-gray-700">Operation 1</span>
            </div>
            <span className="text-gray-500">Details</span>
            </div>
            {/* Repeat for other operations */}
        </div>
    </div>
  )
}

export default Operations
