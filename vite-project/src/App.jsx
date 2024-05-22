//import logo from './logo.svg';
//import './App.css';
import React, { createContext, useEffect, useState } from 'react'
import UseCreateContext from './constants/loggedUserContext.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Link
} from "react-router-dom";
import Register from "./Authorization/register.jsx";
import Login from "./Authorization/Login.jsx"
import Home from "./constants/Homepage.jsx"
import Header from "./constants/Header.jsx"
import SearchUsers from "./UserSearch/SearchUser.jsx"
import SingleUser from './UserSearch/SingleUser.jsx'
import ViewSubmission from './Submissions/ViewSubmission.jsx';
import AddSubmission from './Submissions/AddSubmission.jsx';

//export const UserContext = createContext({})
//use localStorage to keep session
const Page = ({ idVal }) => {
  return (
    <div id={idVal}>
      <Header />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Page id="Register"/>,
    children: [
      {
        path: "/register",
        element: <Register />
      }
    ]
  },
  {
    path: "/login",
    element: <Page id="Login"/>,
    children: [
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
  {
    path: "/",
    element: <Page id="Homepage"/>,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
  },
  {
    path: "/user",
    element: <Page id="UserSearch"/>,
    children: [
      {
        path: "/user",
        element: <SearchUsers />
      }
    ]
  },
  {
    path: "/user/:username",
    element: <Page id="User"/>,
    children: [
      {
        path: "/user/:username",
        element: <SingleUser />
      }
    ]
  },
  {
    path: "/user/:username/:submission",
    element: <Page id="ViewSubmission"/>,
    children: [
      {
        path: "/user/:username/:submission",
        element: <ViewSubmission />
      }
    ]
  },
  {
    path: "/submission",
    element: <Page id="AddSubmission"/>,
    children: [
      {
        path: "/submission",
        element: <AddSubmission />
      }
    ]
  }
])
//move things in app into homepage
function App() {
  //const [currUser, setCurrUser] = useState({})
  return (
    <UseCreateContext>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    </UseCreateContext>
  );
}


export default App;
