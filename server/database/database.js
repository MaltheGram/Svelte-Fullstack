import dotenv from "dotenv"
import mysql from "mysql"

dotenv.config()

export const db = await mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

db.getConnection((error, connection) => {
    if (error) throw error
    console.log("Database connected successfully")
})

export default db