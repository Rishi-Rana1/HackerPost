import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './loggedUserContext.jsx'


function Home() {
    const { currUser, setCurrUser } = useContext(UserContext)
    return (
        <div className='homeLinks'>
            <Link to='/user'>Search User</Link>
            {currUser.username != null ? <Link to="/submission">Add Submission</Link> : <div>Must be signed in to add submissions</div>}
            <p>Welcome to HackerPost! Store Your Projects Here!</p>
        </div>
      );
}

export default Home