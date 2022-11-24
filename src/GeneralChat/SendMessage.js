import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState, useContext } from 'react'
import { db, auth, storage } from '../firebase-config'
import { AuthContext } from "../Context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
// import Picker from "emoji-picker-react"


const SendMessage = () => {
  const [input, setInput] = useState("")
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  // const [showPicker, setShowPicker] = useState(false)
  const {currentUser} = useContext(AuthContext)

  // console.log(currentUser.photoURL)

  // const onEmojiClick = (event, emojiObject) => {
  //   setInput(prevInput => prevInput + emojiObject.emoji);
  //   setShowPicker(false);
  // };
  


  const sendMessage  = async (e) => {
    e.preventDefault()
    if(input === "" && !image ){
      alert("Please enter a valid message")
      return
    }

    if(image){
      const storageRef = ref(storage, currentUser.uid);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {

          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "generalroom"), {
              text: input,
              name: currentUser.displayName,
              photoURL:  currentUser.photoURL,
              uid: currentUser.uid,
              image: downloadURL,
              timestamp: serverTimestamp()
            });
            toast.info("Image uploaded successfully");
            setProgress(0);
          });
        }
      );
    }else {
      await addDoc(collection(db, "generalroom"), {
        text: input,
        name: currentUser.displayName,
        photoURL:  currentUser.photoURL,
        uid: currentUser.uid,
        timestamp: serverTimestamp()
      })
    }
    setInput("")
    }



  return (

<>
<div className="chatInput" id='chatInput'>

<input
className="CommentInput"
  type="text"
  placeholder="Type Something.."
  onChange={(e) => setInput(e.target.value)}
  value={input}
/>
<div className="sendChat">
  <input
    type="file"
    style={{ display: "none" }}
    id="file"
    onChange={(e) => setImage(e.target.files[0])}
  />
  {/* <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker(val => !val)} />
        {showPicker && <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={onEmojiClick} />} */}
  <label htmlFor="file" className="chatLabel">
    <MdOutlineAddPhotoAlternate />
  </label>
  <button onClick={sendMessage}>Send</button>
</div>
</div>

{progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}
</>


  )
}

export default SendMessage


{/* <div className="chatInput">

<input
className="CommentInput"
  type="text"
  placeholder="Type Something.."
  onChange={(e) => setCommented(e.target.value)}
  value={commented}
/>
<div className="sendChat">
  <input
    type="file"
    style={{ display: "none" }}
    id="file"
    onChange={(e) => setImage(e.target.files[0])}
  />
  <label htmlFor="file" className="chatLabel">
    <MdOutlineAddPhotoAlternate />
  </label>
  <button onClick={handleSend}>Send</button>
</div>
</div> */}


{/* <form onSubmit={sendMessage} className="chat-form ">
<input className='form-control ' value={input} onChange={(e) => setInput(e.target.value)}  type="text" placeholder='Message'  />
<button type='submit' className='btn'>Send</button>
</form> */}

