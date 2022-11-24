import React, { useContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { HiTrendingUp } from "react-icons/hi";
import { CgCodeSlash } from "react-icons/cg";
import { RiAddCircleLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";
import { Divide as Hamburger } from "hamburger-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import PostContents from "./Pages/PostContents";
// import Chat from "./Pages/Chat";
import Auth from "./Pages/Auth";
import NotFound from "./Pages/NotFound";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import Trending from "./Components/Trending";
import { db } from "./firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
// import EditProfile from "./Pages/EditProfile";
// import MainProfile from "./Pages/MainProfile";
import Profile from "./Pages/Profile";
import { AuthContext } from "./Context/AuthContext";
import ForgetPassword from "./Pages/ForgetPassword";
import Room from "./Pages/Room";
import Chat from "./GeneralChat/Chat";
import Blog from "./Components/Blog";

function App() {
  const [showIconText, setShowIconText] = useState(false); // For Laptop Screen Menu Maximization
  const [isOpen, setOpen] = useState(false); // For Phone Size Hamburger
  const [user, setUser] = useState(null);
  const [trendBlogs, setTrendBlogs] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  const navigate = useNavigate();
  const userId = user?.uid;

  useEffect(() => {
    getTrendingBlogs();
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout =  () => {
       signOut(auth).then(() => {
          setUser(null);
          navigate("/login")
        })
    }
   


  // const logOut =() =>{
  // window.confirm("Are you sure want to logout?")
  // }

  return (
    <div className="container">
      <header className="header">
        <div className="header-flex">
          <Link to="/" className="logo">
            <CgCodeSlash />
            Techie Meet{" "}
          </Link>

          <div className="profile-logo profile">
            {user ? (
              <>
                <Link to="/profile" className="profile-Link">
                  {user.photoURL ? (
                    <img
                      src={user?.photoURL}
                      alt="logo"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        marginRight: "7px",
                      }}
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="logo"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        marginRight: "7px",
                      }}
                    />
                  )}
                  <span>{user?.displayName}</span>
                </Link>
              </>
            ) : (
              ""
            )}

          </div>
        </div>

        {/* <div className="dropdown">
          <Hamburger
            toggle={() => setOpen((prevOpen) => !prevOpen)}
            rounded
            toggled={isOpen}
          />
          <div className={isOpen ? "dropdown-content" : "setOpen"}>
            <a href="/">HOME</a>
            <a href="/repos">REPOS</a>
            <a href="/bomb">ERROR</a>
            <a href="/undefined">404</a>
          </div>
        </div> */}
      </header>

      <main className="main .bg-primary	">
        <div className="main-flex">
          <div className={showIconText ? "sidebar1" : "sidebar"}>
            <ul>
              <div
                className="hamburger"
                onClick={() => setShowIconText(!showIconText)}
              >
                <Hamburger />
              </div>
              <li>
                <a href="/" className="Link">
                  <AiOutlineHome className="icon" />
                  {showIconText ? "" : <h2>Home</h2>}
                </a>
                <Link to="/generalroom" className="Link">
                  <TiMessages className="icon" />
                  {showIconText ? "" : <h2>Chat</h2>}
                </Link>
                
                  <Link to="/create" className="Link">
                    <RiAddCircleLine className="icon" />
                    {showIconText ? "" : <h2>Post</h2>}
                  </Link>
                  <Link to="/trending" className="Link phone-link" id="iphone-trend">
              <HiTrendingUp className="icon" />
            </Link>
                

                {userId ? (
                  <div className="log">
                    <Link to="/" className="Link" onClick={() => handleLogout(auth)}>
                      <AiOutlineLogout className="icon" />
                      {showIconText ? "" : <h2>LogOut</h2>}
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="Link">
                      <FiLogIn className="icon" />
                      {showIconText ? "" : <h2>Login</h2>}
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={ <Home user={user} userId={userId} handleLogout={handleLogout} /> } />
            {/* <Route path="/blog" element={<Blog user={user} />} /> */}
            <Route path="post/:id" element={<PostContents user={user} />} />
            <Route
              path="edit/:id"
              element={
                user ? <CreatePost user={user} /> : <Auth setUser={setUser} />
              }
            />
            <Route
              path="/create"
              element={
                user ? <CreatePost user={user} /> : <Auth setUser={setUser} />
              }
            />
            <Route path="/login" element={<Auth setUser={setUser} />} />
            <Route path="/profile" element={user ?<Profile user={user} /> : <Auth setUser={setUser} />} />
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route path="/generalroom" element={user ? <Room /> : <Auth setUser={setUser} />} />
            <Route path="/trending" element={user ? <Trending blogs={trendBlogs} user={user} /> : <Auth setUser={setUser} />} />
            <Route path="/fake" element={user ?<Chat user={user} /> : <Auth setUser={setUser} />} />
            <Route
              path="/forget-password"
              element={<ForgetPassword user={user} />}
            />

            {/* <Route path="/editprofile" element={<EditProfile user={user} />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <div className="side-search">
            <div>
              <Trending blogs={trendBlogs} user={user} />
            </div>
          </div>
         
        </div>
      </main>
    </div>
  );
}

export default App;
