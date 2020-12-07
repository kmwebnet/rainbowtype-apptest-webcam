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
    // recieve message and routing
    ws.on('message', function (msg) {
        // get self ID
        const cid = req.socket.getPeerCertificate(true).subject.CN;
        if (cid.slice(0, 4) === '0123' && cid.length === 18) {
            // send message except me (non JSON data)
            connections.forEach(function (client) {
                var _a, _b;
                if (client.id !== cid &&
                    ((_a = client.id) === null || _a === void 0 ? void 0 : _a.slice(0, 4)) !== '0123' &&
                    ((_b = client.id) === null || _b === void 0 ? void 0 : _b.length) !== 18) {
                    // console.log(cid + ' sent to ' + client.id + ' message: ' + msg);
                    //client.send(msg + cid);
                    const rdata = new Uint8Array(Buffer.from(msg));
                    const smsg = new ArrayBuffer(rdata.byteLength + 18);
                    const sdata = new Uint8Array(smsg);
                    for (let i = 0; i < rdata.byteLength; i++) {
                        sdata[i] = rdata[i];
                    }
                    for (let i = 0; i < 18; i++) {
                        sdata[rdata.byteLength + i] = cid.charCodeAt(i);
                    }
                    client.send(smsg);
                }
            });
        }
    });
    ws.on('close', () => {
        // The closed connection is removed from the set
        console.log(tws.id + ' connection close');
        connections.delete(tws);
    });
});
// run server
httpsserver.listen(5000, () => console.log('Listening on port 5000'));
