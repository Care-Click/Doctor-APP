import React from 'react'
import "./conversation.css"
function Conversation({conversation}) {
  
  return (
    <div className='Conversation' >
        
        <img className='conversationImg' src={conversation.patient?.profile_picture} alt="" />
        <span className='conversationName'>{conversation.patient?.FullName}</span>
        
    </div>
  )
}

export default Conversation