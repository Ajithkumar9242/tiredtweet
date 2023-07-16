import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet }  from "react-router-dom"
import "./App.css"
import Home from './Home/Home'
import Profile from './Profile/Profile'
import Register from './auth/Register'
import Login from './auth/Login'
import Navbar from './Home/Navbar'
import Error from './components/Error/Error'
import Explore from './components/explore/Explore'

const Layout = () =>{
  return(
    <div>
      <Navbar />
      <Outlet></Outlet>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/signin",
        element: <Register />
      },
      {
        path: "/signout",
        element: <Login />
      },
      {
        path: "/explore",
        element: <Explore />
      },
    ]
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      {/* <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}

    </div>
  )
}

export default App