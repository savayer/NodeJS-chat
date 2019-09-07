const ws = new WebSocket('ws://chat.savayer.me:8080');

const $connection = document.getElementById('connection');
const $chat = document.querySelector('.chat');
const $send = document.querySelector('.send');
const $message = document.querySelector('.message');

const $dzinButton = document.getElementById('dzinButton');
const dzin = new Audio('notify.mp3');

const $clientsAmount = document.querySelector('.clients');

const $overlay = document.querySelector('.overlay-popup');
const $popupInput = document.querySelector('.popup__input');
const $popupButton = document.querySelector('.popup__button');

let data = {
    type: 'message',
    name: '',
    message: ''
};

setTimeout(() => {
    $overlay.classList.add('active');
}, 500)

$popupButton.addEventListener('click', () => {
    if ($popupInput.value.trim() == '') {
        alert('Type your name');
        return false;
    }

    data.name = $popupInput.value;
    $overlay.classList.remove('active');
    $message.focus();
})

$popupInput.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        $popupButton.click();
    }
})

$dzinButton.addEventListener('click', function() {
    const prom = dzin.play()
    if (prom !== undefined) {
        prom.then(_ => {
            // Autoplay started!
        }).catch(error => {
            console.log('sound error', error)
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
})

function setStatus(value) {
    $connection.innerHTML = value;
}

function addMessage(stringifiedData) {
    const data = JSON.parse(stringifiedData);    

    if (data.type === 'statistic') {
        $clientsAmount.innerHTML = data.message;
        return false;
    }
    const $li = document.createElement('li');
    const $username = document.createElement('span');
    const $message = document.createElement('div');
    
    $username.classList.add('chat__username');
    $username.innerHTML = data.name

    $message.classList.add('chat__message');
    $message.innerHTML = data.message;

    $li.appendChild($username);
    $li.appendChild($message);
    $chat.appendChild($li);

    $dzinButton.click();
    $chat.scrollTop = $chat.scrollHeight - $chat.clientHeight;
}

$send.addEventListener('click', () => {
    if ($message.value.trim() == '') {
        alert('Message should not be empty');
        return false;
    }
    if (data.name.trim() === '') {
        alert('You should have entered your name. Try again.');
        $popupInput.focus();
        $overlay.classList.add('active');
        return false;
    }
    data.type = 'message';
    data.message = $message.value;
    ws.send(JSON.stringify(data));
    $message.value = '';
    
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
    alert('Server error');
    /* console.log(error);
    console.log('error - ' + error.message); */
};
