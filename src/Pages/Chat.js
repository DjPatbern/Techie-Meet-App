import React from 'react'
import ChatSidebar from '../Components/ChatSidebar'
import ChatInner from '../Components/ChatInner'


const Chat = () => {
  return (
    <div className='chat-main'>
      <div className='chat-container'>
        <ChatSidebar />
        <ChatInner />
      </div>
    </div>
  )
}

export default Chat
