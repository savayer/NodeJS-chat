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
let data = {};

wsServer.on('connection', ws => {  
  Clients.push(ws);
  data.type = 'statistic';  
  data.message = `<small>Количество участников: ${wsServer.clients.size} </small>`;
  sendAll(data);
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
    sendAll(data);
  })

  data = {
    type: 'message',
    name: 'System',
    message: 'Welcome to NodeJS Chat'
  }

  ws.send(JSON.stringify(data));  
})

function sendAll(data) {
  for (var i=0; i<Clients.length; i++) {
      Clients[i].send(JSON.stringify(data));
  }
}

app.listen(setup.port, () => {
  console.log('Сервер: порт %s - старт!', setup.port);
});