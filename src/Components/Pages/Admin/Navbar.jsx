import React from 'react'
const Navbar = ({ handleLogout }) => {
  return (
    <nav className='bg-black w-screen  h-20 flex items-center px-6 justify-between border-4 border-amber-900'>
      <h1 className='text-white text-4xl'>Dashboard</h1>
      <button className='w-20 h-12 bg-red-600 rounded-lg cursor-pointer' onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Navbar