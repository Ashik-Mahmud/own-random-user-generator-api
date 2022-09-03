const fs = require('fs');
const path = require("path")


const usersBuffer = fs.readFileSync(path.join(__dirname, "../views/Users.json"));
const users = JSON.parse(usersBuffer);

/* /* Adding Single New User /*  */
const addingNewUser = (newUser) => {
   try {

    const usersBuffer = fs.readFileSync(path.join(__dirname, "../views/Users.json"));
    const users = JSON.parse(usersBuffer);
    users.push(newUser);
    const sortedByID = users.sort((a, b) => a.id - b.id);
    fs.writeFileSync(path.join(__dirname, "../views/Users.json"), JSON.stringify(sortedByID));

   } catch (error) {
       console.log(error.message);
   }
}


/* Delete Single User */
const usersExceptDeletedItem = (users) => {
    try {
     const sortedByID = users.sort((a, b) => a.id - b.id);
     fs.writeFileSync(path.join(__dirname, "../views/Users.json"), JSON.stringify(sortedByID));
 
    } catch (error) {
        console.log(error.message);
    }
 }



module.exports = {users,addingNewUser, usersExceptDeletedItem}

