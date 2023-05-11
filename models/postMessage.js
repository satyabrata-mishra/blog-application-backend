const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    email:String,
    author: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    locationName: String,
    locationDesp: String,
    location: String,
    imageURL: String,
    peopleLiked: [String],
    likedCount: {
        type: Number,
        default: 0
    },
    comments:[String]
})

module.exports = mongoose.model("BlogWebsitePostSchema", postSchema);