import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div>
        <nav className='flex justify-around bg-gray-200 p-4 mb-6 rounded'>
            <Link to="/">
                <button className="text-black bg-white py-2 px-4 rounded">Products</button>
            </Link>
            <Link to="booking" >
                <button className='bg-blue-500 text-white py-2 rounded px-4'>Booking</button>
            </Link>
        </nav>
    </div>
  )
}

export default Navbar
