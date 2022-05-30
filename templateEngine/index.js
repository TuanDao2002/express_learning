/*
    An Express program to render a markdow file to become HTML in client's browser
    Run with this command: node index.js
*/

const express = require('express');
const fs = require('fs');
const util = require('util');
const {marked} = require('marked'); // include this library to render markdown file (.md)
const app = express();
const port = 3000;

const fsreadfile = util.promisify(fs.readFile); // make this function become a promise function

// use app.engine() to render a .md file with a template engine
app.engine('md', async (filePath, options, callback) => {
    // an async engine that render the content read from the filepath and render it by a callback funtion
    try {
        const content = await fsreadfile(filePath);
        const rendered = content.toString().replace('{headline}', options.headline); // use "options" object if given
        return callback(null, marked(rendered));
    } catch(err) {  
        return callback(err);
    }
})

// configure the folder location and the engine to render the markdown file
app.set('views', 'views');
app.set('view engine', 'md');

function handler(req, res) {
    return res.render('index', { headline: 'Hello World' }) // render the index.md with the headline of "Hello World"
}

app.get('/', handler);

app.listen(port, 
    () => console.log(`Hello world listening on port ${port}`));