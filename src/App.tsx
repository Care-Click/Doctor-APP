import { Routes, Route, useNavigate } from "react-router-dom";
import React from 'react'
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login.tsx";
import SignUp from "./components/auth/SignUp.tsx";
import MedicalExp from "./components/auth/MedicalExp.tsx";


const App = () => {
  return (
    <div className="App" >
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login login={Login} />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/join-us" element={<SignUp />} />
        <Route path="/medicalExp" element={<MedicalExp />} />
      
      </Routes>
    </div>
  )
}

export default App
