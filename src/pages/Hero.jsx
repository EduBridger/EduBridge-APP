import React from 'react'
import heroimg from "../assets/image/bg2.png"

const Hero = () => {
  return (
    <div className="flex  ">
<div>
<img src={heroimg} alt="" srcset={`${heroimg} 1x, ${heroimg} 2x`}/>
</div>
<div>
hero goes here
</div>


   </div>
  )
}

export default Hero