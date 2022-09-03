const userController = require('../../controllers/v1/users.controller');
const users = require('../../utils/FileSystem');

const router = require('express').Router();



router.get('/random', userController.randomUser).get("/all", userController.allUser);
module.exports = router