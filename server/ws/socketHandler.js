const { game, resetGame, makeMove } = require("../services/gameService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Send the initial game state to the client
    socket.emit("gameState", game);

    socket.on("makeMove", (index) => {
      const result = makeMove(index);
      if (result.error) {
        socket.emit("errorMessage", result.error);
      } else {
        io.emit("gameState", result.game);
        if (result.winner) {
          io.emit("gameOver", { winner: result.winner });
        }
      }
    });

    socket.on("resetGame", () => {
      resetGame();
      io.emit("gameState", game);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
