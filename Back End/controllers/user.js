const User = require('../models/users');

const register =  async (req, res, next) => {
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
}

module.exports = { register };