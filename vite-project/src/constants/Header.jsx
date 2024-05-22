import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './loggedUserContext'
import { useNavigate } from "react-router-dom"


function Header() {
    const { currUser, setCurrUser } = useContext(UserContext)
    const navigate = useNavigate()
    if (Object.keys(currUser).length == 0) {
        return (
            <div id="header">
                <Link id="link" to='/user'>Search User</Link><Link to="/">HackerPost</Link><Link id="link" to='/register'>register</Link> | <Link id="link" to='/login'>Login</Link>
            </div>
        )
    }

    else {
        function signOut(e) {
            e.preventDefault()
            setCurrUser({})
            navigate("/")
        }
        return (
            <div id="header">
                <Link id="link" to='/user'>Search User</Link><Link to="/">HackerPost</Link><button id="link" type='button' onClick={signOut}>Sign Out</button> | <Link to={`/user/${currUser.username}`}>{currUser.username}</Link>
            </div>
        )
    }
}

export default Header
//pass in login status to components that require you to be logged in