const tcpServer = require('./tcp/app.js');
const tcpListenCallback = require("./tcp/listenCallback.js")
const udpServer = require('./udp/app.js');
const config = require('./config.json');

// Server listen
tcpServer.listen(config.port, () => {
    tcpListenCallback(tcpServer);
});

udpServer.bind(config.port);