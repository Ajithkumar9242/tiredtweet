import React, { useEffect, useState } from 'react'
import { BiHomeAlt2 } from 'react-icons/bi'
import { BsPersonCircle } from 'react-icons/bs'
import { FaSlackHash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { logout } from '../../redux/userSlice'
import axios from 'axios'

const LeftSide = () => {
  const { currentUser } = useSelector((state) => state.user);


  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  

  return (
    <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6 fixed ">
      <img
      // src='https://github.com/Ajithkumar9242/sociocone/blob/main/S-P.jpg'
          src="https://img.freepik.com/free-vector/butterfly-logo-colorful-gradient-illustrations_483537-972.jpg?w=740&t=st=1688913860~exp=1688914460~hmac=a152d307e4afd0750a9f14ae9278cefe262d5112bea16fc8f5377f43808e5e1b"
          alt="Twitter Logo"
          width={"100px"}
          className="ml-8"
        />
        {/* <img src="./twitter.png"  /> */}
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <BiHomeAlt2 fontSize="large" />
            <p>Home</p>
          </div>
        </Link>
        <Link to="/explore">
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <FaSlackHash fontSize="large" />
            <p>Explore</p>
          </div>
        </Link>
        <Link to={`/profile/${currentUser._id}`}>
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <BsPersonCircle fontSize="large" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-between">
        {/* <div>
          <p className="font-bold">{userProfile.username}</p>
          <p className="font-bold">@{userProfile.username}</p>
        </div> */}
        <div>
          <Link to={`/signout`}>
            <button
              className="bg-red-500 px-4 py-2 text-white rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSide