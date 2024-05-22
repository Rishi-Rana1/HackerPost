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

app.get("/user", async (req, res) => {
    //if it already exists, create 2 pages that initializes username and password first, then user info like bio
    const newUsers = await User.find({})
    res.send(JSON.stringify({newUsers: newUsers}))
})

app.get("/user/:username", async (req, res) => {
    const username = req.params.username
    //if it already exists, create 2 pages that initializes username and password first, then user info like bio
    const newUser = await User.findOne({username}).populate('submissions')
    res.send(JSON.stringify(newUser))
})

export default app