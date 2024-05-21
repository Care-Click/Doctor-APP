import React, { useState } from "react";
import "./Messenger.css";
import Conversations from "./Conversations.tsx";
import Messages from "./Messages.tsx";



function messenger() {
  
  const [currentChat, setcurrentChat] = useState({ id: 0 });

  return (
    <div className="messager">
      <Conversations setcurrentChat={setcurrentChat}/>
     <Messages currentChat={currentChat}/>
    </div>
  );
}

export default messenger;
