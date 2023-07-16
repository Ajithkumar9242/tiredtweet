import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import app from '../../firebase';

import { useNavigate } from "react-router-dom";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { changeProfile, logout } from '../../redux/userSlice';

const EditProfile = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [usernames, setUsernames] = useState("")
  const [descc, setDescc] = useState("")

  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit =async () => {
        try {
            const updatesProfile = await axios.put(`https://tiredtweet.vercel.app/api/users/${currentUser._id}`, {
              // profilePicture: downloadURL,
              username: usernames,
              description: descc
            });

            console.log(updatesProfile);
      window.location.reload(false);

          } catch (error) {
            console.log(error);
          }

}
    
    const uploadImg = (file) => {
      const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
            default:
              break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const updateProfile = await axios.put(`https://tiredtweet.vercel.app/api/users/${currentUser._id}`, {
              profilePicture: downloadURL,
            });

            console.log(updateProfile);
          } catch (error) {
            console.log(error);
          }
          
          console.log("downloaded " + downloadURL);
          dispatch(changeProfile(downloadURL));
        });
      }
      );
    };
    


  


  const handleDelete = async () => {
    const deleteProfile = await axios.delete(`https://tiredtweet.vercel.app/api/users/${currentUser._id}`);
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <input type="text" 
          className="rounded-lg w-full p-2 border-amber-900"
          onChange={(e) => setUsernames(e.target.value)}
          placeholder='Enter New Name'
        //  value={data.username}
         />

         <input type="text" 
          className="rounded-lg w-full p-2 border-amber-900"
          onChange={(e) => setDescc(e.target.value)}
          placeholder='Enter New Description'

        //  value={data.username}
         />
        <p>Choose a new profile picture</p>
        {imgUploadProgress > 0 ? (
          "Uploading " + imgUploadProgress + "%"
        ) : (
          <input
            type="file"
            className="bg-transparent border border-slate-500 rounded p-2"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <button type="submit"
          className="bg-cyan-600 text-white py-2 rounded-full"
        onClick={handleSubmit}>Submit</button>

        <p>Delete Account</p>
        <button
          className="bg-red-500 text-white py-2 rounded-full"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile