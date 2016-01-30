var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
var path = require("path");
var ip = require("ip");

var public_path = '../public';
var filepath = path.join(__dirname, public_path, 'game.html');
var appPort = 80;

var gameWorld = {};

app.use(express.static('../public'));

app.get('/', function(req, res) {
  fs.readFile(filepath, 'utf8', function(err, text) {
    //text = text.replace("SERVERIP", ip.address() + ":" + appPort);
    text = text.replace("SERVERIP", "localhost" + ":" + appPort);
    res.send(text);
  });
});

io.on('connection', function(client) {
  console.log('Connection to client established');
  client.emit('message', gameWorld);

  // Success!  Now listen to messages to be received
  client.on('message', function(data) {
    console.log('Received message from client!', data);
    gameWorld = data;
    console.log(gameWorld);
    //client.broadcast.emit('message', gameWorld);
  });

  client.on('disconnect', function() {
    console.log('Client has disconnected');
  });
});

server.listen(appPort);
