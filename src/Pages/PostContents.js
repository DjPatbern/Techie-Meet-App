import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
// import Tags from "../Components/Tags";
import { db } from "../firebase-config";
import LikeButton from "../Components/LikeButton";
import Comment from "../Components/Comment";
import Loading from "../Components/Loading";
import { motion } from "framer-motion";
import {FaBackspace} from "react-icons/fa"

// import { Helmet } from "react-helmet-async";






const PostContents = ({user}) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false); //for Loading state while awaiting api call


  useEffect(() => {
    const docRef = doc(db, "blogs", id);
    onSnapshot(docRef,(snapshot) =>{
      setBlog({...snapshot.data(),id:snapshot.id})
      setLoading(true);
    })
  },[id])


  return (
    <>
              {/* <Helmet>
        <title>Post - Techie Meet</title>
        <meta
          name="description"
          content="This is the Post page of Techie Meet app, A micro social blog for tech enthusiastics"
        />
        <link rel="canonical" href="/post" />
      </Helmet> */}
      <motion.div className="container-fluid pb-4 pt-4 padding main-home" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
   
        <div className="col-md-8">
        

        {
          loading ?            <section className="thread-back">
          <Link to="/" className="thread-Link">
          <FaBackspace />
          </Link>
        </section> : ""
        }
            { loading ?
              blog && (
                <>
                <span className="name-time"  data-aos="fade-left" data-aos-delay="200">
            <p className="author">{blog.author}</p> -&nbsp;
            {blog.timestamp.toDate().toDateString()}
          </span>
          <div className=""  data-aos="fade-right" data-aos-delay="200">
            <p className="text-start">{blog.description}</p>

          </div>
          <div className="blog-img" >
            {blog?.imgUrl ? <img src={blog.imgUrl} alt={blog.title} /> : ""}
          </div>
          <span className="category catg-color">{blog.category}</span>
          

        {
          user ? 
          <>
          <div className="d-flex flex-row-reverse like">
          <LikeButton id={id} likes={blog.likes} user={user} />
          <div className="pe-2">
          <p>{blog.likes.length}</p>
          </div>
        </div>
        <h4 style={{textAlign: "center"}}>Comments</h4>
        <Comment id={blog.id}  bloguser={user}  />
          </> :  <div className="loginToSee"><em>Login to see Likes & Comments</em></div> }
        

        
                </>
              )
            : <Loading />}
          
        </div>

      </motion.div>
    </>
  );
};

export default PostContents;
