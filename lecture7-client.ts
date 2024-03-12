//CLIENT SIDE FOR LECTURE 7

import {io} from 'socket.io-client';

const url = 'ws://localhost:9000'; // URL of the server

const socketClient = io(url); // Create a new socket client

socketClient.connect(); // Connect to the server

socketClient.send('Hello world'); // Send a message to the server


socketClient.on('message', (msg) => {
    console.log("Server says: ", msg); // Log the message received from the server
});

setTimeout(() => {
    socketClient.emit('question',"Whats up?") //emit is used to send a message to the server. The first argument is the event name and the second argument is the message
}, 3000);

//server emits an answer event, this handler will be called
socketClient.on('answer', (msg) => {
    console.log("Answer from Server says: ", msg); // Log the message received from the server
});

// Socket disconnection event
setTimeout(() => {
    socketClient.close() // Close the connection to the server
},2000);