import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { db } from '../firebase-config'
import ChatMessage from './ChatMessage'

const ChatMessages = () => {

  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  },[data.chatId])


  return (
    <div className='messages'>

      {messages.map((m) => (
        <ChatMessage message={m} key={m.id} />
      ))}

      {/* <ChatMessage /> */}
    </div>
  )
}

export default ChatMessages
