import React, { useState, useEffect } from "react";
import "./index.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [game, setGame] = useState({
    board: Array(9).fill(null),
    currentPlayer: "X",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [playerTurn, setPlayerTurn] = useState("Player A");

  useEffect(() => {
    socket.on("gameState", (gameState) => {
      setGame(gameState);
      setPlayerTurn(gameState.currentPlayer === "X" ? "Player A" : "Player B");
      setErrorMessage("");
    });

    socket.on("gameOver", ({ winner }) => {
      if (winner === "Draw") {
        setErrorMessage("It's a draw!");
      }
      setErrorMessage(`Player ${winner} wins!`);
    });

    socket.on("errorMessage", (message) => {
      setErrorMessage(message);
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error.message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("gameState");
      socket.off("gameOver");
      socket.off("errorMessage");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  const makeMove = (index) => {
    socket.emit("makeMove", index);
  };

  const resetGame = () => {
    socket.emit("resetGame");
  };

  return (
    <div className="app-container">
      <h1>Welcome to Tic Tac Toe Game</h1>
      <div>
        <div className="board">
          {game.board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cell ? "filled" : ""}`}
              onClick={() => makeMove(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        <p className="current-player">
          {errorMessage ? errorMessage : `Current Player: ${playerTurn}`}
        </p>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default App;
