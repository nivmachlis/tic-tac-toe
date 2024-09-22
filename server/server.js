const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const gameRoutes = require("./routes/gameRouter");
const socketHandler = require("./ws/socketHandler");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port = 5000;

app.use(cors());
app.use("/game", gameRoutes); // Use the game routes

// Handle WebSocket connections
socketHandler(io);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
