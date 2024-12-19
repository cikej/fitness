const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // Replace with your MySQL password
    database: 'fitness_tracker'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create tables if they don't exist
db.query(`
    CREATE TABLE IF NOT EXISTS meals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        calories INT
    )
`);

db.query(`
    CREATE TABLE IF NOT EXISTS exercises (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        time INT
    )
`);

// Add meal
app.post('/add-meal', (req, res) => {
    const { name, calories } = req.body;
    db.query('INSERT INTO meals (name, calories) VALUES (?, ?)', [name, calories], (err, result) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// Add exercise
app.post('/add-exercise', (req, res) => {
    const { name, time } = req.body;
    db.query('INSERT INTO exercises (name, time) VALUES (?, ?)', [name, time], (err, result) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// Get summary
app.get('/get-summary', (req, res) => {
    db.query('SELECT SUM(calories) AS totalCalories FROM meals', (err, mealsResult) => {
        if (err) return res.status(500).json({ success: false });

        db.query('SELECT SUM(time) AS totalExerciseTime FROM exercises', (err, exercisesResult) => {
            if (err) return res.status(500).json({ success: false });

            const totalCalories = mealsResult[0].totalCalories || 0;
            const totalExerciseTime = exercisesResult[0].totalExerciseTime || 0;

            res.json({ totalCalories, totalExerciseTime });
        });
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});