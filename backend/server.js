const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Serve frontend files from root directory

// Serve index.html when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Serve payment.html
app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'payment.html'));
});

// Serve thank-you.html
app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'thank-you.html'));
});

// Serve blog.html
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'blog.html'));
});

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sciastra_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to get all courses
app.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses'; // Adjust based on your schema
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(result); // Send the courses as JSON
    });
});

// Endpoint to get all blog posts
app.get('/blog', (req, res) => {
    const query = 'SELECT * FROM blogs'; // Adjust based on your schema
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(result); // Send the blog posts as JSON
    });
});

// Endpoint for adding a blog post
app.post('/add-blog', (req, res) => {
    const { title, content, publish_time } = req.body;
    const query = `INSERT INTO blogs (title, content, publish_time) VALUES (?, ?, ?)`;
    db.query(query, [title, content, publish_time], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send('Blog post scheduled successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
