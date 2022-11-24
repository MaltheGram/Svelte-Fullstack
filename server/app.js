import express from "express"

const app = express()
import cors from "cors"

app.use(cors({
    credentials: true,
    origin: true
}))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

import session from "express-session"
const maxAge = 100 * 60 * 60
const sessionName = "malthe-cookie"

app.use(session({
    secret: "123",
    resave: false,
    saveUninitialized: true,
    cookie: {
        name: sessionName,
        secure: false,
        maxAge: maxAge
    }
}))
import helmet from "helmet";
app.use(helmet())

import authRouter from "./routers/authRouters/authRouter.js"
app.use(authRouter)

import forgotPasswordRouter from "./routers/authRouters/forgotPasswordRouter.js"
app.use(forgotPasswordRouter)


import sessionRouter from "./routers/sessionRouters/sessionRouter.js"
app.use(sessionRouter)

app.get('*', (req, res) => {
    res.send("<h1> 404 Site not found. </h1>")
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})