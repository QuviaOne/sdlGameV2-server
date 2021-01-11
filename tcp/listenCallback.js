const net = require('net')
/**
 * 
 * @param {net.Server} server 
 */
module.exports = server => {
    console.log("TCP server started. Server port: " + server.address().port);
}