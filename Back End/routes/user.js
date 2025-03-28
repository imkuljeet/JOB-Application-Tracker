const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/register',userController.register);
router.post('/login',userController.login);

// routes/user.js
const User = require('../models/users');
const Authorization = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/profile', Authorization, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['name', 'email', 'careerGoals'] // Include careerGoals field
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch profile data. Please try again.' });
    }
});

router.put('/profile', Authorization, async (req, res) => {
    const { name, email, password, careerGoals } = req.body;

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.careerGoals = careerGoals || user.careerGoals;
        if (password) {
            user.password = await bcrypt.hash(password, 10); // Hash the password before saving
        }
        await user.save();

        // Generate new token with updated user information
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            'your_jwt_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Profile updated successfully', user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update profile. Please try again.' });
    }
});


module.exports = router;
