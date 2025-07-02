const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/user.js');
const { authenticateToken, generateToken, generateRefreshToken } = require('../utils/auth.js');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post('/logout', (_req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
})

router.get('/me', authenticateToken, (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.decode(token);
    res.status(200).json({ user: decoded });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.cookie('token', generateRefreshToken(user), {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        });

        return res.status(200).json({ message: 'Login successful', token: generateToken(user) });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/register', async (req, res) => {
    const { firstName, lastName, role, email, password } = req.body;

    if (!firstName || !lastName || !role || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newUser = new User({ firstName, lastName, role, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/refresh_token', async (req, res) => {
    const token = req.cookies.token;
    console.log(req.cookies)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const newToken = generateToken(user);
        res.status(200).json({ token: newToken });
    });
});


module.exports = router;