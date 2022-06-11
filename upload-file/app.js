const express = require("express");
const app = express();
require("dotenv").config();

// middleware
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static("./public"));
app.use(express.json()); // the same as body-parser

// config cloudinary V2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// routes
const uploadRouter = require("./routes/upload");
app.use("/api/v1/file", uploadRouter);

// middleware for custom error
const notfound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(notfound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000; // in case the project is hosted, it will use the port from that host. Otherwise, it will run local on port 3000

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
