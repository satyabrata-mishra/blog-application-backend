const router = require('express').Router();
const PostMessage = require('../models/postMessage');

// Create A Post
router.post("/createpost", async (req, res) => {
    try {
        const post = await PostMessage.create(req.body);
        res.status(200).json(post);

    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Like a post
router.post("/likepost/:id", async (req, res) => {
    try {
        const { email } = req.body;
        const { peopleLiked, likedCount } = await PostMessage.findOne({ _id: req.params.id });
        const userAlreadyPresent = peopleLiked.indexOf(email);
        if (userAlreadyPresent !== -1) {
            // Delete the user
            const userIndex = peopleLiked.findIndex(({ e }) => e === email);
            peopleLiked.splice(userIndex, 1);
            const user = await PostMessage.findOneAndUpdate({ _id: req.params.id }, {
                peopleLiked: peopleLiked,
                likedCount: likedCount - 1
            }, { new: true });
            res.status(200).json(user);
        } else {
            //Add The User
            const user = await PostMessage.findOneAndUpdate({ _id: req.params.id }, {
                peopleLiked: [...peopleLiked, email],
                likedCount: likedCount + 1
            }, { new: true });
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Delete A Post
router.delete("/deleteapost/:id", async (req, res) => {
    try {
        const user = await PostMessage.findOneAndDelete({ _id: req.params.id })
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

// Edit a post
router.patch("/editapost/:id", async (req, res) => {
    try {
        const user = await PostMessage.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});


// Get All Post
router.get("/getallposts", async (req, res) => {
    try {
        const post = await PostMessage.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Get a post
router.post("/getsinglepost", async (req, res) => {
    try {
        const post = await PostMessage.findById(req.body.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//Add a comment
router.post("/addcomment", async (req, res) => {
    try {
        const { comments } = await PostMessage.findById(req.body.id);
        const post = await PostMessage.findByIdAndUpdate(req.body.id, { comments: [...comments, req.body.name, req.body.comment] });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error.message);
    }
});


module.exports = router;