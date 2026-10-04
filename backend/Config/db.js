import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config({
    path: './Config/config.env'
});
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


db.getConnection((err) => {
    if (err) {
        return console.log("Database not connected", err.message);
    } else {
        console.log("Database connected")
    }
})

export default db.promise();