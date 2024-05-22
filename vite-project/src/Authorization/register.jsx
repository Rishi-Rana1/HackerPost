//import logo from './logo.svg';
//import './App.css';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../constants/loggedUserContext.jsx'
import { useNavigate } from "react-router-dom";


function Register() {
  //if we want to handle more error make content an object with an array prop and error prop then display error if it exists
  const [content, setContent] = useState({array: [], error: null})
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const { currUser, setCurrUser } = useContext(UserContext)
  const navigate = useNavigate()
  
  const userFetch = async () => {
    //create .env in this folder and add it to gitignore, then insert the correct servername + the /register, make sure to add a config, add js file and import it
    const users = await fetch("https://linserv1.cims.nyu.edu:20004/register")
    const parsedUsers = await users.json()
    setContent({array: parsedUsers.newUsers, error: null})
  }

  useEffect(() => {
    userFetch()
  }, [])
//use query 
//to register, input any username and password, for now you are only able to register but not log in
  const handleSubmit = async (event, props) => {
    event.preventDefault(); 
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password, bio})
    }
    //normally listen on port 3000, but ill replace with my incremented CIMS port (normally 22004, will have backend listen on 22005)
    const res = await fetch("https://linserv1.cims.nyu.edu:20004/register", reqOptions)
    const resParsed = await res.json()
    if (Object.hasOwn(resParsed, 'error')) {
        setContent({array: [...content.array], error: resParsed["error"]})
    }
    else{
        setCurrUser(resParsed)
        navigate("/")
    }
    //in backend send back the object (with username and password) just recieved back as a response here, then update the content state right away to make it work without the button
  }

  const handleUsername = (event) => {
    event.preventDefault(); 
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    event.preventDefault(); 
    setPassword(event.target.value)
  }

  const handleBio = (event) => {
    event.preventDefault(); 
    setBio(event.target.value)
  }

  //ask if database should include Keys for each username and password
  return (
    <div>
      {content.error && <h1>{content.error}</h1>}
      <form method="POST" action="/register" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" onChange={handleUsername} value={username}></input>
        <input type="text" name="password" placeholder="password" onChange={handlePassword} value={password}></input>
        <textarea type="text" name="bio" placeholder="Tell us about yourself!" onChange={handleBio} value={bio}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default Register;