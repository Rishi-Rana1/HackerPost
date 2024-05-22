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

app.get("/user/:username/:submission", async (req, res) => {
    const username = req.params.username
    //if it already exists, create 2 pages that initializes username and password first, then user info like bio
    const newUser = await User.findOne({username}).populate('submissions')
    const newSubmission = await Submission.findOne({name: req.params.submission}).populate("owner")
    res.send(JSON.stringify(newSubmission))
})

app.post("/user/:username/:submission", async (req, res) => {
    const { desc, code } = req.body
    const sub = await Submission.findOneAndUpdate({name: req.params.submission}, {$set: {description: desc, code: code}}).populate("owner")
    res.send(JSON.stringify(sub))
});

app.post("/submitSubmission", async (req, res) => {
    let { nombre, code, desc, currUser, repo } = req.body
    if (!nombre || !code || !desc || !repo) {
        res.send(JSON.stringify({error: "Please Enter All Information"}))
    }
    else{
        nombre = sanitize(nombre)
        code = sanitize(code)
        desc = sanitize(desc)
        repo = sanitize(repo)

        const newUser = await User.findOne({username: currUser.username}).populate('submissions')
        let found = false
        for (let sub of newUser.submissions) {
            if (sub.name == nombre) {
                res.send(JSON.stringify({error: "Submission with this name already exists"}))
                found = true
                break;
            }
        }
        if (found == false) {
            const submission = new Submission({
                name: nombre,
                description: desc,
                owner: currUser,
                code: code,
                repo: repo,
                sub_elem_key: uuidv4()
                });
            const sub = await submission.save()
            try {
                const result = await User.findOneAndUpdate({username: currUser.username}, {$push: {submissions: sub._id}})//.populate("owner")
                const sub1 = await Submission.findOne({name: nombre}).populate("owner")
                res.send(sub1)
            }
            catch(e) {
                console.log(e)
            }
        }
    }
})

export default app