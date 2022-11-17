import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { v4 as uuidv4 } from "uuid";

const Comment = ({ id, bloguser }) => {
  const [commented, setCommented] = useState("");
  const [comments, setComments] = useState([]);
  const commentRef = doc(db, "blogs", id);

  useEffect(() => {
    const docRef = doc(db, "blogs", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, [id]);

  function handleChangeComment(e) {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
            commentuser: bloguser.uid,
            userName: bloguser.displayName,
            addedcomment: commented,
            //   createdAt: new Date(),
            commentId: uuidv4(),
        }
        )
      }).then(() => {
        setCommented("");
      });
    }
  }

//   const result = Object.entries(comments)

  function handleDeleteComment(comment) {
    console.log(comment);
    
    updateDoc(commentRef, {
        comments:arrayRemove(comment),
    })
    .then((e) => {
        console.log(e);
    })
    .catch((error) => {
        console.log(error);
    })
  }

  console.log(comments);

  return (
    <div>
      <div className="container">
        {comments != null &&
          comments.map(({commentId, commentuser, addedcomment, userName}) => (
            
              <div key={commentId}>
                <div className="border p-2 mt-2 row">
                  <div className="col-11">
                    <span
                    className={`badge ${
                      commentuser === bloguser.uid ? "bg-success" : "bg-primary"
                    }`}
                    >
                      {userName} 
                    </span>
                    {addedcomment}
                  </div>
                  
                  <div className="col-1">
                    {commentuser === bloguser.uid && (
                      <i
                        className="fa fa-times"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteComment({commentId, commentuser, addedcomment, userName})}
                      />
                    )}
                  </div>
                </div>
              </div>
           
          ))}

          <div>
            
        {bloguser  && (
          <input
            className="form-control mt-4 mb-5"
            value={commented}
            onChange={(e) => {
                setCommented(e.target.value);
            }}
            placeholder="Add Comment.."
            onKeyUp={(e) => {
              handleChangeComment(e);
            }}
          />
        )}
          </div>

      </div>
    </div>
  );
};

export default Comment;
