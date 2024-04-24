import { Routes, Route, useNavigate } from "react-router-dom";
import React from 'react'
import Navbar from "./components/Navbar";
import LoggedNavbar from "./components/loggedNavbar.tsx";
import Login from "./components/auth/Login.tsx";
import SignUp from "./components/auth/SignUp.tsx";
import Home from "./components/Home.tsx"
import Requests from "./components/patient/Requests.jsx";

const App = () => {
  let token=localStorage.getItem('token')
  return (
    <div className="App" >
      {!token?<Navbar/>:<LoggedNavbar/>}
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/join-us" element={<SignUp />} />
        <Route path="/patients" element={<SignUp />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/home" element={<Home />} />
      
      </Routes>
    </div>
  )
}

export default App
