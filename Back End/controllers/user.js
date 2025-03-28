const bcrypt = require('bcrypt');
const User = require('../models/users');

const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Save the user to the database with the hashed password
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful!', user: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
};

module.exports = { register, login };
