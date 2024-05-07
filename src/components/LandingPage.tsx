import React from 'react'
import { useNavigate  } from 'react-router-dom'

function LandingPage() {
  
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center">
   
    <div className="flex-1 flex items-center bg-white text-gray-800 px-4 mt-50">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          Your Premier Destination for Compassionate Care
        </h1>
        <p className="mb-6 ">
          With cutting-edge technology and a dedicated team, we're here to ensure you receive the best care, whenever you need it. Join us, and let's journey towards health and wellness together
        </p>
        <button className="bg-[#F26268] text-white px-2 tablet:px-3 py-1 rounded" onClick={()=>navigate ('/learnmore')}>
          Learn More
        </button>
      </div>
    </div>
    
    <div className="flex-1 mt-20">
      <img src="src\assets\images\Homepage.png" alt="Healthcare Professional and Patient" className="" style = {{width : "950px"}} />
    </div>
  </div>
  )
}

export default LandingPage