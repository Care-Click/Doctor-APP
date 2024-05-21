import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
interface Doctor {
  id: number;
  FullName: string;
  date_of_birth: string;
  email: string;
  gender: string;
  phone_number: string;
  profile_picture: string;

}
const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

const LoggedNavbar = () => {
const navigate=useNavigate()
  const [doctor, setDoctor] = useState<Doctor>();
  const [hover, setHover] = useState(false)
  useEffect(()=>{
    const getDoctor = async () => {
      let token = localStorage.getItem('token');
      try {
          const response = await axios.get('http://localhost:3000/api/doctors/getDoctor', { headers: { "token": token } });
          setDoctor(response.data);
      } catch (error) {
          console.log(error);
      }
  };
  getDoctor()
  },[])
  return (
    <nav className="bg-white shadow-lg p-2 flex justify-between items-center ">
      <div onClick={()=>{navigate("/home")}} className="cursor-pointer flex items-center px-2">
        <img src="src\assets\images\logo.png" alt="Logo" className="h-12 w-auto" />
        <span className="font-bold text-[#F26268] text-lg tablet:text-xl laptop:text-2xl ml-2">
          CareClick
        </span>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <Link
          to="/home"
          className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300 mx-2"
        >
          Home
        </Link>
  
        <Link
          to="/Requests"
          className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300 mx-2"
        >
          Requests
        </Link>

        <Link
          to="/messages"
          className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300 mx-2"
        >
          Messages
        </Link>
       
      </div>

      <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="  w-16 z-1 ">
                <div
                    className={`
                    rounded-[50%] overflow-hidden 
                    border-3 border-[#F26268]
                    cursor-pointer
                    `}
                >
                    <img src={doctor?.profile_picture} alt="" />


                </div>
                <div
                    className={`
                        absolute transition-opacity 
                        -right-4 top-16  
                        w-[250px]
                        border-1 shadow
                        bg-[#f3f3f3] rounded
                        duration-200
                        text-[20px] font-[500] text-[#1DBED3]
                        ${hover ? '' : 'opacity-0 scale-0'}
                    `}>
                    <div
                        className='py-[15px] px-4 text-[#F26268] text-[22px] rounded-sm m-2 mx-3 cursor-pointer'
                    >
                        {doctor?.FullName}
                    </div>
                    <div onClick={()=>{navigate("/profile")}}
                        className='py-[8px] px-4 bg-[#fff] shadow-sm hover:bg-[#F26268] rounded-sm m-2 mx-5 ml-2 cursor-pointer duration-300 hover:text-white'
                    >
                         Profile
                    </div>
                    <div
                        onClick={handleLogout}
                        className='py-[8px] px-4 bg-[#fff] shadow-sm hover:bg-[#F26268] rounded-sm m-2 mx-5 ml-2 cursor-pointer duration-300 hover:text-white'
                    >
                        Logout
                    </div>

                </div>
            </div>
          
    </nav>
  );
};

export default LoggedNavbar;
