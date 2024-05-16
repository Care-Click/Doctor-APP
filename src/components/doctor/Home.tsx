import React from 'react'
import Calendar from './Calander.tsx'
import Patients from '../patient/Patients.tsx'

function Home() {
  return (
    <div style={{ backgroundImage: "url('/src/assets/images/bg.jpg')" 
    }} 
    className=" flex justify-center bg-cover bg-no-repeat " >
    
    <div style={{ flex: '2' , borderRight: '4px solid gray'}}>
        <Calendar />
      </div>
      <div style={{ flex: '1' , backgroundColor: '#ECECEC'}}>
        <Patients />
      </div>
    </div>
    )
}

export default Home