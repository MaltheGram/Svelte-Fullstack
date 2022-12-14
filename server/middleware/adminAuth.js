import mysql from "mysql";
import db from "../database/database.js";

// This API should not actually exist due to security issues! This is for testing purpose only.
export const getUserDataApi = (req, res) => {
    const session = req.session
    if (session.isLoggedIn && session.userRole === "admin") {
        db.getConnection(async (error, connection) => {
            if (error) throw error
            console.log("In connection")

            const sqlSearch = "SELECT * FROM USERS "
            const searchQuery = mysql.format(sqlSearch)

            await connection.query(searchQuery, async (error, result) => {
                if (error) throw (error)
                res.send({data: result, sessionID: req.session.sessionID})
            })
        })
    } else {
        res.send("Access Denied.")
    }
}