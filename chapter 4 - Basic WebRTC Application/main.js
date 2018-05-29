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

//Check if user media is supported
if (hasUserMedia()) {
  navigator.getUserMedia({
    video: true,
    audio: false
  }, function(stream) {
    yourVideo.srcObject = stream;
    //Check if RTCPeerConnection is supported
    if (hasRTCPeerConnection()) {
      startPeerConnection(stream);
    } else {
      alert("Sorry, your browser does not support WebRTC.");
    }
  }, function(error) {
    alert("Sorry, we failed to capture your camera, please try again.");
  });
} else {
  alert("Sorry, your browser does not support WebRTC.");
}

//Start Peer Connection
function startPeerConnection(stream) {
  var configuration = {
    // Uncomment this code to add custom iceServers
    //"iceServers": [{ "url": "stun:stun.1.google.com:19302" }]"
  }]
};
yourConnection = new webkitRTCPeerConnection(configuration);
theirConnection = new webkitRTCPeerConnection(configuration);
};
