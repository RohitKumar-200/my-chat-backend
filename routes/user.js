const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
    try {
        const isUser = await User.findOne({ email: req.body.email });
        let savedUser = "";
        if (isUser) {
            savedUser = await User.updateOne(
                { email: req.body.email },
                req.body
            );
        } else {
            const user = new User(req.body);
            savedUser = await user.save();
        }
        res.send(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
