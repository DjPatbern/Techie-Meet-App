import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../Utility";
import LikeButton from "./LikeButton";

const Trending = ({ blogs, user }) => {
  const customSort = (a, b) => {
    const dateA = new Date(a.timestamp.toDate());
    const dateB = new Date(b.timestamp.toDate());
    if (dateA < dateB) return 1;
    else if (dateA > dateB) return -1;
    return 0;
  };

  return (
    <>
<div className="main-blog" id='trend-div'>
      <div>
        <div>
          {blogs.sort(customSort).slice(0, 5)?.map((blog) => (
            <div key={blog.id}>
            <section className="blog-item trend" >
              
              <Link to={`/post/${blog.id}`} className="blog-snippet trend">
                <div className="blog-infos">
                  
                  <span className="name-time">
                    <span className="author" id="author" >{blog.author}</span>
                    <div></div>
                  </span>
                  <div className="pic-des">

                  <div className="desc-trend">{excerpt(blog.description, 18)}</div>
                  </div>

                </div>
              
              </Link>

              
            </section>
                          <div className="like-category" >
                              <div className="pe-2 like-length">
                              <p>{blog.likes?.length}&nbsp; </p>
                              {
                              user && <LikeButton id={blog.id} likes={blog.likes} user={user} />
                            }                            </div>
                          <div className="category catg-color " id='category'>{blog.category}</div>
                          </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Trending;
