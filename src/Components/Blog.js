import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../Utility";

const Blog = ({ blogs, user, handleDelete, setSearch }) => {
  const userId = user?.uid;

 const customSort = (a,b) =>{
      const dateA = new Date(a.timestamp.toDate())
      const dateB = new Date(b.timestamp.toDate())
      if(dateA < dateB ) return 1
      else if (dateA > dateB) return -1
      return 0
  }



  return (
    <div className="main-blog">
      <div>
        <div>
          {blogs?.sort(customSort).filter(setSearch).map((blog) => (
            <section className="blog-item" key={blog.id}>
               <div>
              {userId && blog.userId === userId && (
                <div style={{ float: "right" }}>
                  <FontAwesome
                    name="trash"
                    style={{ margin: "15px", cursor: "pointer" }}
                    size="1x"
                    onClick={() => handleDelete(blog.id)}
                  />
                  <Link to={`/edit/${blog.id}`}>
                    <FontAwesome
                      name="edit"
                      style={{ cursor: "pointer" , color: 'white' }}
                      size="1x"
                    />
                  </Link>
                </div>
              )}
              </div>
              <Link to={`/post/${blog.id}`} className="blog-snippet">
                <div className="blog-infos">
                  
                  <span className="name-time">
                    <p className="author">{blog.author}</p> -&nbsp;
                    <span>{blog.timestamp.toDate().toDateString()}</span>
                  </span>
                  <p className="">{excerpt(blog.description, 190)}</p>
                  <div className="blog-img">
                    {blog.imgUrl ? (
                      <img src={blog.imgUrl} alt={blog.title} />
                    ) : (
                      ""
                    )}
                  </div>
                  <span className="category catg-color">{blog.category}</span>
                </div>
              
              </Link>
              
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
