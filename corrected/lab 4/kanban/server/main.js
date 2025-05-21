require('dotenv').config()
const jwt = require('jsonwebtoken');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

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
    userList.forEach(user => {
        if (user.firstName === userfirstName && user.password === password) {
            res.cookie('token', generateRefreshToken(user), {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'lax'
            });
            res.status(200).json({ message: 'Login successful', token: generateToken(user) });
            return;
        }
    })

    res.status(401).json({ message: 'Invalid userfirstName or password' });
});

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