const dgram = require('dgram');
const fs = require('fs');
const path = require('path');

module.exports = dgram.createSocket("udp4");

module.exports.on("error", require("./on/error.js"));
module.exports.on("listening", () => {
    require("./on/listening.js")(module.exports);
});
module.exports.on("message", (data, info) => {
    console.log("MSG here.")
    try {
        var d = JSON.parse(data.toString());
    } catch (e) {
        console.log("Non JOSN UDP message recieved.");
        module.exports.send("Please use a JSON body.", info.port, info.address);
        return;
    }
    if (!fs.existsSync(path.join(__dirname, "./action/" + d.id + ".js"))) {
        console.log("Action not found ", d.id + ". From port", info.port, "at", info.address);
        return;
    }
    require(path.join(__dirname, "./action/" + d.id + ".js"))(module.exports, data, info);
});