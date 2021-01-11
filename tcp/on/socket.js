const net = require('net')
const socketManager = require('../socketManager.js');

/**
 * 
 * @param {net.Socket} socket 
 */
module.exports = (socket) => {
    socketManager.add(socket);
}