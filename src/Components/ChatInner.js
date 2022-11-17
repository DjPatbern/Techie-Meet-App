import React, { useContext } from "react";
import { AiFillCamera } from "react-icons/ai";
import { MdPersonAdd } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { ChatContext } from "../Context/ChatContext";

const ChatInner = () => {
  const {data} = useContext(ChatContext)

  return (
    <div className="chatInner">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <AiFillCamera />
        <MdPersonAdd />
        <FiMoreVertical />
        </div>
        
      </div>
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatInner;
