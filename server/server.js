const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

// Initiate an express server
const app = express();

// Initiate an http server
const server = http.createServer(app);

// Web socket server (can emit and listen to events)
const io = socketIO(server);

app.use(express.static(publicPath));

// Listen for a built-in 'connection' event
io.on('connection', socket => {
  console.log('New user connected');
  // Listen for a built-in 'disconnect' event
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is up on port ${port}`));
