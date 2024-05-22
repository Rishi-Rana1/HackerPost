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

app.post("/login", async (req, res) => {
    //try to append /user/:username for a pathway to go to, password to append /user should be in notes as some kind of middleware.
    let { username, password } = req.body
    username = sanitize(username)
    password = sanitize(password)
    const user = await User.findOne({username})
    if (user && bcrypt.compareSync(password, user.password_hash)) {
        res.send(JSON.stringify(user))
    }
    else {
        res.send(JSON.stringify({error: "Incorrect Username and/or Password"}))
    }
    //will add try-catch statements later
});

export default app