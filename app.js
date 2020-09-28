const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Routers
const roomList = require("./routes/roomList");
app.use("/roomList", roomList);
const user = require("./routes/user");
app.use("/user", user);
const newRoom = require("./routes/newRoom");
app.use("/newRoom", newRoom);
const newMessage = require("./routes/newMessage");
app.use("/newMessage", newMessage);
const roomMessages = require("./routes/roomMessages")
app.use("/roomMessages", roomMessages);

app.get("/", (req, res) => {
    res.send("Hello World");
});

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("DB connected!");
    }
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("server running!"));
