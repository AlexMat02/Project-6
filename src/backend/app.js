//MONGODB PASSWORD : RsvpZHgDAJVHmIV5
//MONGODB CONNECTION : mongodb+srv://user1:<password>@cluster0.2wy7q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const mongoose = require('mongoose');

const path = require("path");

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://user1:RsvpZHgDAJVHmIV5@cluster0.2wy7q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Success, Connected to MONGODB')
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDb Atlas');
        console.error(error)
});

app.use((req, res, next) => {
    console.log("REQUEST SEEN XX");
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;