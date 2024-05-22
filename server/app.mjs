import './config.mjs'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import './db.mjs';
import registerRoutes from './routes/register.mjs'
import loginRoutes from './routes/login.mjs'
import { parseCookies, manageSession } from './routes/loginStatus.mjs'
import searchUser from "./routes/CollectUser.mjs"
import sub from "./routes/submissions.mjs"
import cors from 'cors'


//could possibly keep track of if user is logged in here

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(parseCookies)
app.use(manageSession)

app.use(
    cors({
        origin: process.env.FRONTEND,
        methods: ["GET", "POST"]
    })
)

app.use(express.json());
//to add prefix just add prefix before express with coma
app.use(loginRoutes)
app.use(registerRoutes)
app.use(searchUser)
app.use(sub)

app.listen(process.env.PORT || 3000);
