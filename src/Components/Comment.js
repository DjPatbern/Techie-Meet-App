import { arrayRemove, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { db, storage} from "../firebase-config";
import { v4 as uuidv4 } from "uuid";
import { BsImageFill } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";


const Comment = ({ id, bloguser }) => {
  const [commented, setCommented] = useState("");
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);


  const commentRef = doc(db, "blogs", id);

  const reference = useRef()
  useEffect(() => {
    reference.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  useEffect(() => {
    const docRef = doc(db, "blogs", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, [id]);



  const handleSend = async () => {

    if(commented == "" && !image ){
      alert("Please enter a valid message")
      return
    }


    if (image) {
      const storageRef = ref(storage, uuidv4());

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
            await updateDoc(commentRef, {
              comments: arrayUnion({
                  commentuser: bloguser.uid,
                  userName: bloguser.displayName,
                  addedcomment: commented,
                  //   createdAt: new Date(),
                  image: downloadURL,
                  commentId: uuidv4(),
              }
              )
             
            });
            toast.info("Image uploaded successfully");
            setProgress(0);
          });
        }
      );
    } else {
      await updateDoc(commentRef, {
        comments: arrayUnion({
            commentuser: bloguser.uid,
            userName: bloguser.displayName,
            addedcomment: commented,
            //   createdAt: new Date(),
            commentId: uuidv4(),
        }
        )
      })
    }



    setCommented("");
    setImage(null);
  };

//   const result = Object.entries(comments)

  function handleDeleteComment(comment) {
   
      updateDoc(commentRef, {
          comments:arrayRemove(comment),
      })
      toast.success("Comment Deleted successfully");

    
    

  }




  return (
    <div className="comment-container">
      <div className="added" >
        {comments != null &&
          comments.map(({commentId, commentuser, addedcomment, userName, image}) => (
            
              <div key={commentId} ref={reference}>
                <div className=" p-2 mt-2 row  comment-div"  data-aos="fade-up" data-aos-delay="200" >
                  <div>
                  <div className="col-11">
                    <div
                    className={`badge $
                      // commentuser === bloguser.uid ? "bg-success" : "bg-primary"
                    `}
                    >
                      {userName}:
                    </div>
                    <div>

                    {addedcomment}
                    {image && <img className="comment-img" src={image} alt="" />}
                    </div>
                  </div>
                  
                  
                    {image &&  <div className="col-1">
                    {commentuser === bloguser.uid &&  (
                      <i
                        className="fa fa-times"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteComment({commentId, commentuser, addedcomment, userName,image })}
                      />
                    )}
                  </div>
                  }
                 
                 {!image &&  <div className="col-1">
                    {commentuser === bloguser.uid &&  (
                      <i
                        className="fa fa-times"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteComment({commentId, commentuser, addedcomment, userName })}
                      />
                    )}
                  </div>
                  }
                  </div>
                </div>
              </div>
           
          ))}

          <div>
            
        {bloguser  && (
          <div className="chatInput" >

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
        </div>
        )}
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
      </div>
    </div>
  );
};

export default Comment;
