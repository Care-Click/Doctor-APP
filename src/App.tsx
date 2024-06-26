import { Routes, Route} from "react-router-dom";
import React,{useEffect,useState} from 'react'
import Navbar from "./components/Navbar";
import LoggedNavbar from "./components/loggedNavbar.tsx";
import Login from "./components/auth/Login.tsx";
import SignUp from "./components/auth/SignUp.tsx";
import Requests from "./components/patient/Requests.tsx";
import MedicalExp from "./components/auth/MedicalExp.tsx";
import Patients from "./components/patient/Patients.tsx";
import Report from "../src/components/doctor/Report.tsx"
import Calendar from "../src/components/doctor/Calander.tsx";
import LandingPage from "./components/LandingPage.tsx";
import Home from "./components/doctor/Home.tsx";
import Messages from "./components/messages/Messenger.tsx";
import Profile from "./components/doctor/Profile.tsx";
import Learnmore from "./components/Learnmore.tsx";
import Subscribe from "./components/Subscribe.tsx";
import Verification from "./components/Verification.tsx";


const App = () => {

  let [token,setToken]=useState(localStorage.getItem('token'))
  useEffect(()=>{},[token])
 
  return (
    <div className="App" >
      {!token?<Navbar/>:<LoggedNavbar/>}
      <Routes>
       <Route path="/" element={<LandingPage />} />
       <Route path="/learnmore" element={<Learnmore />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/join-us" element={<SignUp />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/medicalExp" element={<MedicalExp />} />
        <Route path="/report" element={< Report/>} />
        <Route path="/calender" element={< Calendar/>} />
        <Route path="/home" element={< Home/>} />
        <Route path="/messages" element={< Messages/>} />
        <Route path="/profile" element={< Profile/>} />
        <Route path="/payment" element = {<Subscribe/>} />
        <Route path="/verification" element = {<Verification/>} />

      </Routes>
     
    </div>
  )
}

export default App
