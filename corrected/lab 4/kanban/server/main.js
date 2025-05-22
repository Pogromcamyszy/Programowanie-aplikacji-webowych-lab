require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000

app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = process.env.JWT_SECRET_KEY;
// frontend decode the jwt before request -> if expired, post to refresh token endpoint
// axious interceptor to check if the token is expired
// backend decode the jwt -> if expired, 401 error

userList = [
    { 'id': 1, 'firstName': 'Alice', 'lastName': 'Admin', 'role': 'admin', 'password': 'admin123' },
    { 'id': 2, 'firstName': 'Bob', 'lastName': 'Builder', 'role': 'developer', 'password': 'admin123' },
    { 'id': 3, 'firstName': 'Charlie', 'lastName': 'Ops', 'role': 'devops', 'password': 'admin123' },
    { 'id': 4, 'firstName': 'Dave', 'lastName': 'Developer', 'role': 'admin', 'password': 'admin123' },
    { 'id': 5, 'firstName': 'Eve', 'lastName': 'Engineer', 'role': 'admin', 'password': 'admin123' },
]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/login', (req, res) => {
    const { userfirstName, password } = req.body;

    const user = userList.find(user => user.firstName === userfirstName && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid userfirstName or password' });
    }

    res.cookie('token', generateRefreshToken(user), {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'lax'
    });

    return res.status(200).json({ message: 'Login successful', token: generateToken(user) });
});

app.get('/user', authenticateToken, (req, res) => {
   const token = req.headers['authorization']?.split(' ')[1];
   const decoded = jwt.decode(token);
   res.status(200).json({ user: decoded });
});

app.post('/refresh-token', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = userList.find(user => user.id === decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const newToken = generateToken(user);
        res.status(200).json({ token: newToken });
    });
});

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
    return jwt.sign({ id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role }, SECRET_KEY, {
        expiresIn: '1h',
    });
}

function generateRefreshToken(user) {
    return jwt.sign({ id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role }, SECRET_KEY, {
        expiresIn: '7d',
    });
}