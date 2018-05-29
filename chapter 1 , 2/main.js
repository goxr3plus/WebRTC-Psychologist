// console.log(hasUserMedia());

function hasUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }


  if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
    navigator.getUserMedia({ video: {
      mandatory: {
        minAspectRatio: 1.777,
        maxAspectRatio: 1.778
      },optional: [
        { maxWidth: 640 },
        { maxHeigth: 480 }
      ]
    }, audio: true }, function
    (stream) {
      var video = document.querySelector('video');
      video.srcObject  = stream;
    }, function (error) {
      console.log("Raised an error when capturing:", error)});
    } else {
      alert("Sorry, your browser does not support getUserMedia.");
    }
