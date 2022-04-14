const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCTRL = require("../controllers/sauce");

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const cors = require('cors');
router.use(cors());

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', "default-src 'self'")
    next();
});

router.use((req, res, next) => {
    console.log("sauces request has been asked XX");
    next()
});

// Send the array of the saucess
router.get("/" , jsonParser, auth, sauceCTRL.getAllSauce);

// Get a specified sauce depending on its id
router.get('/:id', jsonParser, auth, sauceCTRL.getOneSauce);

// Update specified sauce depending on it
router.put('/:id', jsonParser, auth, sauceCTRL.modifySauce);

// Delete a specified sauce depending on its id
router.delete('/:id', jsonParser, auth, sauceCTRL.deleteSauce);

// Saves a sauce to the database
router.post("/", jsonParser, auth, multer, sauceCTRL.createSauce);

// Updates Like
router.post("/:id/like", jsonParser, auth, sauceCTRL.likedSauce);

module.exports = router;