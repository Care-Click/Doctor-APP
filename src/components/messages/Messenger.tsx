import React, { useEffect, useRef, useState } from "react";
import "./Messenger.css";
import Conversation from "./Conversation";
import Message from "./Message.tsx";
import axios from "axios";
import { io } from "socket.io-client";

interface message {
  id: number;
  sender: string;
}

function messenger() {
  const [conversations, setConversations] = useState([]);
  const [profileDoc, setprofileDoc] = useState("");
  const [profilePat, setprofilePat] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentChat, setcurrentChat] = useState({ id: 0 });
  const [newMessage, setNewMessage] = useState("");
  // const socket = io("ws://localhost:8081");
  const scrollRef = useRef();
  useEffect(() => {
    getDoctorConversations();
  
      // socket.on("newMessage", (data) => {
      //   const prev=[...messages]  
      //   prev.push(data)
      //   setMessages(prev);
      // });
      getmessages()

  }, [currentChat]);


  // useEffect(() => {
  //   socket.on("newMessage", (data) => {
  //     console.log(data);

  //     setMessages(...messages,data)
  //   });
  // }, []);
  const getmessages = async () => {
    try {
      if (currentChat.id!==0) {
    
      const { data } = await axios.get(
        `http://localhost:3000/api/conversations/${currentChat?.id}/messages`
      );

      setprofileDoc(data[0].conversation.doctor.profile_picture)
      setprofilePat(data[0].conversation.patient.profile_picture)
      
      setMessages(data);
      socket.emit("joinConversation", currentChat.id  );
    }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
    
 
    
  // }, [currentChat]);

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
      getmessages();
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const fetchmessages = async (convId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/conversations/${convId}/messages`
      );
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }
    try {
      const messageSocket = {
        conversationId: currentChat.id,
        sender: "Doctor",
        createdAt: new Date(Date.now()),
        content: newMessage,
      };
      socket.emit("sendMessage", messageSocket);
      setMessages([...messages,messageSocket])
      await axios.post("http://localhost:3000/api/messages", messageSocket);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messager">
      <div className="chatMenu">
        <div className="chatMenuRapper bg-gray-100 h-full">
          <input
            className="chatMenuInput "
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
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {messages.length !== 0 ? (
            <div className="chatBoxTop">
              {messages.map((message: message) => {
                return (
                  <div  key={message.id}>
                    <Message 
                    profileDoc={profileDoc}
                    profilePat={profilePat}
                      message={message}
                      own={message.sender === "Doctor"}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="nochat">Open a conversation to start a chat</span>
          )}
          <div className="chatBoxBottom">
            <textarea
              className="chatIntput"
              placeholder="write somthing"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button className="buttonSend" onClick={handleSubmit}>
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default messenger;
