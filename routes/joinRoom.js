const express = require("express");
const router = express.Router();
const Rooms = require("../models/room");
const Users = require("../models/user");

router.post("/", async (req, res) => {
    const roomId = req.body.roomId;
    const email = req.body.email;
    try {
        const updatedUser = await Users.updateOne(
            { email: email },
            {
                $push: {
                    rooms: roomId,
                },
            }
        );
        const updatedRoom = await Rooms.updateOne(
            { _id: roomId },
            {
                $push: {
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
