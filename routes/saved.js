const router = require("express").Router();
const SavedPosts = require("../models/postSaved");

// Check whether the user is present in the database or not?
router.post("/user", async (req, res) => {
    try {
        if (req.body.email == "") {
            return res.status(400).json("Email cannot be empty");
        }
        const user = await SavedPosts.create({ "email": req.body.email, "posts": [] });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ "error": error.message });
    }
});

// Get all posts of a specific email
router.get("/get/:email", async (req, res) => {
    try {
        if (req.body.email == "") {
            return res.status(400).send("Email cannot be empty.");
        }
        const { posts } = await SavedPosts.findOne({ "email": req.params.email });
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Add to saved array
router.patch("/addtosaved", async (req, res) => {
    try {
        const { email, post } = req.body;
        var { posts } = await SavedPosts.findOne({ "email": email });
        if (posts.indexOf(post) == -1) {
            var updatedUser = await SavedPosts.findOneAndUpdate({ "email": email }, { "posts": [...posts, post] }, { new: true, runValidators: true });
        }
        else {
            posts.splice(posts.indexOf(post), 1);
            var updatedUser = await SavedPosts.findOneAndUpdate({ "email": email }, { "posts": [...posts] }, { new: true, runValidators: true });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json(err.message);
    }
});


module.exports = router;