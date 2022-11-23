import {Router} from "express"
import bcrypt from "bcrypt"
import mysql from "mysql"

import {db} from "../../database/database.js";
import {getUserDataApi} from "../../middleware/adminAuth.js";

const router = Router()


router.post("/auth/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    let isLoggedIn = false

    db.getConnection(async (error, connection) => {
        if (error) throw (error)
        const sqlSearch = "Select * from users where email = ?"
        const search_query = mysql.format(sqlSearch, [email])
        await connection.query(search_query, async (err, result) => {
            connection.release()

            if (error) throw (error)
            if (result.length === 0) {
                console.log("User does not exists")
                res.sendStatus(404)
            } else {
                const hashedPassword = result[0].password
                //get the hashedPassword from result
                if (await bcrypt.compare(password, hashedPassword)) {
                    await connection.query(search_query, async (error, result) => {
                        const sessionUserRole = result[0].role
                        const sessionUserName = result[0].user_name
                        isLoggedIn = true
                        req.session.userRole = sessionUserRole
                        req.session.user = sessionUserName
                        req.session.isLoggedIn = isLoggedIn
                        console.log("Login Successful")
                        res.redirect("/")
                    })
                } else {
                    console.log("Login failed")
                    res.send({data: "Log in failed"})
                } //end of bcrypt.compare()
            }//end of User exists i.e. results.length==0
        }) //end of connection.query()
    }) //end of db.connection()
}) //end of app.post()

router.post("/auth/signup", async (req, res) => {
    console.log("Reached signup post")
    const userName = req.body.userName
    const userEmail = req.body.email
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const role = "user"
    let isLoggedIn = false
    console.log({req: req.body})

    console.log("Before connection")
    db.getConnection(async (error, connection) => {
        if (error) throw error
        console.log("In connection")

        const sqlSearch = "SELECT * FROM USERS WHERE email = ?"
        const searchQuery = mysql.format(sqlSearch, [userEmail])

        const sqlInsert = "INSERT INTO USERS VALUES (0,?,?,?,?)"
        const insertQuery = mysql.format(sqlInsert, [userEmail, userName, hashedPassword, role])

        await connection.query(searchQuery, async (error, result) => {
            if (error) throw error
            console.log("Search Results:", result.length)

            if (result.length !== 0) {
                connection.release()
                console.log("User already exists!")
                res.sendStatus(409)
            } else {
                await connection.query(insertQuery, async (error, result) => {
                    await connection.query(searchQuery, async (error, result) => {
                        console.log({result})
                        const sessionUserRole = result[0].role
                        const sessionUserName = result[0].user_name
                        isLoggedIn = true
                        if (error) throw error
                        console.log("Created new user.")
                        req.session.userRole = sessionUserRole
                        req.session.userName = sessionUserName
                        req.session.isLogged = isLoggedIn
                        console.log({session: req.session})
                        res.redirect("/")
                    })

                })

            }
        })
    })
})

router.get("/api/auth/userdata", getUserDataApi, (req, res) => {
})

export default router