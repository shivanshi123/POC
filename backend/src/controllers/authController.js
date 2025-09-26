const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthController {
    async register(req, res) {
        const { username, password, role } = req.body;
        try {
            const newUser = await User.create({ username, password, role });
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }

    async getProfile(req, res) {
        res.status(200).json({ user: req.user });
    }

    async admin(req, res) {
        res.status(200).json({ message: 'Welcome, admin!', user: req.user });
    }
}

module.exports = new AuthController();