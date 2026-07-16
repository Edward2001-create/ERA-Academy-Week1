const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// root route-confirms the server is running
app.get("/", (req, res) => {
    res.send("backend is running with mysql");
});

// GET /students - returns all students from mysql
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (error, results) => {
        if(error) {
            console.error("error getting students:", error);
            return res.status(500).json({ error: "failed to get students"});
        }
        res.json(results);
    });
});

// GET /classes - return all classes from mysql
app.get("/classes", (req, res) => {
    const sql = "SELECT * FROM classes";
    db.query(sql, (error, results) => {
        if(error) {
            console.error("error getting classes:", error);
            return res.status(500).json({ error: "failed to get classes"});
        }
        res.json(results);
    });
});

// GET /enrollments - returns joined data(student name + class name)
app.get("/enrollments", (req, res) => {
    const sql = "SELECT students.first_name, students.last_name, classes.class_name, classes.teacher_name FROM enrollments JOIN students ON enrollments.student_id = students.id JOIN classes ON enrollments.class_id = classes.id";
    db.query(sql, (error, results) => {
        if(error) {
            console.error("error getting enrollments:", error);
            return res.status(500).json({ error: "failed to get enrollments"});
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
