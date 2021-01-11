const dgram = require('dgram');

module.exports = dgram.createSocket("udp4");

module.exports.on("error", require("./on/error.js"));
module.exports.on("listening", () => {
    require("./on/listening.js")(module.exports);
});