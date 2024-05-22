import './config.mjs'
import mongoose from 'mongoose'
const { Schema } = mongoose;

await mongoose.connect(process.env.DSN)
//maybe add in ability to add profile pictures eventually
//users: { type: Schema.Types.ObjectId, ref: 'User' }
const SubmissionSchema = new mongoose.Schema({
  name: {required: true, type: String},
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  description: {required: true, type: String},
  code: {required: true, type: String},
  repo: {required: true, type: String},
  sub_elem_key: {required: true, type: String}
})

const HackathonSchema = new mongoose.Schema({
    name: {required: true, type: String},
    submissions: [{ type: Schema.Types.ObjectId, ref: 'Submission' }],
    description: {required: true, type: String},
    start_date: {required: true, type: String},
    end_date: {required: true, type: String},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
})

const UserSchema = new mongoose.Schema({
  username: {required: true, type: String}, //meant to be a route param and for login purposes
  password_hash: {required: true, type: String}, 
  //personal_page: { type: Schema.Types.ObjectId, ref: 'Page' }, 
  user_elem_key: {required: true, type: String},
  bio: {required: true, type: String},
  submissions: [{ type: Schema.Types.ObjectId, ref: 'Submission' }]
})

const User = mongoose.model('User', UserSchema)
const Submission = mongoose.model('Submission', SubmissionSchema)
const Hackathon = mongoose.model('Hackathon', HackathonSchema)

