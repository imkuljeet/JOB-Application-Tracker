const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Make sure the path to the User model is correct

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Use the same secret key you used to sign the JWT

        // Find the user by ID
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticate;
