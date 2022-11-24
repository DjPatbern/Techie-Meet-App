import React from 'react'
import ChatNavBar from './ChatNavBar'
import Search from './Search'
import ChatOuter from './ChatOuter'


const ChatSidebar = () => {
  return (
    <div className='chatsidebar'>
      <ChatNavBar />
      <Search />
      <ChatOuter />
    </div>
  )
}

export default ChatSidebar
