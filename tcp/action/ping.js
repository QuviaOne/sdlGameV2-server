const net = require('net');

/**
 * 
 * @param {net.Socket} socket 
 */
module.exports = socket => {
    socket.write("AHHHHHHHHHHHHH");
    socket.end("Pong!");
}