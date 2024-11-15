const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store leaderboard data in memory (could be replaced with a database)
let leaderboard = [];

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Parse JSON request bodies
app.use(express.json());

// Serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

// Serve leaderboard page
app.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'leaderboard.html'));
});

// Save score when a user finishes the game
app.post('/save-score', (req, res) => {
    const { username, score } = req.body;
    if (score >= 4) { // You can change the condition based on your game rules
        leaderboard.push({ username, score });
        leaderboard.sort((a, b) => b.score - a.score); // Sort leaderboard by score (highest first)
    }
    res.status(200).send();
});

// Fetch leaderboard data
app.get('/leaderboard-data', (req, res) => {
    res.json(leaderboard);
});

server.listen(8082, () => {
    console.log('Server running at http://localhost:8082');
});
