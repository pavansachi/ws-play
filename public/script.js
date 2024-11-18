const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('client-list', (clients) => {
    console.log(clients);
    document.getElementById('client-list').innerHTML = '';
    clients.forEach(client => {
        const li = document.createElement('li');
        li.textContent = client;
        document.getElementById('client-list').appendChild(li);
    });
})
