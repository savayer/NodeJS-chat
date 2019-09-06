const setup = {port:8000}
const express = require ('express'); 
const path = require('path');
const app = express ();
const WebSocket = require('ws');

let Clients = [];

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {      
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

const wsServer = new WebSocket.Server({port: 8080});

wsServer.on('connection', ws => {  
  Clients.push(ws);
  sendAll(`<small>Количество участников: ${wsServer.clients.size} </small>`);
  ws.on('message', message => {
    wsServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {        
        client.send(message);        
      }
    })
  })

  ws.on('close', () => {
    sendAll(`<small>Количество участников: ${wsServer.clients.size} </small>`);
  })

  ws.send('Welcome to NodeJS Chat');
  ws.send(`<small>Количество участников: ${wsServer.clients.size} </small>`);      
})

function sendAll(message) {
  for (var i=0; i<Clients.length; i++) {
      Clients[i].send(message);
  }
}

app.listen(setup.port, () => {
  console.log('Сервер: порт %s - старт!', setup.port);
});