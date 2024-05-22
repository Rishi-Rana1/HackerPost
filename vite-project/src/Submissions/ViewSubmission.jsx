import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../constants/loggedUserContext.jsx';

function ViewSubmission() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const params = useParams();
  const [sub, setSub] = useState(null);
  const [size, setSize] = useState("0");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtainData = async () => {
      try {
        const res = await fetch(`https://linserv1.cims.nyu.edu:20004/user/${params.username}/${params.submission}`);
        const resParsed = await res.json();
        setSub(resParsed);

        const gitRes = await fetch(`https://api.github.com/users/${resParsed.code}/repos`);
        const gitResParsed = await gitRes.json();

        for (let elem of gitResParsed) {
          if (elem.name === resParsed.repo) {
            setSize(elem.size);
            setUrl(elem.html_url);
            break;
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    obtainData();
  }, [params.username, params.submission]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!sub) {
    return <h1>Submission does not exist</h1>;
  }

  return (
    <div>
      <h1>{sub.owner.username}'s Page</h1>
      <h3>Project: {sub?.name}</h3>
      Description:
      <textarea readOnly name="description" value={sub.description}></textarea>
      GitHub Size:
      <textarea readOnly name="size" value={size}></textarea>
      GitHub URL:
      <a href={url}>{url}</a>
    </div>
  );
}

export default ViewSubmission;
