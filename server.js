const express = require('express');
const path = require('path');
const http = require('http');

const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    // socket for dashboard
    socket.on('join_dashboard', () => {
        console.log('User joined dashboard', socket.id);
        // Join the dashboard room
        socket.join('dashboard');
    });

    // socket for client
    socket.on('client_joined', () => {
        console.log('client joined', socket.id);
        io.to('dashboard').emit('new_client', socket.id);
    });

    // Emit the list of connected clients to the newly connected client
    // const connectedClients = Array.from(io.sockets.sockets.keys());
    // io.emit('client-list', connectedClients);

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        // const updatedClients = Array.from(io.sockets.sockets.keys());
        // socket.broadcast.emit('client-list', updatedClients);
    });
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})