const express = require("express");
const router = express.Router();
const Rooms = require("../models/room");
const Users = require("../models/user");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
    const roomId = req.body.roomId;
    const email = req.body.email;
    try {
        if(!roomId.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(404).send("Invalid Invitation code");
        } else {
            const validRoom = await Rooms.findOne({_id: roomId});
            if(!validRoom) {
                res.status(404).send("Invalid Invitation code");
            } else {
                const updatedUser = await Users.updateOne(
                    { email: email },
                    {
                        $push: {
                            rooms: mongoose.Types.ObjectId(roomId),
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
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
