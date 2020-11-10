"use strict";
/*
simple broadcast websocket server
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const options = {
    key: fs_1.default.readFileSync('/usr/src/app/certs/server.key'),
    cert: fs_1.default.readFileSync('/usr/src/app/certs/server.chain'),
    ca: [
        fs_1.default.readFileSync('/usr/src/app/certs/signer-ca.crt'),
        fs_1.default.readFileSync('/usr/src/app/certs/root-ca.crt'),
    ],
    requestCert: true,
    rejectUnauthorized: true,
};
const eapp = express_1.default();
const httpsserver = https_1.default.createServer(options, eapp);
const { app } = express_ws_1.default(eapp, httpsserver, {
    wsOptions: { maxPayload: 0x200000 },
});
const connections = new Set();
// app
app.use('/app', express_1.default.static(__dirname + '/dist'));
app.get('/app/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
function keepAlive(ws) {
    setTimeout(() => {
        if (ws.readyState === 1) {
            ws.send('');
        }
        keepAlive(ws);
    }, 3000);
}
// express-ws websocket
app.ws('/ws', function (ws, req) {
    console.log('connect:' + req.socket.getPeerCertificate(true).subject.CN);
    const tws = ws;
    tws.id = req.socket.getPeerCertificate(true).subject.CN;
    connections.add(tws);
    keepAlive(tws);
    console.log('connections:' + connections.size);
    ws.on('message', function (msg) {
        // get self ID
        const cid = req.socket.getPeerCertificate(true).subject.CN;
        // send message except me (non JSON data)
        connections.forEach(function (client) {
            if (client.id !== cid) {
                // console.log(cid + ' sent to ' + client.id + ' message: ' + msg);
                client.send(msg);
            }
        });
    });
    ws.on('close', () => {
        // The closed connection is removed from the set
        console.log(tws.id + ' connection close');
        connections.delete(tws);
    });
});
// run server
httpsserver.listen(5000, () => console.log('Listening on port 5000'));
