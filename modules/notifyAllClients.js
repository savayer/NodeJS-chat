const sendAll = (data, clients) => {
    for (let client in clients) {
        clients[client].send(JSON.stringify(data));
    }    
}

module.exports = sendAll;