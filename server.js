const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let leaderboard = [];  // Store leaderboard data in memory

app.use(express.static(path.join(__dirname)));
app.use(express.json()); // For parsing JSON request bodies

// Serve game and leaderboard pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

app.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'leaderboard.html'));
});

// Save score API
app.post('/save-score', (req, res) => {
    const { username, score } = req.body;
    if (score >= 2) { // Modify this rule if needed
        leaderboard.push({ username, score });
        leaderboard.sort((a, b) => b.score - a.score); // Sort leaderboard
    }
    res.status(200).send();
});

// API to fetch leaderboard data
app.get('/leaderboard-data', (req, res) => {
    res.json(leaderboard);
});

server.listen(8082, () => {
    console.log('Server running at http://localhost:8082');
});
