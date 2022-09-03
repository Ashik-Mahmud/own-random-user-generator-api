const users = require('../../utils/FileSystem');

const router = require('express').Router();


/* Route for Generating Random User Per Endpoints Hit */
router.get('/random', (req, res) => {
    const userLength = users.length
    const randomUser = users[Math.floor(Math.random() * userLength)]

    res.send(randomUser);
}).get("/all", (req, res) => {
    const limit = req.query.s;
    const userLength = users.length;
    if(limit > userLength){
        return res.send({ message: "Limit Exceeded" });
    }
    if(limit){
        return res.send(users.slice(0, limit));
    }

        
    res.send(users);
});
module.exports = router