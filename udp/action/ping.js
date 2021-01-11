const dgram = require('dgram');

/**
 * 
 * @param {dgram.Socket} socket 
 * @param {Buffer} data 
 * @param {Map<string, string>} info 
 */
module.exports = (socket, data, info) => {
    socket.send("Pong!", info.port, info.address);
}