const mongoose = require('mongoose');

const savedSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    posts: [String],
})

module.exports = mongoose.model("SavedPostSchema", savedSchema);