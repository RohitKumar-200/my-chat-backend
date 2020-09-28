const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Messages = require("../models/message");

router.get("/:roomId", async (req, res) => {
    try {
        const roomId = mongoose.Types.ObjectId(req.params.roomId);
        const messageList = await Messages.find({ roomId: roomId });
        res.send(messageList);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
