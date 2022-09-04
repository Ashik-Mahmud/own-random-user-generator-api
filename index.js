const users = require("./utils/FileSystem.js");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;


// importedRoutes 
const usersRoute = require('./routes/v1/users.route.js');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// routes
app.use('/user', usersRoute);



// testing api 
app.get('/', (req, res) => {
    res.json({ message: 'Random User API ready' });
})


// validated Route 
app.use("*", (req, res) => { 
    res.status(404).json({ message: "Route Not Found" });
})



// listen 
app.listen(port, () => {
    console.log(`Random Users listening at http://localhost:${port}`)
})