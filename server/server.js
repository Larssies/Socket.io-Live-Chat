const express = require('express');
const { createServer } = require('http'); 
require('dotenv').config();
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app); 
const io = new Server(server, {
    connectionStateRecovery: {}
});

const port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});  

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  io.emit('hello', 'world'); 

  io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(port, () => {
    console.log(`Live Chat is running on http://localhost:${port}`);
});
