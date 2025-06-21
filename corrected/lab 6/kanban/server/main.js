require('dotenv').config()
require('./db/db.js'); // Ensure this file connects to MongoDB

const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000

const userController = require('./controllers/user.js');
const projectController = require('./controllers/project.js');
const storyController = require('./controllers/story.js');
const tasksController = require('./controllers/task.js');


const { generateToken } = require('./utils/auth.js');

app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = process.env.JWT_SECRET_KEY;
// frontend decode the jwt before request -> if expired, post to refresh token endpoint
// axious interceptor to check if the token is expired
// backend decode the jwt -> if expired, 401 error


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.use(cors());


app.use('/', userController);
app.use('/projects', projectController);
app.use('/projects/:projectId/stories', storyController);
app.use('/projects/:projectId/stories/:storyId/tasks', tasksController);




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

