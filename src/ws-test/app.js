const socket = io('ws://localhost:3000');

socket.on('msgFromServerToClient', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('msgFromClientToServer', text)
}