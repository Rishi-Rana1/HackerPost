import '../config.mjs'
import { Router } from 'express'
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import '../db.mjs';

const app = new Router()

const User = mongoose.model('User');
const Submission = mongoose.model('Submission');

app.get("/register", async (req, res) => {
    //later will check DB for identical username and prevent user from making an account with that username
    //if it already exists, create 2 pages that initializes username and password first, then user info like bio
    const newUsers = await User.find({}) //supposed to be an array of objects
    res.send(JSON.stringify({newUsers: newUsers}))
})


app.post("/register", async (req, res) => {
    //redirect to different page to input profile details after and have it come to another route here
    //try to append /user/:username for a pathway to go to, password to append /user should be in notes as some kind of middleware.
    let { username, password, bio } = req.body
    const newUsers = await User.find({username})
    if (newUsers.length != 0) {
        res.send(JSON.stringify({error: "Username Taken"}))
    }
    else if (username.length < 8 && password.length < 8) {
        res.send(JSON.stringify({error: "Username and Password Need At Least 8 Characters"}))
    }
    else if (username.length < 8) {
        res.send(JSON.stringify({error: "Username Needs At Least 8 Characters"}))
    }
    else if (password.length < 8) {
        res.send(JSON.stringify({error: "Password Needs At Least 8 Characters"}))
    }
    else{
        username = sanitize(username)
        password = sanitize(password)
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        const user_elem_key = uuidv4()
        const user = new User({
            username, 
            password_hash: hash, 
            user_elem_key, 
            bio, 
            submissions: []
        });
        const prod = await user.save()
        res.send(JSON.stringify(prod))
        //will add try-catch statements later
    }
});

export default app