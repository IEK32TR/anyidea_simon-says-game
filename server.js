const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let minscore = 7;
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

app.get('/leaderboard-t', (req, res) => {
    leaderboard.push({username: "Furkan", score: 16 });
    leaderboard.push({username: "İsmet", score: 8 });
    leaderboard.push({username: "Enes", score: 8 });
    res.redirect("/leaderboard");
});

app.get('/leaderboard-r', (req, res) => {
    leaderboard = [];
    res.redirect("/leaderboard");
});

app.get('/leaderboard-min/:id', (req, res) => {
    minscore = req.params.id;
    res.redirect("/leaderboard");
});

// Save score API
app.post('/save-score', (req, res) => {
    const { username, score } = req.body;
    leaderboard.push({ username, score });
    res.status(200).send();
});

// API to fetch leaderboard data
app.get('/leaderboard-data', (req, res) => {
    res.json(leaderboard.filter(item => item.score > minscore).sort((a, b) => b.score - a.score));
});

server.listen(8083, () => {
    console.log('Server running at http://localhost:8083');
});
