import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'

function Verification() {
    const location = useLocation();

    const {doctorId} = location.state;
    
    const navigate = useNavigate()
    const [code ,setcode]=useState("0")
    const emailVerification = async () => {
        try {
          const {data} = await axios.post(
            `http://localhost:3000/api/doctors/verify/${doctorId}`,{code}
          ); 
      navigate("/medicalExp", { state: { doctorId } });
          
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };
      
  return (
    <div className="flex justify-center items-center">
   
    <div className="flex-1 flex items-center bg-white text-gray-800 px-4 mt-50">
      <div className="flex-1 flexcol max-w-md mx-auto justify-center items-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          Patients Premier Destination for Compassionate Care
        </h1>
        <h2 className="fo ">
        By verifying their email, doctors establish authenticity and trustworthiness, ensuring that patients  can rely on the communication channels for critical medical information.
         This verification process also enhances data security by confirming the doctor's identity and reducing the risk of unauthorized access to sensitive patient data. 
         , facilitating smoother communication with healthcare institutions in time of emergencies
        </h2>
        <input
              id="email"
            
              className="form-control block w-full px-3 py-2 mb-3 border border-gray-400 rounded-md "
              onChange={(e)=>{setcode(e.target.value)}}
              placeholder='1111'
              type="number"
            />
        <button
        className="bg-[#1DBED3] text-white py-2 px-4 tablet:px-3 rounded hover:bg-blue-600 flex items-center"
     onClick={emailVerification} >
        verify now
      </button>
      </div>
      
    </div>
    
    <div className="flex-1 mt-20">
      <img src="src\assets\images\email.png" alt="Healthcare Professional and Patient" className="" style = {{width : "650px"}} />
    </div>
  </div>
  )
}

export default Verification