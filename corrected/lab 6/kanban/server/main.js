require('dotenv').config()
require('./db/db.js'); // Ensure this file connects to MongoDB

const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express()
const port = 3000

const userController = require('./controllers/user.js');
const projectController = require('./controllers/project.js');
const storyController = require('./controllers/story.js');
const tasksController = require('./controllers/task.js');


const { generateToken } = require('./utils/auth.js');

app.use(express.json());
app.use(cookieParser());

// frontend decode the jwt before request -> if expired, post to refresh token endpoint
// axious interceptor to check if the token is expired
// backend decode the jwt -> if expired, 401 error


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.use(cors({ credentials: true, origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));


app.use('/users', userController);
app.use('/projects', projectController);
app.use('/projects/:projectId/stories', storyController);
app.use('/projects/:projectId/stories/:storyId/tasks', tasksController);





