// import React from "react";
// import FontAwesome from "react-fontawesome";
// import { Link } from "react-router-dom";

// const Profile = ({ blogs, user, handleDelete }) => {
//   const userId = user?.uid;

//   return (
//     <div className="main-blog">
//       <div>
//         <div>
//           {blogs?.map((blog) => (
//             <section className="blog-item" key={blog.id}>
//                <div>
//               {userId && blog.userId === userId && (
//                 <div style={{ float: "right" }}>
//                   <FontAwesome
//                     name="trash"
//                     style={{ margin: "15px", cursor: "pointer" }}
//                     size="1x"
//                     onClick={() => handleDelete(blog.id)}
//                   />
//                   <Link to={`/edit/${blog.id}`}>
//                     <FontAwesome
//                       name="edit"
//                       style={{ cursor: "pointer" , color: 'white' }}
//                       size="1x"
//                     />
//                   </Link>
//                 </div>
//               )}
//               </div>
//               <Link to={`/post/${blog.id}`} className="blog-snippet">
//                 <div className="blog-infos">

//                   <span className="name-time">
//                     <p className="author">{blog.firstName}</p> -&nbsp;
//                   </span>
//                   <p className="">{blog.lastName}</p>
//                   <div className="blog-img">
//                     {blog.imgUrl ? (
//                       <img src={blog.imgUrl} alt={blog.title} />
//                     ) : (
//                       ""
//                     )}
//                   </div>
//                   <span className="category catg-color">{blog.track}</span>
//                 </div>

//               </Link>

//             </section>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React,{ useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import {FaBackspace} from "react-icons/fa"

// import { Helmet } from "react-helmet-async";





const Profile = ({user}) => {
const {currentUser} = useContext(AuthContext)



  return (
<>
{/* <Helmet>
        <title>{`${currentUser.displayName} - Techie Meet`}</title>
        <meta
          name="description"
          content={`This is the Profile page for ${currentUser.displayName} of Techie Meet app, A micro social blog for tech enthusiastics`}
        />
        <link rel="canonical" href="/profile" />
      </Helmet> */}
<motion.div className="main-profile" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
<div>

<section className="thread-back">
          <Link to="/" className="thread-Link" style={{marginLeft: "10px"}}>
          <FaBackspace />
          </Link>
        </section>
<div className="pro-flex">
        {/* <ShowProfile user={user} />
        <EditProfile />
        <div>Profile Picture</div>
        <div>Display Name</div>
        <div>Bio</div>
        <div>Track</div>
        <div>Edit Profile</div>
        <div>Posts</div> */}
        {/* <input type='file' onChange={handleChange} />
        <button onClick={handleCllick}>Upload</button>
        <img  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="logo" style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginRight: "7px",
              }} /> */}
              <img src={currentUser.photoURL} alt='' data-aos="fade-down" data-aos-delay="100" />
              <h3 data-aos="fade-up" data-aos-delay="100">{currentUser.displayName}</h3>
      </div>
      {/* <p>{user.stack}</p> */}
      {/* <Blog /> */}
      {/* <p><em style={{textAlign: "centre"}}>Timeline Coming Soon....</em></p> */}
</div>
    </motion.div>
</>
  );
};

export default Profile;
