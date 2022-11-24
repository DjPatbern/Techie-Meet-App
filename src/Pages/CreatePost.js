import React, { useEffect, useState } from 'react'
import { db, storage } from "../firebase-config";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import TagsInput from 'react-tagsinput'
import { motion } from "framer-motion";
// import { Helmet } from "react-helmet-async";
import 'react-tagsinput/react-tagsinput.css'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { 
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

const initialState = {
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Cloud",
  "Ui/Ux",
  "Product Management",
  "Data Science",
  "DeVop",
  "Cyber Security",
  "Technical Writing"
];




const CreatePost = ({user}) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  const { tags, category, trending, description } = form;

  
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {

          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image uploaded successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
            setProgress(0);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
            likes:[],
            comments:[]
          });
          toast.success("Post created successfully");
          setProgress(0);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Post updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    navigate("/");
  };


  return (
   <>
   
         {/* <Helmet>
        <title>Create Post - Techie Meet</title>
        <meta
          name="description"
          content="This is the Create page for the Techie Meet App"
        />
        <link rel="canonical" href="/create" />
      </Helmet> */}
    <motion.div className="main-create" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>

<div className="container-fluid mb-4"  data-aos="fade-down" data-aos-delay="200">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2 create">
            {id ? "Update Post" : "Create Post"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              {/* <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div> */}

              <div className="mb-3" style={{textAlign: "center"}}>
                <input
                
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {/* <label
                
                  htmlFor="file"
                  onChange={(e) => setFile(e.target.files[0])}
                >
                  <MdAddPhotoAlternate />
                  <span>Add Image</span>
                </label> */}
              </div>

              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Related To..</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
             

              <div className="col-12 py-3">
                <p className="trending">Is it a trending post ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
             

              <div className="col-12 py-3 tag-field">
                <TagsInput
                  value={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>

              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="Post..."
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>

              {progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}
              
              
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
   </>
  )
}

export default CreatePost
