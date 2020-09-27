const http = require('http');
const { app } = require('./app');

const port = process.env.SERVER_PORT || 4040;
const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
	socket.on('join-room', (roomId, userId) => {
		socket.join(roomId);
		socket.to(roomId).broadcast.emit('user-connect', userId);
	});
});

server.listen(port);
