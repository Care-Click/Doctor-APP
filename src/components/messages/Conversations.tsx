import React, { useEffect, useState } from 'react'
import "./conversation.css"
import axios from 'axios';
import Conversation from './Conversation';

function Conversations({setcurrentChat}) {
  const [conversations, setConversations] = useState([]);
  const getDoctorConversations = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:3000/api/doctors/getDoctor",
        { headers: { token: token } }
      );
      const { data } = await axios.get(
        `http://localhost:3000/api/conversations/${response.data?.id}/Allconversations`
      );
      setConversations(data);
    
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
  useEffect(() => {
    getDoctorConversations();
  
   

  }, []);

  return (
    <div style={{ backgroundImage: "url('/src/assets/images/rapport.png')" 
  }}className="chatMenu pt-24 bg-no-repeat bg-cover h-screen">
        <div className="chatMenuRapper ">
          <input
            className="chatMenuInput  rounded-lg"
            type="text"
            placeholder="search for a patient"
          />
          {conversations.map((conversation, key) => {
            return (
              <div
                key={key}
                onClick={() => {
                  setcurrentChat(conversation);
                }}
              >
                <Conversation conversation={conversation} />
              </div>
            );
          })}
        </div>
      </div>
  )
}

export default Conversations