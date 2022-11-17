import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
// import Blog from "../Components/Blog";
import { useSearchParams } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../Utility";
import LikeButton from "../Components/LikeButton";

const Home = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  // const [search,setSearch] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();

  const unikId = user?.uid;

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
      },
      (error) => {
        console.log(error);
      }
    );

    //   setSearch((blogs) => {
    //     const x = searchParams.get("x");
    //     if(!x) return true;
    //     else {
    //         const body = setBlogs(blogs.toLowerCase());
    //         return body.includes(x.toLowerCase())
    //     }
    // })

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
      <div className="container-fluid pb-4 pt-4 padding main-home">
        <div className="col-md-8">
          <input
            type="text"
            className="search-bar"
            placeholder=" Search"
            value={searchParams.get("x") || ""}
            onChange={(event) => {
              const x = event.target.value;
              if (x) {
                setSearchParams({ x, y: "true" });
              } else {
                setSearchParams({});
              }
            }}
          />
          {/* <Blog blogs={blogs} user={user} handleDelete={handleDelete}  setSearch={setSearch} /> */}
          <div className="main-blog">
            <div>
              <div>
                {blogs.filter((blog) => {
                    const x = searchParams.get("x");
                    if (!x) return true;
                    else {
                      const body = blog.description.toLowerCase() + blog.author.toLowerCase() + blog.category.toLowerCase();
                      return body.includes(x.toLowerCase());
                    }
                  })
                  ?.sort(customSort)
                  .map(({id,author,category,title,description,imgUrl,userId,timestamp,likes,comments}) => (
                    <section className="blog-item" key={id}>
                      <div>
                        {unikId && userId === unikId && (
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
                        )}

                      </div>

                      <Link to={`/post/${id}`} className="blog-snippet">
                        <div className="blog-infos">
                          <span className="name-time">
                            <p className="author">{author}</p> -&nbsp;
                            <span>
                              {timestamp.toDate().toDateString()}
                            </span>
                          </span>
                          <p className="">{excerpt(description, 190)}</p>
                          <div className="blog-img">
                            {imgUrl ? (
                              <img src={imgUrl} alt={title} />
                            ) : (
                              ""
                            )}
                          </div>

                          
                        </div>
                      </Link>
                      <span className="category catg-color">
                            {category}
                          </span>
                      <div className="d-flex flex-row-reverse like">
                            {
                              user && <LikeButton id={id} likes={likes} user={user} />
                            }
                            <div className="pe-2">
                              <p>{likes?.length} </p>
                            </div>
                            {
                              comments && comments.length > 0 && (
                                <div className="pe-2">
                                  <p>{comments?.length} Comments</p>
                                </div>
                              )
                            }
                          </div>
                    </section>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
