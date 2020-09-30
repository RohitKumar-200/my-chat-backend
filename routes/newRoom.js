const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const User = require('../models/user');

router.post('/', async (req, res) => {
    try{
        const roomData = {
            name: req.body.name,
            description: req.body.description,
            pic: req.body.pic,
            users: [req.body.userEmail],
        }
        const newRoom = new Room(roomData);
        const savedRoom = await newRoom.save();
        const updatedUser = await User.updateOne({email: req.body.userEmail},{
            $push: {
                rooms: savedRoom._id
            }
        })
        res.json({room: savedRoom, user: updatedUser});
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;