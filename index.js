const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use('/posts',require('./routes/posts.js'));

app.get('/', (req, res) => {
    res.status(200).json({ "message": "I am blog website backend" });
})

mongoose.connect(process.env.mongo_url, err => {
    if (err)
        console.log(err.message);
    else
        console.log("Database Connected.");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running At Port ${process.env.PORT || 5000}.`)
});