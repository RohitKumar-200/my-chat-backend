const { Timestamp } = require("bson");
const { time } = require("console");
const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
    name: String,
    description: String,
    pic: String,
    lastMessage: {
        type: String,
        default: "",
    },
    lastTimestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Rooms", RoomSchema);
