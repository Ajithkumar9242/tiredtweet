import React, { useEffect, useState } from 'react'
import LeftSide from '../components/LeftSideBar/LeftSide'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Tweet from "../components/Tweet/Tweet"
import EditProfile from '../components/EditProfile/EditProfile'
import { following } from '../redux/userSlice'
import Right from '../components/Right/Right'

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`https://apifortweet.onrender.com/api/tweets/user/all/${id}`);
        const userProfile = await axios.get(`https://apifortweet.onrender.com/api/users/find/${id}`);

        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
        const follow = await axios.put(`https://apifortweet.onrender.com/api/users/follow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        const unfollow = await axios.put(`https://apifortweet.onrender.com/api/users/unfollow/${id}`, {
          id: currentUser._id,
        });

        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSide />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">


                   <div className="flex flex-col w-96 my-5 rounded shadow-lg bg-white ">
          <div className="mx-8  flex flex-row justify-between">
              <img className="rounded-full h-24 w-24  mt-3" src={userProfile?.profilePicture} alt="/"></img>
              <div className="my-auto">
              </div>
          </div>
          <h2 className="mt-4 px-8 font-bold ">{userProfile?.username}</h2>
          <h3 className="font-semibold text-sm px-8">@{userProfile?.email}</h3>
          <p className="text-md font-semibold tracking-normal px-8 py-2">{userProfile?.description}</p>
          <div className="flex flex-row mt-5 mx-8 my-4">
            <p className="font-normal text-slate-900 mr-5">•{ userProfile?.followers.length }Followers</p>
            <p className="font-normal text-slate-900 mr-5 ">• {userProfile?.following.length }Following</p>
          </div>

        </div>

            {currentUser._id === id ? (
       
              <button className=" b-4 rounded-full border px-4 py-2 text-sm font-medium bg-cyan-500 text-white"  onClick={() => setOpen(true)}>Edit Profile</button>
            ) : currentUser.following.includes(id) ? (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Following
              </button>
            ) : (
              <button
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="px-6">
          <Right />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};
export default Profile