import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
// import Tags from "../Components/Tags";
import { db } from "../firebase-config";
import LikeButton from "../Components/LikeButton";
import Comment from "../Components/Comment";


const PostContents = ({user}) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  // const [blogs, setBlogs] = useState([]);
  // const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   // const getBlogsData = async () => {
  //   //   const blogRef = collection(db, "blogs", id);
  //   //   const blogs = await getDocs(blogRef);
  //   //   setBlog(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //     // let tags = [];
  //     // blogs.docs.map((doc) => tags.push(...doc.get("tags")));
  //     // let uniqueTags = [...new Set(tags)];
  //     // setTags(uniqueTags);
  //   }

  //   // getBlogsData();
  // }, []);

  useEffect(() => {
    const docRef = doc(db, "blogs", id);
    onSnapshot(docRef,(snapshot) =>{
      setBlog({...snapshot.data(),id:snapshot.id})
    })
  },[id])

  // useEffect(() => {
  //   id && getBlogDetail();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  // const getBlogDetail = async () => {
  //   const docRef = doc(db, "blogs", id);
  //   const blogDetail = await getDoc(docRef);
  //   setBlog(blogDetail.data());
  // };

  return (
    <>
      <div className="container-fluid pb-4 pt-4 padding main-home">
        <div className="col-md-8">
          <section className="thread-back">
            <Link to="/" className="thread-Link">
              ←
            </Link>
          </section>
            {
              blog && (
                <>
                <span className="name-time">
            <p className="author">{blog.author}</p> -&nbsp;
            {blog.timestamp.toDate().toDateString()}
          </span>
          <div className="">
            <p className="text-start">{blog.description}</p>
            <p className="text-start">{blog.id}</p>

          </div>
          <div className="blog-img">
            {blog?.imgUrl ? <img src={blog.imgUrl} alt={blog.title} /> : ""}
          </div>
          <span className="category catg-color">{blog.category}</span>
          <div className="d-flex flex-row-reverse">
        {
          user && <LikeButton id={id} likes={blog.likes} user={user} />
        }
        <div className="pe-2">
          <p>{blog.likes.length}</p>

        </div>
        <Comment id={blog.id}  bloguser={user} />
        </div>
                </>
              )
            }
          
        </div>

      </div>
    </>
  );
};

export default PostContents;
