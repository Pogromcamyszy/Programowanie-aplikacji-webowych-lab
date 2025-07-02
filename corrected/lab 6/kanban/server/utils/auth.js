require('dotenv').config()
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

console.log("SECRET_KEY:", SECRET_KEY);

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

function generateToken(user) {
    return jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }, SECRET_KEY, {
        expiresIn: '1h',
    });
}

function generateRefreshToken(user) {
    return jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }, SECRET_KEY, {
        expiresIn: '7d',
    });
}

module.exports = {
    authenticateToken,
    generateToken,
    generateRefreshToken
};