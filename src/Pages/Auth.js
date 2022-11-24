import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdAddPhotoAlternate } from "react-icons/md";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
// import { Helmet } from "react-helmet-async";



const newUserState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setUser }) => {
  const [state, setState] = useState(newUserState);
  const [signUp, setSignUp] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  // const [forget, setForget] = useState(forgotPasswordHandler());

  const emailRef = useRef();

  const { email, password, firstName, lastName, confirmPassword, userName } =
    state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email)
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
        navigate("/forget-password")
      });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      setLoading(true);
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password,
          userName
        )
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
        setUser(user);
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password don't match");
      }
      if (firstName && lastName && email && password && userName) {
        setLoading(true);
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));

        //unique
        const storageRef = ref(storage, file.name);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            setState((prev) => ({ ...prev, imgURL: downloadURL }));
            await updateProfile(user, {
              displayName: `${userName}`,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              firstName,
              lastName,
              email,
              userName,
              uid: user.uid,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", user.uid), {});
          });
        });
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
    navigate("/");
  };



  return (
    <>
          {/* <Helmet>
        <title>Login - Techie Meet</title>
        <meta
          name="description"
          content="This is the Login page of Techie Meet app, A micro social blog for tech enthusiastics"
        />
        <link rel="canonical" href="/login" />
      </Helmet> */}
    <motion.div  className="main-auth" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div  data-aos="fade-up" data-aos-delay="200">
        <div className="logo">Techie Meet</div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleAuth}>
          {signUp && (
            <>
              <div className="first-last">
                <div className="col-6 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  style={{ display: "none" }}
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                  htmlFor="file"
                  onChange={(e) => setFile(e.target.files[0])}
                >
                  <MdAddPhotoAlternate />
                  <span style={{cursor: "pointer"}}>Add Profile Picture</span>
                </label>
              </div>
            </>
          )}
          <div className="col-12 py-3">
            <input
              type="name"
              className="form-control input-text-box"
              placeholder="User Name"
              name="userName"
              value={userName}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 py-3">
            <input
              type="email"
              className="form-control input-text-box"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              ref={emailRef}
            />
          </div>

          <div className="col-12 py-3">
            <input
              type="password"
              className="form-control input-text-box"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {signUp && (
            <div className="col-12 py-3">
              <input
                type="password"
                className="form-control input-text-box"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="col-12 py-3 text-center">
            <button
              className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
              type="submit"
            >
              {!signUp ? "Sign-in" : "Sign-up"}
            </button>
          </div>
          <p className="forgetPassword" onClick={forgotPasswordHandler} style={{ cursor: "pointer" }}>
            Forgot Password?
          </p>
          
        </form>

        <div>
          {!signUp ? (
            <>
              <div className="text-center justify-content-center mt-2 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account ?&nbsp;
                  <span
                    className="link-danger"
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => setSignUp(true)}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center justify-content-center mt-2 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account ?&nbsp;
                  <span
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#298af2",
                    }}
                    onClick={() => setSignUp(false)}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Auth;
