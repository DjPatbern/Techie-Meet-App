import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Chat = ({ message, user }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef()
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (

<div className="chatContainer-main" ref={ref}>
<div   className={`message ${message.uid === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        {/* <img
          src={currentUser.photoURL}
          alt=""
        /> */}
        {/* <span>{message.date.toDate().toDateString()}</span> */}
      </div>
      <div className="messageContent" >
        
        {/* <span>{message.timestamp.toDate().toDateString()}</span> */}
        <p><span>{message.name}<br></br></span>{message.text}</p>
        {message.image && <img src={message.image} alt="" />}
      </div>
    </div>
</div>
  );
};

export default Chat;
