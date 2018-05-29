//console.log("Hello from Node.js fuckeerrrrsss!");

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    port: 8888
  }),
  users = {};



wss.on('connection', function(connection) {
  console.log("User connected");
  connection.on('message', function(message) {
    var data;

    //Parse JSON
    try {
      data = JSON.parse(message);
    } catch (e) {
      console.log("Error parsing JSON");
      data = {};
    }

    //Check data
    switch (data.type) {
      case "login":
        //example : { "type": "login", "name": "Foo2" }
        if (users[data.name]) {
          console.log("User [ " + data.name + " ] is already logged in. ", );
          sendTo(connection, {
            type: "login",
            success: false
          });
        } else {
          users[data.name] = connection;
          connection.name = data.name;
          sendTo(connection, {
            type: "login",
            success: true
          });
          console.log("New User : [ " + data.name + " ] just logged in. ");
        }

        break;
      case "offer":
        // example : { "type": "offer", "name": "Foo2" , "offer":"hello" }
        console.log("Sending offer to : ", data.name);
        var conn = users[data.name];

        if (conn != null) {
          connection.otherName = data.name;
          sendTo(conn, {
            type: "offer",
            offer: data.offer,
            name: connection.name
          });
        }

        break;
      case "answer":
        // example : { "type": "answer", "name": "Foo2" , "answer":"hello to you too bruda" }
        console.log("Sending answer to : ", data.name);
        var conn = users[data.name];

        if (conn != null) {
          connection.otherName = data.name;
          sendTo(conn, {
            type: "answer",
            answer: data.answer
          });
        }

        break;
      case "candidate":
        //example :
        console.log("Sending candidate to", data.name);
        var conn = users[data.name];

        if (conn != null) {
          sendTo(conn, {
            type: "candidate",
            candidate: data.candidate
          });
        }
        break;
      case "leave":
        //example :
        console.log("Disconnecting user from", data.name);
        var conn = users[data.name];
        conn.otherName = null;

        if (conn != null) {
          sendTo(conn, {
            type: "leave"
          });
        }

        break;
      default:
        sendTo(connection, {
          type: "error",
          message: "Unrecognized command: " + data.type
        });

        break;
    }
    console.log("Got message: ", data);
  });

  //connection.send('Hello World');
  connection.on('close',
    function() {
      if (connection.name) {
        delete users[connection.name];

        console.log("Disconnecting user from : ",
          connection.otherName);
        var conn = users[connection.otherName];
        conn.otherName = null;
        if (conn != null) {
          sendTo(conn, {
            type: "leave"
          });
        }
      }
    }
  });
});

function sendTo(conn, message) {
  conn.send(JSON.stringify(message));
}

wss.on('listening', function() {
  console.log("Server started...");
});
