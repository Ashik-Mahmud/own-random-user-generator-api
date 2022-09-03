const userController = require('../../controllers/v1/users.controller.js');
const users = require('../../utils/FileSystem');

const router = require('express').Router();



router.get('/random', userController.randomUser).get("/all", userController.allUser).post("/save", userController.saveUser);
module.exports = router