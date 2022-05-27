/*
    to setup the express and mongodb project, type following commands in terminal:
    - npm init (do not need to enter all required information) => create a package.json
    - npm install express => create a package-lock.json
    - install MongoDBCompass and Robo 3T to your computer
    - npm i mongodb mongoose
    - npm i --save-dev babel-cli babel-preset-env babel-preset-stage-0 (create devDependencies)
    - npm i body-parser nodemon (install body-parser and nodemon)
    - in package.json, change the inside "scripts" to "start": "nodemon ./index.js --exec babel-node -e js" (to go to index.js and transpile it through Babel)
    - create .babelrc file to tell when the Babel transpile and what presets we are using
*/

import express from "express";
import routes from "./src/routes/crmRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()) // the bodyParser will parse the request body in a way that it can readable by our API

routes(app);

app.get('/', (req, res) => 
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
});