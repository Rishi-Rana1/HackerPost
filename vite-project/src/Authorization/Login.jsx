import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../constants/loggedUserContext.jsx'

//header and footer for homepage dont have buttons to search for users but the h and f will have buttons for every other page and show if user is logged in for both homepage and others
function Login() {
    //if we want to handle more error make content an object with an array prop and error prop then display error if it exists
    const [response, setResponse] = useState({user: {}, error: null})
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { currUser, setCurrUser } = useContext(UserContext)
    const navigate = useNavigate()

    

  //use query 
  //to register, input any username and password, for now you are only able to register but not log in
    const handleSubmit = async (event) => {
      event.preventDefault(); 
      const reqOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      }
      //normally listen on port 3000, but ill replace with my incremented CIMS port (normally 22004, will have backend listen on 22005)
      const res = await fetch("https://linserv1.cims.nyu.edu:20004/login", reqOptions)
      const resParsed = await res.json()
      if (Object.hasOwn(resParsed, 'error')) {
        setResponse({user: {}, error: resParsed.error})
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

    return (
        <div>
          {response.error && <h1>{response.error}</h1>}
          <form method="POST" action="/login" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="username" onChange={handleUsername} value={username}></input>
            <input type="text" name="password" placeholder="password" onChange={handlePassword} value={password}></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}

export default Login;