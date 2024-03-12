/* SOCKET PROGRAMMING 

    - Socket programming is a way of connecting two nodes on a network to communicate with each other.
    -We use socket.io library to create a socket server and client.

    npm install -g socket.io
    npm install -g socket.io-client
    npm install typescript @types/socket.io
    npm install -g http


*/

import {Server} from 'socket.io'; // Import the Server class from the socket.io library
import http from 'http'; // Import the http module

const server = http.createServer(); // Create a new http server
const io = new Server(server); // Create a new instance of the Server class

const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Socket connection event
// This event is fired when a new client connects to the server
//Each client gets their own socket object
//so if 10 clients connect, there will be 10 socket objects via this
io.on('connection', (socket) => {
    console.log("A new client connected: ", socket.id); // Log the id of the new client. ID is a unique identifier for each client

    //if u send a message on client end this handler will be called
    socket.on('message', (msg) => { 
        console.log(msg, " from client: ", socket.id); // Log the message and the id of the client who sent the message
        socket.send('Hello from server'); // Send a message back to the client
    });
    
    socket.on('question', (msg) => {  //client does a question emit, this handler will be called
        console.log("Question: ",msg, " from client: ", socket.id); // Log the message and the id of the client who sent the message
        // socket.send('YOO'); // Send a message back to the client
        socket.emit('answer', "AYOO"); // Send a message back to the client

        //in case we want to broadcast to all clients we use socket.broadcast.emit
        // socket.broadcast.emit('answer', "AYOO"); // Send a message back to all connected clients

    });

    // Socket disconnection event
    socket.on('disconnect', () => {
        console.log("Client disconnected: ", socket.id); // Log the id of the client who disconnected
    });
})