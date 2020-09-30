const express = require("express");
const router = express.Router();
const Messages = require("../models/message");

router.delete("/:roomId", async (req, res) => {
    try {
        const deletedMessages = await Messages.deleteMany({
            roomId: req.params.roomId,
        });
        res.send(deletedMessages);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
