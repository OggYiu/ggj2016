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

var gameWorld = {
  "players":[],
  "monsters":[]
};

app.use(express.static('../public'));

app.get('/', function(req, res) {
  fs.readFile(filepath, 'utf8', function(err, text) {
    //text = text.replace("SERVERIP", ip.address() + ":" + appPort);
    text = text.replace("SERVERIP", "localhost" + ":" + appPort);
    res.send(text);
  });
});

function createPlayer(client)
{
  var player = {"id":gameWorld.players.length + 1, "posX":400, "posY":500, "status":'ALIVE'};
  client.emit('new_player', player);
  for (var i = 0; i < gameWorld.players.length; ++i)
  {
    client.emit('new_remote_player', gameWorld.players[i]);
  }
  client.broadcast.emit('new_remote_player', player);
  gameWorld.players.push(player);
}

function createMonster(client)
{
  var monster = {"id":gameWorld.monsters.length + 1, "posX":10, "posY":10, "status":'ALIVE'};
  client.emit('new_monster', monster);
  gameWorld.monsters.push(monster);
}

function createRemoteMonster(client)
{
  for (var i = 0; i < gameWorld.monsters.length; ++i)
  {
    client.emit('new_remote_monster', gameWorld.monsters[i]);
  }
}

io.on('connection', function(client) {

  console.log('Connection to client established');
  createPlayer(client);

  if (gameWorld.players.length == 1)
  {
    createMonster(client);
  }
  else
  {
    createRemoteMonster(client);
  }

  client.on('update_player', function(player) {
    for (var i = 0; i < gameWorld.players.length; ++i)
    {
      if (gameWorld.players[i].id == player.id)
      {
        gameWorld.players[i].posX = player.posX;
        gameWorld.players[i].posY = player.posY;
      }
    }
    client.broadcast.emit('update_player', player);
  });

  client.on('disconnect', function() {
    console.log('Client has disconnected');
  });
});

server.listen(appPort);
