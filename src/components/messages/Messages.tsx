import axios from "axios";
import "./message.css";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import io from "socket.io-client";
interface message {
  id: number;
  sender: string;
}

function Messages({currentChat}) {
  const scrollRef = useRef();
  const [profileDoc, setprofileDoc] = useState("");
  const [socket, setSocket] = useState(null);
  const [profilePat, setprofilePat] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("joinConversation", currentChat.id);
    });
    newSocket.on("newMessage", (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentChat]);








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
     
      setMessages([...messages, messageSocket]);
      socket.emit("sendMessage", messageSocket);
      // await axios.post("http://localhost:3000/api/messages", messageSocket);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const getmessages = async () => {
    try {
      if (currentChat.id!==0) {
    
      const { data } = await axios.get(
        `http://localhost:3000/api/conversations/${currentChat?.id}/messages`
      );

      setprofileDoc(data[0].conversation.doctor.profile_picture)
      setprofilePat(data[0].conversation.patient.profile_picture)
      setMessages(data);
    }
    } catch (error) { 
      console.log(error);
    }
  };
  
  useEffect(() => {
    getmessages()
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat]);
  //  useEffect(() => {
  //   // socket.emit("joinConversation", currentChat.id,(messages) => {
  //   //   console.log(messages);
      
  //   // } );
  //      socket.on("newMessage", (data) => {
  //       console.log(data);
        
  //       // const prev=[...messages]  
  //       // prev.push(data)
  //       // setMessages(prev);
  //     });
  // //   socket.on("newMessage", (data) => {
  // //     console.log(data);

  // //     setMessages(...messages,data)
  // //   });
  // }, []);
  
  return (
    <div className="chatBox">
    <div className="chatBoxWrapper">
      {messages.length !== 0 ? (
        <div className="chatBoxTop" >
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
      ) : (
        <span className="nochat">Open a conversation to start a chat</span>
      )}
    </div>
  </div>
  );
}

export default Messages;
