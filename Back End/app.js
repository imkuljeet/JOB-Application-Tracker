const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require("./models/users");
const Job = require("./models/jobs");
const Reminder = require("./models/reminder");
require('dotenv').config();

const userRoutes = require("./routes/user");
const addjobRoutes = require('./routes/addjob');
// const reminderRoutes = require('./routes/reminder");
const reminderRoutes = require('./routes/reminder');


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json()); // Parses JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors()); // Enable CORS

// Register routes
app.use('/user', userRoutes);
app.use('/job', addjobRoutes);
app.use('/reminder', reminderRoutes);

// Define associations
User.hasMany(Job);
Job.belongsTo(User);

User.hasMany(Reminder);
Reminder.belongsTo(User);

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

// Start the scheduler
require('./schedule/scheduler');
