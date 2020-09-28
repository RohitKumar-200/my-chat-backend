const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Messages = require("../models/message");
const Rooms = require("../models/room");

router.post("/", async (req, res) => {
    try {
        const newMessage = new Messages(req.body);
        const savedMessage = await newMessage.save();
        const updatedRoom = await Rooms.updateOne(
            { _id: mongoose.Types.ObjectId(req.body.roomId) },
            { lastMessage: req.body.text }
        );
        res.json({message: savedMessage, room: updatedRoom});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
