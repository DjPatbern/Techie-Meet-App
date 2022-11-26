import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import React, { useContext } from 'react'
import { db } from '../firebase-config'


const LikeButton = ({id, likes, user}) => {
    const likeRef = doc(db, "blogs", id )

    const handleLike = () =>{
        if(likes?.includes(user.uid)){
            updateDoc(likeRef,{
                likes:arrayRemove(user.uid),  
            }).then(() => {
                console.log('unlike')
            }).catch((e) => {
                console.log(e)
            })
        } else {
            updateDoc(likeRef,{
              likes:arrayUnion(user.uid)
        }).then(() => {
          console.log('liked')
      }).catch((e) => {
          console.log(e)
      })
        }
    }
    
  return (
    <div>
      <i className={`fa fa-heart${!likes?.includes(user.uid)? "-o" : ""} fa-lg`}
      style={{cursor:"pointer", color:likes?.includes(user.uid)?"red" : null,
    
    }}
    onClick={handleLike}
      />
    </div>
  )
}

export default LikeButton
