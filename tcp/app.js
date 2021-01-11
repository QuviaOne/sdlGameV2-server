const net = require('net');

module.exports = net.createServer(require('./on/socket.js'));
module.exports.on("error", require("./on/error.js"));