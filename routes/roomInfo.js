const express = require('express');
const router = express.Router();
const Rooms = require('../models/room');

router.get('/:roomId', async (req, res) => {
    try {
        const roomInfo = await Rooms.findOne({_id: req.params.roomId});
        res.send(roomInfo);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;