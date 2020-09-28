const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    text: String,
    authorName: String,
    authorEmail: String,
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Messages', MessageSchema);