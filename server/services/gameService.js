let game = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: false,
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      game.winner = true;
      return squares[a];
    }
  }

  const isDraw = game.board.every((cell) => cell !== null); // Check for draw

  return isDraw ? "Draw" : null;
};

const resetGame = () => {
  Object.assign(game, {
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: false,
  });
};

const makeMove = (index) => {
  if (game.board[index] || game.winner) {
    return { error: "Invalid move. Please try again." };
  }

  game.board[index] = game.currentPlayer;
  game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";

  const winner = calculateWinner(game.board);

  return { game, winner };
};

module.exports = {
  game,
  calculateWinner,
  resetGame,
  makeMove,
};
