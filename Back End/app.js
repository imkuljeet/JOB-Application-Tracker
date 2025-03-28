const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require("./models/users");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parses JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors()); // Enable CORS

// Register route
app.post('/user/register', async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Save the user to the database
        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        });
        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Sync the database
sequelize.sync()
    .then(result => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
