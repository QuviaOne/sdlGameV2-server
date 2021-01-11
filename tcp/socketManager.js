const net = require('net')
const fs = require('fs')
const path = require('path')

/**
 * @extends {Array<net.Socket>}
 */
class SocketManager extends Array {
    constructor() {
        super();
    }
    /**
     * 
     * @param {net.Socket} socket 
     */
    add(socket) {
        this.push(socket);
        socket.on("end", () => {
            this.remove(socket);
            console.log("Socket from " + socket.remoteAddress + " ended.");
        })
        socket.on("data", (data) => {
            try {
                var d = JSON.parse(data.toString());
            } catch (e) {
                console.log("TCP socket body not JSON.");
                socket.write("Body not supported. Please use a JSON formatted body.");
                socket.end("TCP write not supported.");
                return;
            }
            if (!fs.existsSync(path.join(__dirname, "./action/" + d.id + ".js"))) {
                console.log("TCP action not found. Action id: " + d.id);
            }
            require(path.join(__dirname, "./action/" + d.id + ".js"))(socket, d);
        });
        socket.on("error", () => {
            console.log("TCP Socket error.");
        });
    }
    remove(socket) {
        this.splice(this.indexOf(socket), 1);
    }
}
module.exports = new SocketManager();