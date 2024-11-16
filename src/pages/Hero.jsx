import React from 'react'
import heroimg from "../assets/image/bg2.png"

const Hero = () => {
  return (
    <div className="flex  ">
<div>
<img className='object-contain' src={heroimg} alt="" srcset=""/>
</div>
<div>
hero goes here
</div>


   </div>
  )
}

export default Hero