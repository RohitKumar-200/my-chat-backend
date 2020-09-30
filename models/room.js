const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
    name: String,
    description: String,
    pic: String,
    users: Array,
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
