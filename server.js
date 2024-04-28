require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT||3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: false
}));

const connection = mysql.createConnection({
  host: 'syllabot.cve2k2eq2tj2.ap-northeast-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'thehp2722',
  database: 'syllabot'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    return;
  }
  console.log('Connected to database');
});

// Authentication middleware
const authenticate = (req, res, next) => {
  // Check if the user is authenticated
  if (req.session && req.session.isAuthenticated) {
    next(); // User is authenticated, proceed to the next middleware
  } else {
    res.redirect('/'); // User is not authenticated, redirect to the login page
  }
};

app.get('/form', authenticate, (req, res) => {
  res.sendFile(__dirname + '/admin_form.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/admin_login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Implement your authentication logic here
  if (username === 'admin' && password === 'admin') {
    req.session.isAuthenticated = true; // Set authentication status in session
    res.redirect('/form'); // Redirect to the course form page after successful login
  } else {
    res.status(401).send('Invalid username or password');
  }
});

app.post('/courses', authenticate, (req, res) => {
  const { sem, code, name, credits, syllabus, books, branch } = req.body;
  const query = 'INSERT INTO courses (sem, code, name, credits, syllabus, books, branch) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [sem, code, `${code}  ${name}`, credits, syllabus, books, branch], (error, results) => {
    if (error) {
      console.error('Error inserting course:', error);
      res.status(500).send('Error adding course');
      return;
    }
    console.log('Course added:', results);
    res.status(200).send('Course added successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
