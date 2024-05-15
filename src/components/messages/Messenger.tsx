import React, {useRef, useState } from "react";
import "./Messenger.css";
import axios from "axios";
import { io } from "socket.io-client";
import Conversations from "./Conversations.tsx";
import Messages from "./Messages.tsx";



function messenger() {
  
  const [currentChat, setcurrentChat] = useState({ id: 0 });


  

  // useEffect(() => {
    // socket.emit("joinConversation", currentChat.id,(messages) => {
    //   console.log(messages);
      
    // } );
       // socket.on("newMessage", (data) => {
      //   const prev=[...messages]  
      //   prev.push(data)
      //   setMessages(prev);
      // });
  //   socket.on("newMessage", (data) => {
  //     console.log(data);

  //     setMessages(...messages,data)
  //   });
  // }, []);
  

 

  

  


  return (
    <div className="messager">
      <Conversations setcurrentChat={setcurrentChat}/>
     <Messages currentChat={currentChat}/>
    </div>
  );
}

export default messenger;
