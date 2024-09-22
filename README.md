# Real-time Tic-tac-toe Game

This project implements a real-time Tic-tac-toe game using Express.js for the backend and React for the frontend. The game allows two players to play against each other in real-time using WebSockets.

## Project Structure

The project is divided into two main parts:

1. Backend (Express.js)
2. Frontend (React)

### Backend

The backend is responsible for:

- Managing game state
- Handling player moves
- Checking for win conditions
- Broadcasting game updates to connected clients

### Frontend

The frontend is responsible for:

- Displaying the game board
- Handling user input
- Communicating with the server via WebSocket

## Game Logic

The game logic is implemented on the server-side to ensure fairness and prevent cheating. Here's a breakdown of the main components:

1. Game State: Each game is represented by an object containing the current board state, connected players, and the current player's turn.

2. Player Moves: When a player makes a move, the frontend sends the move to the server. The server validates the move, updates the game state, and broadcasts the new state to all connected players.

3. Win Condition: After each move, the server checks for a win condition by examining all possible winning combinations (rows, columns, and diagonals). If a win is detected, the game ends, and the result is broadcast to all players.

4. Draw Condition: If all cells are filled and no winner is found, the game is declared a draw.

## How to Run the Game

### Backend

1. Navigate to the server directory:

   ```
   cd server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:
   ```
   node server.js
   ```

The server will start running on `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

The frontend will be accessible at `http://localhost:3000`.

## How to Play

1. Open the game in two different browser windows or tabs.
2. In each window, enter the same game ID and click "Join Game".
3. The first player to join will be "X", and the second player will be "O".
4. Players take turns clicking on empty cells to make their moves.
5. The game will automatically detect wins or draws and display the result.

## Technologies Used

- Server: Node.js, Express.js, Socket.io
- Frontend: React, Socket.io-client

Enjoy playing Tic-tac-toe!
