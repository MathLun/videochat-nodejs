const socket = io('/');
const myPeer = new Peer(undefined, {
	host: '/',
	port: '3001'
});

let displayId = document.getElementById('display-id');
let videoGrid = document.getElementById('video-grid');
let videoScreen = document.createElement('video');

videoScreen.muted = true;

navigator.mediaDevices.getUserMedia({
	video: true,
	audio: true
}).then(stream => {
	addVideoStream(videoScreen, stream);

	// Display Video on Screen
	socket.on('user-connect', (userId) => {
		connectToNewUser(userId, stream);
	});
});

// Open Video p2p 
myPeer.on('open', id => {
	socket.emit('join-room', ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
	const call = myPeer.call(userId, stream);
	const video = document.createElement('video');

	call.on('stream', userVideoStream => {
		addVideoStream(video, userVideoStream);
	});

	call.on('close', () => {
		video.remove();
	});
}

function addVideoStream(video, stream) {
	video.srcObject = stream;
	video.addEventListener('loadermetadata', () => {
		video.play()
	});
	videoGrid.append(video);
}
