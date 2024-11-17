import React from 'react'
import heroimg from "../assets/image/bg4.png"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="h-screen grid grid-cols-2 w-[screen]">
<div className='mt-20 w-[100%]'>
<img className='object-cover h-full' src={heroimg} alt="" srcset=""/>

{/* Welcome to EduBridge Online Learning Platform */}
</div>
{/* <div className='m-2 items-center flex flex-col justify-center space-y-4 w-[]'>
  <h1 className='font-bold italic text-3xl text-blue-900'>What is EduBridge ?</h1>
  
  <p className=' text-2xl m-2'>Our platform empowers students, educators, administrators, and families to personalize learning experiences for student success in primary and secondary schools in Africa.</p>
</div> */}

<div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-900 sm:text-5xl lg:text-3xl">
          EduBridge: Streamlining Education Through Technology
          </h1>
          <p className="mt-3 text-xl text-gray-600 sm:mt-5 sm:text-2xl">
           
          </p>
        </div>
        <div className="mt-10 flex justify-center space-x-6">
          <Link to="/admin-signup"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-yello-700  "
          >
            School Owners
          </Link>
          <Link to="/teacher-login"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Teachers
          </Link>
          <Link to="/student-login"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Learners
          </Link>
         
         
        </div>
      </div>
    </div>

   </div>
  )
}

export default Hero