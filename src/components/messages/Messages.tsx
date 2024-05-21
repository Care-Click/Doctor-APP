import axios from "axios";
import "./message.css";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import io from "socket.io-client";

interface Message {
  id: number;
  sender: string;
}

function Messages({ currentChat }) {
  const messagesEndRef = useRef(null);
  const [profileDoc, setProfileDoc] = useState("");
  const [socket, setSocket] = useState(null);
  const [profilePat, setProfilePat] = useState("");
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      if (currentChat.id !== 0) {
        const { data } = await axios.get(
          `http://localhost:3000/api/conversations/${currentChat?.id}/messages`
        );
console.log(data);

        setProfileDoc(data[0].conversation.doctor.profile_picture);
        setProfilePat(data[0].conversation.patient.profile_picture);
        console.log(data);
        
        setMessages(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  return (
    <div className="chatBox pt-32">
      <div className="chatBoxWrapper">
        { (
          <div className="chatBoxTop">
            {messages.map((message: Message) => (
              <div key={message.id}>
                <Message
                  profileDoc={profileDoc}
                  profilePat={profilePat}
                  message={message}
                  own={message.sender === "Doctor"}
                />
              </div>
            ))}
            <div ref={messagesEndRef} />
            <div className="chatBoxBottom">
            <input
               className="w-full h-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
               type="text"
               placeholder="Write your message..."
               onChange={(e) => setNewMessage(e.target.value)}
               value={newMessage}/>
              <button className="buttonSend" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        ) }
      </div>
    </div>
  );
}

export default Messages;
