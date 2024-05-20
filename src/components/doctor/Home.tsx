import React from 'react'
import Calendar from './Calander.tsx'


function Home() {
  return (
    <div style={{ backgroundImage: "url('/src/assets/images/rapport.png')" 
    }} 
    className=" flex justify-center h-screen bg-cover overflow-hidden p-40" >
        <Calendar />
    </div>
    )
}

export default Home