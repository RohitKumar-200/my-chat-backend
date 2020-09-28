const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    pic: String,
    rooms: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("Users", UserSchema);
