import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-[20%] h-screen p-4 bg-gray-200 fixed">
      <h2 className="font-bold text-xl mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4">
          <button
            className='w-full p-2  bg-green-500 text-white '
            onClick={() => handleViewChange('overview')}
          >
            Dashboard Overview
          </button>
        </li>
        <li className="mb-4">
          <Link to="/myads">
          <button
             className='w-full p-2  bg-green-500 text-white '
            onClick={() => handleViewChange('myAds')}
          >
            My Ads
          </button>
          </Link>
         
        </li>
        <li className="mb-4">
          <button
             className='w-full p-2  bg-green-500 text-white '
            onClick={() => handleViewChange('home')}
          >
            Home
          </button>
        </li>
        <li className="mb-4">
          <Link to="/post-ad">
          <button
             className='w-full p-2  bg-green-500 text-white '
            onClick={() => handleViewChange('postAd')}
          >
            Post an Ad
          </button>
          </Link>
          
        </li>
        <li className="mb-4">
          
          <button className="w-full p-2 bg-red-500 text-white">Logout</button>
        </li>
      </ul>
    </div>

  )
}

export default Sidebar

    
{/*     
    <div className="w-1/4 bg-[#22C55E] text-white h-screen">
    <h1 className="text-2xl p-5 font-bold">Dashboard</h1>
    <div className="flex text-2xl flex-col">
      <Link to='/' className="p-4 hover:bg-green-900">Home</Link>
      <Link to="/myads" className="p-4 hover:bg-green-900">My Ads</Link>
      <Link to="/post-ad" className="p-4 hover:bg-green-900">Post an Ad</Link>

    </div>
  </div>


    
    <div className="w-1/4 bg-[#22C55E] p-5  text-white ">
    <h2 className="text-lg font-bold mb-5">Sidebar</h2>
    <div className='flex flex-col'>
   
      <Link href="#" className=" mb-3">DashBoard</Link>
      <Link href="/myads" className=" mb-3">My Ads</Link>
      <Link href="/" className=" mb-3">Home</Link>
      {/* <Link href="#" className=" mb-3">Link 4</Link>  */}
   
   
    
 
