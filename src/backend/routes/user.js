const cors = require("cors");
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const userCtrl = require('../controllers/user');

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

router.use(cors());

router.use((req, res, next) => {
    console.log("user request has been asked XX");
    next()
});
router.post('/signup', jsonParser, userCtrl.signup);
router.post('/login', jsonParser, userCtrl.login);

module.exports = router;