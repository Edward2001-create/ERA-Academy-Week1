require("dotenv").config();
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD || "",
    database: "school_demo"
});

db.connect((error) => {
    if(error) {
        console.error("mysql connection failed:", error);
        return;
    }
    console.log("connected to mysql");
});

module.exports = db;