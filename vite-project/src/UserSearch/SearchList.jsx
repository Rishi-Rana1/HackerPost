import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from '../constants/loggedUserContext.jsx'

function SearchList({ array, search, type }){
    if (type == "users"){
        const filteredRes = array.filter((item) => item.username.startsWith(search))
        if (filteredRes.length != 0) {
            return (
                <ul>
                    {
                        filteredRes.map((elem) => {
                            return <li key={elem.user_elem_key}><Link to={`/user/${elem.username}`}>{elem.username}</Link></li>
                        })
                    }
                </ul>
            )
        }
        else {
            return (
                <div>No Results</div>
            )
        }
    }

    else if (type == "submissions") {
        const newArray = array.submissions
        const filteredRes = (newArray ?? []).filter((item) => item.name.startsWith(search))
        if (filteredRes.length != 0) {
            return (
                <ul>
                    {
                        filteredRes.map((elem) => {
                            return <li key={elem.sub_elem_key}><Link to={`/user/${array.username}/${elem.name}`}>{elem.name}</Link></li>//<li key={elem.sub_elem_key}>{elem.name}</li>
                        })
                    }
                </ul>
            )
        }
        else {
            return (
                <div>No Results</div>
            )
        }
    }

}

export default SearchList