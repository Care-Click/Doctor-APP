import React from 'react'
import Calendar from './Calander.tsx'
import Patients from '../patient/Patients.tsx'

function Home() {
  return (
    <div className="flex flex-row justify-center" >
    <Patients/>
    <Calendar/>
    </div>
    )
}

export default Home