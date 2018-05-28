function hasUserMedia() {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
  window.RTCPeerConnection = window.RTCPeerConnection ||
    window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
  return !!window.RTCPeerConnection;
}

var yourVideo = document.querySelector(''#
    yours ''),
  theirVideo = document.querySelector(''#
    theirs ''),
  yourConnection, theirConnection;
if (hasUserMedia()) {
  navigator.getUserMedia({
    video: true,
    audio: false
  }, function(stream) {
    yourVideo.srcObject = stream;
    // yourVideo.src = window.URL.createObjectURL(stream); //obsolete
    if (hasRTCPeerConnection()) {
      startPeerConnection(stream);
    } else {
      alert("Sorry, your browser does not support WebRTC.");
    }
  }, function(error) {
    alert("Sorry, we failed to capture your camera, pleasetry again.");
  });
} else {
  alert("Sorry, your browser does not support WebRTC.");
}
