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

import React from "react";
import EditProfile from './EditProfile'
import ShowProfile from './ShowProfile'


const Profile = ({user}) => {
function handleChange(){

}

function handleCllick(){

}

  return (
    <div className="main-profile">
      <div>
        {/* <ShowProfile user={user} />
        <EditProfile />
        <div>Profile Picture</div>
        <div>Display Name</div>
        <div>Bio</div>
        <div>Track</div>
        <div>Edit Profile</div>
        <div>Posts</div> */}
        <input type='file' onChange={handleChange} />
        <button onClick={handleCllick}>Upload</button>
        <img  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="logo" style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginRight: "7px",
              }} />
      </div>
    </div>
  );
};

export default Profile;
