import React, { useState } from 'react'
import TimelineTweet from '../TimeLineTweet/TimelineTweet'
import { useSelector } from 'react-redux'
import axios from 'axios'

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
   const [image, setImage] = useState("")

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData()
      await data.append("file",image)
      await data.append("upload_preset","sociocone")
      await data.append("cloud_name","dqlckrtgm")
      await fetch(`https://api.cloudinary.com/v1_1/dqlckrtgm/image/upload`,{
          method:"post", body:data
        })
        .then(res=>res.json())
        
        .then(async data=>{
          console.log(data)
           
            let postdata = {
               
                pic:data.url
            }
    try {
      const submitTweet = await axios.post("https://tiredtweet.vercel.app/api/tweets", {
        pic: postdata.pic,
         userId: currentUser._id,
         description: tweetText,
      });
      console.log(submitTweet)
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  });
}

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
          <input type="file" 
            className="bg-transparent border border-slate-500 rounded p-2"
           onChange={(e)=>setImage(e.target.files[0])}/>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet