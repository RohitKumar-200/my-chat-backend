const express = require("express");
const router = express.Router();
const Rooms = require("../models/room");
const Users = require("../models/user");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
    const roomId = req.body.roomId;
    const email = req.body.email;
    try {
        const updatedUser = await Users.updateOne(
            { email: email },
            {
                $pull: {
                    rooms: mongoose.Types.ObjectId(roomId),
                },
            }
        );
        const updatedRoom = await Rooms.updateOne(
            { _id: mongoose.Types.ObjectId(roomId) },
            {
                $pull: {
                    users: email,
                },
            }
        );
        res.json({user: updatedUser, room: updatedRoom});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
