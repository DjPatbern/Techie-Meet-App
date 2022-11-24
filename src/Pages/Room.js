import React, { useState, useEffect } from "react";
import Chat from "../GeneralChat/Chat";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import SendMessage from "../GeneralChat/SendMessage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  //   const customSort = (a, b) => {
  //   const dateA = new Date(a.timestamp.toDate());
  //   const dateB = new Date(b.timestamp.toDate());
  //   if (dateA < dateB) return 1;
  //   else if (dateA > dateB) return -1;
  //   return 0;
  // };



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
              <Chat key={message.id} message={message}  />
            ))}
        </main>
       <SendMessage />
        
      </div>
    </motion.div>
      </>
  );
};

export default Room;
