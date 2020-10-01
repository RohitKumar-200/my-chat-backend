const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const joinRoom = require("./joinRoom");

router.post("/", async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await Users.findOne({email: email});
        if(user) {
            next();
        } else {
            res.status(404).send("User does not exist");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.use("/", joinRoom);

module.exports = router;
