import React from 'react'
import LeftSide from '../components/LeftSideBar/LeftSide'
import Maintweet from '../components/mainTweet/Maintweet'
import { useSelector } from 'react-redux'
import Login from '../auth/Login'
import Right from '../components/Right/Right'

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Login />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6 ">
            <LeftSide />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <Maintweet />
          </div>
          <div className="px-6">
            <Right />
          </div>
        </div>
      )}
    </>
  );
};

export default Home