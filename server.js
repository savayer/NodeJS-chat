const setup = {
  ssl: true,
  port: 8000
}
const express = require ('express'); 
const app = express();
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const definedServerProtocol = setup.ssl ? require('https') : require('http');
let server;

/**
 * Server implementation
 */

if (setup.ssl) {
  const privateKey  = fs.readFileSync('/etc/letsencrypt/live/chat.savayer.me/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/chat.savayer.me/fullchain.pem', 'utf8');
  const credentials = {key: privateKey, cert: certificate};
  server = definedServerProtocol.createServer(credentials, app);
} else {
  server = definedServerProtocol.createServer(app);  
}

let Clients = [];

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {      
  res.sendFile(path.join(__dirname+'/public/index.html'));
});


server.listen(setup.port, () => {
  console.log("server starting on port: %s", setup.port)
});

/**
 * WebSocket implementation
 */

const sendAll = require('./modules/notifyAllClients');

const wsServer = new WebSocket.Server({
  server: server
});
let data = {};

wsServer.on('connection', ws => {  
  Clients.push(ws);
  data.type = 'statistic';  
  data.message = `<small>Количество участников: ${wsServer.clients.size} </small>`;
  sendAll(data, Clients);
  ws.on('message', data => {
    wsServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);        
      }
    })
  })

  ws.on('close', () => {
    data.type = 'statistic';    
    data.message = `<small>Количество участников: ${wsServer.clients.size} </small>`;
    sendAll(data, Clients);
  })

  data = {
    type: 'message',
    name: 'System',
    message: 'Welcome to NodeJS Chat'
  }
  ws.send(JSON.stringify(data));  
})