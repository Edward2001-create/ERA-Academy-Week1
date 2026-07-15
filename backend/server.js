const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function startServer() {
    try {
        await client.connect();
        console.log("connected to mongodb");
        
        const db = client.db("school_demo");
        const studentsCollection = db.collection("students");
        
        await studentsCollection.insertOne({
            firstName: "John",
            lastName: "Doe",
            gradeLevel: 10
        });
        
        app.get("/", (req, res) => {
            res.send("backend connected to MongoDB");
        });
        
        app.listen(3000, () => {
            console.log("server running at http://localhost:3000");
        });
    } catch (error) {
        console.error("error connecting to MongoDB:", error);
    }
}

startServer();