/*
simple broadcast websocket server
*/

import express from 'express';
import expressWs from 'express-ws';
import https from 'https';
import fs from 'fs';
import { TLSSocket } from 'tls';
import ws from 'ws';
import path from 'path';

const options = {
  key: fs.readFileSync('/usr/src/app/certs/server.key'),
  cert: fs.readFileSync('/usr/src/app/certs/server.chain'),
  ca: [
    fs.readFileSync('/usr/src/app/certs/signer-ca.crt'),
    fs.readFileSync('/usr/src/app/certs/root-ca.crt'),
  ],
  requestCert: true,
  rejectUnauthorized: true,
};

const eapp = express();

const httpsserver = https.createServer(options, eapp);
const { app } = expressWs(eapp, httpsserver, {
  wsOptions: { maxPayload: 0x200000 },
});

interface tws extends ws {
  id?: string;
}

const connections = new Set<tws>();

// app
app.use('/app', express.static(__dirname + '/dist'));
app.get('/app/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

function keepAlive(ws: ws) {
  setTimeout(() => {
    if (ws.readyState === 1) {
      ws.send('');
    }
    keepAlive(ws);
  }, 3000);
}

// express-ws websocket
app.ws('/ws', function (ws, req) {
  console.log(
    'connect:' + (req.socket as TLSSocket).getPeerCertificate(true).subject.CN
  );

  const tws: tws = ws;
  tws.id = (req.socket as TLSSocket).getPeerCertificate(true).subject.CN;

  connections.add(tws);

  keepAlive(tws);

  ws.on('message', function (msg) {
    // get self ID
    const cid = (req.socket as TLSSocket).getPeerCertificate(true).subject.CN;

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
