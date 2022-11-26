import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import FontAwesome from "react-fontawesome";
import { ChatContext } from "../Context/ChatContext";

const Chat = ({ message, handleDelete }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  let author = message.name;
  let messageId = message.id;
  let messageText = message.text;
  let messageImage = message.image;

  return (
    <div className="chatContainer-main" ref={ref}>
      <div className={`message ${message.uid === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
          {/* <img
          src={currentUser.photoURL}
          alt=""
        /> */}
          {/* <span>{message.date.toDate().toDateString()}</span> */}
        </div>
        <div className="messageContent">
          {/* <span>{message.timestamp.toDate().toDateString()}</span> */}
          <p>
            <span>
              {author}

              <br></br>
            </span>
            {messageText}
            <div className="col-1">
                    {currentUser.uid === message.uid &&  (
                      <FontAwesome
                      name="trash"
                        className="ml-9"
                        style={{ cursor: "pointer", marginTop: "20%"}}
                        onClick={() => handleDelete(messageId)}
                      />
                    )}
                  </div>
          </p>
          {messageImage && <img src={messageImage} alt="" />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
