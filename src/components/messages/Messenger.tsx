import React, { useEffect, useState } from "react";
import "./Messenger.css";
import Conversation from "./Conversation";
import Message from "./Message.tsx";
import axios from "axios";

 
interface message {
  sender: string;
 
}
function messenger() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setcurrentChat] = useState({id:0});
  const [message, setMessage] = useState("");

  useEffect(() => {
    getDoctorConversations();
    const getmessages=async()=>{
      try {
        const {data}= await axios.get(`http://localhost:3000/api/conversations/${currentChat?.id}/messages`)
setMessages(data)    
      } catch (error) {
        console.log(error);
        
      }
    }
    getmessages()
  }, [currentChat]);

  
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
      console.log(data);
      
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
  const fetchmesseges = async (convId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/conversations/${convId}/messages`
      );

      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

const handleSubmit= async (e)=>{
  e.preventDefault()
 try {const newMessage={
    content:message,
    conversationId:currentChat.id,
    sender:"Doctor",
  }
  const { data } = await axios.post(
    `http://localhost:3000/api/messages`,newMessage
  );
  setMessage("")
  fetchmesseges(currentChat.id)
 }
  catch(error){
    console.log(error);
    
  }
  


}
console.log(currentChat);

  return (
    <div className="messager">
      <div className="chatMenu">
        <div className="chatMenuRapper">
          <input
            className="chatMenuInput"
            type="text"
            placeholder="search for a patient"
          />
          {conversations.map((conversation) => {
            return (
              <div onClick={()=>{setcurrentChat(conversation)}}>
              <Conversation
                conversation={conversation}
               /></div>
            );
          })}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {messages.length!==0?
          <div className="chatBoxTop">
            {messages.map((message:message) => {
              return <Message message={message} own={message.sender === "Doctor"} />;
            })}
          </div>: <span className="nochat">Open a conversation to start a chat</span> }
          <div className="chatBoxBottom">
            <textarea
              className="chatIntput"
              placeholder="write somthing"
             onChange={(e)=>setMessage(e.target.value)}
             value={message}
            ></textarea>
            <button className="buttonSend" onClick={handleSubmit} >send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default messenger;
