// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const body_parser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 5500;

const server = app.listen(port, listening);

function listening(){
    console.log(`running on localhost: ${port}`);
};

// GET route

app.get('/all', sendData);

function sendData (req, res){
    res.send(projectData);
    

};

//POST route
const  data = [] 

app.post('/addData', addData);

function addData(req, res){
    console.log(req.body)

//user's input for: date, temperature, feelings
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        feeling: req.body.content

    }

    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData)
}
