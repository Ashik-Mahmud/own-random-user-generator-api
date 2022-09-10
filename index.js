const users = require("./utils/FileSystem.js");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;


// importedRoutes 
const usersRoute = require('./routes/v1/users.route.js');
const { connectToServer } = require("./utils/dbConnection.js");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


/* MongoDB Connections */
connectToServer((err)=>{
    if(!err){
       // listen 
       app.listen(port, () => {
           console.log(`Random Users listening at http://localhost:${port}`)
       })
    }else{
       console.log(err);
    }
 })
   
   

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




