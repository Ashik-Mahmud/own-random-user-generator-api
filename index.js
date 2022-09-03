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
app.use('/api/v1/users', usersRoute);



// testing api 
app.get('/', (req, res) => {
    res.json({ message: 'Random User API ready' });
})

// listen 
app.listen(port, () => {
    console.log(`Random Users listening at http://localhost:${port}`)
})