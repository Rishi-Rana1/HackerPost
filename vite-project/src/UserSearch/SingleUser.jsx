import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../constants/loggedUserContext.jsx";

import SearchList from "./SearchList.jsx";

function SingleUser() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const params = useParams();
  const [search, setSearch] = useState("");
  const [uid, setUid] = useState("0");
  const [searchResult, setSearchResult] = useState({ user: {}, error: null });

  let isBusy = false;

  const incrUid = () => {
    setUid(Math.random().toString(16).slice(2));
  };

  const collect = async () => {

    if(isBusy)
        return;

    isBusy = true;
    try {
      const res = await fetch(`https://linserv1.cims.nyu.edu:20004/user/${params.username}`);
      const resParsed = await res.json();
      const obj = { user: resParsed, error: null };
              
      setSearchResult(obj);
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      incrUid();
      isBusy = false;
    }
  };

  useEffect(() => {
    collect();
  }, []);

  const handleType = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  //{searchResult.error ? <div>{searchResult.error}</div> : <SearchList array={searchResult.user.submissions} search={search} type="submissions"/>}
  if (!searchResult.user || (Object.keys(searchResult.user)).length == 0) {
    return <h1>User Does Not Exist</h1>
  }
  else{
    return (
      <div>
        <h1>Welcome to {searchResult.user?.username}'s page</h1>
        <h3>About Me:</h3>
        <textarea readOnly value={searchResult.user.bio}></textarea>
        <input
          type="text"
          name="submissionSearch"
          placeholder="Search Submissions"
          onChange={handleType}
          value={search}
        ></input>
        {searchResult.error ? <div>{searchResult.error}</div> : <SearchList key={uid} array={searchResult.user} search={search} type="submissions"/>}
      </div>
    );
  }
}

export default SingleUser;
