import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../constants/loggedUserContext.jsx'
import SearchList from "./SearchList.jsx"

function searchUsers() {
    const { currUser, setCurrUser } = useContext(UserContext)
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState({array: [], error: null})

    const collect = async (signal) => {
        try {
            const res = await fetch("https://linserv1.cims.nyu.edu:20004/user", { signal })
            const resParsed = await res.json()
            setSearchResult({array: resParsed.newUsers, error: null})
        }
        catch(e) {
            setSearchResult({array: [], error: e})
        }

    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        collect(signal)
        //return () => controller.abort()
    }, [])

      const handleType = (event) => {
        event.preventDefault(); 
        setSearch(event.target.value)
      }

    return (
        <div>
            <input type="text" name="userSearch" placeholder="Search User" onChange={handleType} value={search}></input>
            {searchResult.error ? <div>{searchResult.error}</div> : <SearchList array={searchResult.array} search={search} type="users"/>}
        </div>
      );
}

export default searchUsers