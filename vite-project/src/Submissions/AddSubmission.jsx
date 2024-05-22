import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../constants/loggedUserContext.jsx';

function AddSubmission() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [code, setCode] = useState("");
    const [desc, setDesc] = useState("");
    const [repo, setRepo] = useState("");
    const [error, setError] = useState(null);
    const { currUser } = useContext(UserContext);
    const [isBusy, setIsBusy] = useState(false);

    const collect = async (event) => {
        event.preventDefault();
        if (isBusy) return;
        setIsBusy(true);
        setError(null);
        
        try {
            const gitRes = await fetch(`https://api.github.com/users/${code}/repos`);
            const gitResParsed = await gitRes.json();
    
            if (gitResParsed.message) {
                setError("GitHub User or Repository Not Found");
                setIsBusy(false);
                return; 
            } 
            else {
                let found = false;
                for (let rep of gitResParsed) {
                    if (rep.name === repo) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    setError("GitHub User or Repository Not Found");
                    setIsBusy(false);
                    return; 
                }
            }
    
            const reqOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre, code, desc, currUser, repo})
            };
            const res = await fetch("https://linserv1.cims.nyu.edu:20004/submitSubmission", reqOptions);
            const redParsed = await res.json();
            if (redParsed.error) {
                setError(redParsed.error);
            } else {
                navigate(`/user/${currUser.username}`);
            }
        } catch (e) {
            console.log("error happened", e);
            setError("An error occurred while processing your request");
        }
        setIsBusy(false);
    };
    

    const handleNombre = (event) => {
        setNombre(event.target.value);
    };

    const handleDesc = (event) => {
        setDesc(event.target.value);
    };

    const handleCode = (event) => {
        setCode(event.target.value);
    };

    const handleRepo = (event) => {
        setRepo(event.target.value);
    };

    if (!currUser.username) {
        return <h1>You must be logged in, go <Link to='/'>home</Link></h1>
    } else {
        return (
            <div>
                {error && <h1>{error}</h1>}
                <h1>Enter the following details</h1>
                <form method="POST" onSubmit={collect}>
                    <input name="name" placeholder="Enter Name" onChange={handleNombre} value={nombre}></input>
                    <textarea name="description" placeholder="Enter Description" onChange={handleDesc} value={desc}></textarea>
                    <input name="code" placeholder="Enter GitHub Username" onChange={handleCode} value={code}></input>
                    <input name="repo" placeholder="Enter Repository Name" onChange={handleRepo} value={repo}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddSubmission;
