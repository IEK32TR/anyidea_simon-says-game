const express = require('express');
const path = require('path');
const http = require('http'); // Required for creating server
const { Server } = require('socket.io'); // Import Server from socket.io
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Example Socket.IO setup (only if you need real-time communication)
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

server.listen(8082, () => {
    console.log('Server running at http://localhost:8082');
});
