import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const ChatNavBar = () => {
const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      {/* <span className='chatlogo'>Techie Meet</span> */}
      <div className='user'>
      <img src={currentUser.photoURL} alt='' />
      <span>{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default ChatNavBar
