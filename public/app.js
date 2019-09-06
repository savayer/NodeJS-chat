const ws = new WebSocket('ws://node.savayer.localhost:8080');

const $connection = document.getElementById('connection');
const $chat = document.querySelector('.chat');
const $send = document.querySelector('.send');
const $message = document.querySelector('.message');

const $dzinButton = document.getElementById('dzinButton');
const dzin = new Audio('notify.mp3');

const $clientsAmount = document.querySelector('.clients');
$dzinButton.addEventListener('click', function() {
    var prom = dzin.play()
    if (prom !== undefined) {
        prom.then(_ => {
            // Autoplay started!
        }).catch(error => {
            console.log(error)
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
})

function setStatus(value) {
    $connection.innerHTML = value;
}

function addMessage(message) {
    if (message.includes('<small>')) {
        $clientsAmount.innerHTML = message;
        return false;
    }
    const $li = document.createElement('li');

    $li.innerHTML = message;

    $chat.appendChild($li);
    $dzinButton.click();
    console.log(ws)
}

$send.addEventListener('click', e => {
    if ($message.value.trim() == '') {
        alert('Message should not be empty');
        return false;
    }

    ws.send($message.value);
    $message.value = '';
    $chat.scrollTop = $chat.scrollHeight - $chat.clientHeight;
})

$message.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        $send.click();
    }
})

ws.onopen = () => setStatus('Online');

ws.onclose = (event) => {
    if (event.wasClean) {
        setStatus('Offline');
    } else {
        setStatus('Disconnected');
    }
}

ws.onmessage = event => {
    addMessage(event.data);
};

ws.onerror = error => {
    console.log(error);
    console.log('error - ' + error.message);
};