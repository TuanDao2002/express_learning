const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notfound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'))
app.use(express.json()) // the same as body-parser

// routes
app.use('/api/v1/tasks', tasks);

// middleware for custom error
app.use(notfound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000; // in case the project is hosted, it will use the port from that host. Otherwise, it will run local on port 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port}...`));   
    } catch (error) {
        console.log(error);
    }
}

start();
