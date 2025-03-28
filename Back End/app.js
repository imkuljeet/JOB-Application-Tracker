const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require("./models/users");

const userRoutes = require("./routes/user");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parses JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors()); // Enable CORS

// Register route
app.use('/user',userRoutes);

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
