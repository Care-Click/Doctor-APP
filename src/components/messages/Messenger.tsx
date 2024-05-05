import React from "react";
import "./Messenger.css";
import Conversation from "./Conversation";
import Message from "./Message.tsx";

function messenger() {
  return (
    <div className="messager">
      <div className="chatMenu">
        <div className="chatMenuRapper">
          <input
            className="chatMenuInput"
            type="text"
            placeholder="search for a patient"
          />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message own={false} />
            <Message own={true} />
            <Message own={false} />
            <Message own={true} />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatIntput"
              placeholder="write somthing"
              id=""
            ></textarea>
            <button className="buttonSend">send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default messenger;
