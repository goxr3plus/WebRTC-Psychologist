console.log("Hello from Node.js fuckeerrrrsss!");

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    port: 8888
  }),
  users = {};

wss.on('connection',
  function(connection) {
    console.log("User connected");
    connection.on('message',
      function(message) {

        var data;
        try {
          data = JSON.parse(message);
        } catch (e) {
          console.log(""
            Error parsing JSON "");
          data = {};
        }

        //console.log("Got message: ", message);
      });
    connection.send('Hello World');
  });
