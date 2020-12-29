const socket = io('/');
const videogrid = document.getElementById('video-grid');
const mypeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});
const myVideo = document.createElement('video');
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio:true
}).then(stream => {
    addvideostream(myVideo, stream)
    mypeer.on('call', call => {
        call.answer(stream)
    });
    mypeer.on('stream', Newuser => {
        const video = document.createElement('video');
        addvideostream(video, Newuser)
    })
    socket.on('user-connected', userId => {
        Newuser(userId, stream);
    })
})
mypeer.on('open', id => {
socket.emit('join-room', ROOM_ID, 10);
    
})
// Name = prompt("What Is Your Name");
socket.on('user-connected', userId => {
    console.log('User-Connected' + userId);
});
function Newuser(userId, stream) {
    const call = mypeer.call(userId, stream);
    const video = document.createElement('video');

    call.on('stream', uservideo => {
        addvideostream(video , uservideo)
    });
    call.on('close', () => {
        video.remove();
 })
} 
function addvideostream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    });
    videogrid.append(video);
}