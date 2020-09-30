const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Pusher = require("pusher");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// App config
const pusher = new Pusher({
    appId: process.env.PUSHER_appId,
    key: process.env.PUSHER_key,
    secret: process.env.PUSHER_secret,
    cluster: "eu",
    encrypted: true,
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB Connected!");

    const messageCollection = db.collection("messages");
    const messageStream = messageCollection.watch();
    messageStream.on("change", (change) => {
        if (change.operationType == "insert") {
            const message = change.fullDocument;
            pusher.trigger("newMessage", message.roomId, message);
        } else {
            console.log(
                "Error on triggering Pusher on message collection",
                err
            );
        }
    });

    const roomCollection = db.collection("rooms");
    const roomStream = roomCollection.watch();
    roomStream.on("change", (change) => {
        pusher.trigger("roomsUpdate", "someUpdate", "");
    });
});

// Routers
const roomList = require("./routes/roomList");
app.use("/roomList", roomList);
const user = require("./routes/user");
app.use("/user", user);
const newRoom = require("./routes/newRoom");
app.use("/newRoom", newRoom);
const newMessage = require("./routes/newMessage");
app.use("/newMessage", newMessage);
const roomMessages = require("./routes/roomMessages");
app.use("/roomMessages", roomMessages);
const roomInfo = require("./routes/roomInfo");
app.use("/roomInfo", roomInfo);

app.get("/", (req, res) => {
    res.send("Hello World");
});

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("server running!"));
