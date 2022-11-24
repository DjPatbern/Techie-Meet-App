import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db, storage } from "../firebase-config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

     
    await updateDoc(doc(db,"userChats", currentUser.uid), {
      [data.chatId+".lastMessage"]: {
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    });
   
    setText("");
    setImage(null);
  };

  console.log(data.User)

  return (
    <div className="chatInput">
      <input
        type="text"
        placeholder="Type Something.."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="sendChat">
        <GrAttachment />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file" className="chatLabel">
          <BsImageFill />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInput;
