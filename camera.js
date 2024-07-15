// const { Notification } = require("electron");

var video = document.getElementById('camera');
const captureButton = document.getElementById("capture-image");
const imageTag = document.getElementById('image')

video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = '300px';
video.style.height = '300px';

/* Setting up the constraint */
// var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
var constraints = {
  audio: false,
  video: true
};

navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
    // console.log(stream);
    video.srcObject = stream;
});

console.log(window.electronAPI);

captureButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");

    // scale the canvas accordingly
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // draw the video at that frame
    canvas.getContext('2d')
    .drawImage(video, 0, 0, canvas.width, canvas.height);
    // convert it to a usable data URL
    const dataURL = canvas.toDataURL();
    // imageTag.src = dataURL;
    window.electronAPI.sendImage(dataURL)

    // console.log(dataURL);

    new Notification("image Captured", {
      body: "Image is successfully captured from live video"
    })
})