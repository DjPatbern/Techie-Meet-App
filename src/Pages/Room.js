import React, { useState, useEffect } from "react";
import Chat from "../GeneralChat/Chat";
import { query, collection, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import SendMessage from "../GeneralChat/SendMessage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
// import { Helmet } from "react-helmet-async";



const Room = () => {
  const [messages, setMesaages] = useState([]);
  



  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "generalroom"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setMesaages(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this chat ?")) {
      try {
        await deleteDoc(doc(db, "generalroom", id));
        toast.success("Chat deleted successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };





  return (
    
      <>
                {/* <Helmet>
        <title>Chat - Techie Meet</title>
        <meta
          name="description"
          content="This is the Chat page of Techie Meet app, A micro social blog for tech enthusiastics"
        />
        <link rel="canonical" href="/generalroom" />
      </Helmet> */}

    <motion.div className="generalroom-main" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>

      <div className="general-div">

        <main>
          {messages &&
            messages.sort((a,b)=>a.timestamp - b.timestamp).map((message) => (
              <Chat key={message.id} message={message} handleDelete={handleDelete}  />
            ))}
        </main>
       <SendMessage />
        
      </div>
    </motion.div>
      </>
  );
};

export default Room;
