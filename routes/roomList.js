const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const Rooms = require("../models/room");

router.get("/:email", async (req, res) => {
    try {
        const user = await Users.findOne(
            { email: req.params.email },
            { rooms: 1 }
        );
        if (user.rooms) {
            const roomList = await Promise.all(
                user.rooms.map(async (roomId) => {
                    return await Rooms.findOne({ _id: roomId });
                })
            );
            res.send(roomList);
        } else {
            res.send([]);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
