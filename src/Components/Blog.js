import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
// import Blog from "../Components/Blog";
import { useSearchParams } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../Utility";
import LikeButton from "./LikeButton";
import Loading from "./Loading";
import { motion } from "framer-motion";
// import { Helmet } from "react-helmet-async";




const Home = ({ user,userId }) => {
  const [blogs, setBlogs] = useState([]);
  // const [visible, setVisible] = useState(5);
  const [loading, setLoading] = useState(false); //for Loading state while awaiting api call


  // const [search,setSearch] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();

  const unikId = user?.uid;

  // const showMorePost = () => {
  //   setVisible((prevValue) => prevValue + 3);
  // };

  const customSort = (a, b) => {
    const dateA = new Date(a.timestamp.toDate());
    const dateB = new Date(b.timestamp.toDate());
    if (dateA < dateB) return 1;
    else if (dateA > dateB) return -1;
    return 0;
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setBlogs(list);
        setLoading(true);
      },
      (error) => {
        console.log(error);
      }
    );



    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
              {/* <Helmet>
        <title>Home - Techie Meet</title>
        <meta
          name="description"
          content="This is the Home page of Techie Meet app, A micro social blog for tech enthusiastics"
        />
        <link rel="canonical" href="/" />
      </Helmet> */}
      <motion.div className="container-fluid pb-4 pt-4 padding main-home" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div className="col-md-8">
            {
              loading ?           <input
              
              type="text"
              className="search-bar"
              placeholder=" Search..."
              value={searchParams.get("x") || ""}
              onChange={(event) => {
                const x = event.target.value;
                if (x) {
                  setSearchParams({ x, y: "true" });
                } else {
                  setSearchParams({});
                }
              }}
            /> : ''
            }
          {/* <Blog blogs={blogs} user={user} handleDelete={handleDelete}  setSearch={setSearch} /> */}
          <div className="main-blog">
            <div>
              <div>
                { loading ?  blogs
                  .filter((blog) => {
                    const x = searchParams.get("x");
                    if (!x) return true;
                    else {
                      const body =
                        blog.description.toLowerCase() +
                        blog.author.toLowerCase() +
                        blog.category.toLowerCase();
                      return body.includes(x.toLowerCase());
                    }
                  })
                  ?.sort(customSort)
                  // .slice(0, visible)
                  .map(
                    ({
                      id,
                      author,
                      category,
                      title,
                      description,
                      imgUrl,
                      userId,
                      timestamp,
                      likes,
                      comments,
                    } ) => (
                      <>
                      {userId === unikId &&
                      <section className="blog-item" key={id} >
                        <div>
                          
                            <div style={{ float: "right" }}>
                              <FontAwesome
                                name="trash"
                                style={{ margin: "15px", cursor: "pointer" }}
                                size="1x"
                                onClick={() => handleDelete(id)}
                              />
                              <Link to={`/edit/${id}`}>
                                <FontAwesome
                                  name="edit"
                                  style={{ cursor: "pointer", color: "white" }}
                                  size="1x"
                                />
                              </Link>
                            </div>
                          
                        </div>

                        <Link to={`/post/${id}`} className="blog-snippet">
                          <div className="blog-infos">
                            <span className="name-time">
                              <p className="author">{author}</p> -&nbsp;
                              <span>{timestamp.toDate().toDateString()}</span>
                            </span>
                            <p className="">{excerpt(description, 190)}</p>
                            <div className="blog-img">
                              {imgUrl ? <img src={imgUrl} alt={title} /> : ""}
                            </div>
                          </div>
                        </Link>
                        <span className="category catg-color">{category}</span>
                        <div className="d-flex flex-row-reverse like">
                          {
                            user ?
                          
<>
<LikeButton id={id} likes={likes} user={user} />
                          
                          <div className="pe-2">
                            <p>{likes?.length} </p>
                          </div> 
                          {comments && comments.length > 0 && (
                            <div className="pe-2">
                              <p>{comments?.length} Comments</p>
                            </div>
                          )} 
</>
: <div className="loginToSee"><em>Login to see Likes & Comments</em></div> }
                        </div>
                      </section>  }
                      </>
                      
                    )
                    
                  ) : <Loading />}
{/* {
  loading ? <div className="seemore">
  <button onClick={showMorePost} className="btn">
                    See more
                  </button>
  </div> : ''
} */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
