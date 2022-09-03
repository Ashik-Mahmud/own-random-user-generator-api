const fs = require('fs');
const path = require("path")


const usersBuffer = fs.readFileSync(path.join(__dirname, "../views/Users.json"));
const users = JSON.parse(usersBuffer);
module.exports = users

