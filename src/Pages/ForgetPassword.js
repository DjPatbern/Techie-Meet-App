import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const ForgetPassword = ({user}) => {
    // const {currentUser} = useContext(AuthContext)

  return (
    <div>
      <p>{`A Password Reset Link Have Been Sent To Your Email Address (Check Spam Folder)`}</p>
      <Link to='/login' className='btn'>Back To Login</Link>
    </div>
  )
}

export default ForgetPassword
