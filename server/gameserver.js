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
  "monsters":[],
  "score":0
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

  for (var i = 0; i < gameWorld.monsters.length; ++i)
  {
    client.emit('new_remote_monster', gameWorld.monsters[i]);
  }
}

io.on('connection', function(client) {
  console.log('Connection to client established');
  createPlayer(client);

  client.on('new_remote_monster', function(monster) {
    client.broadcast.emit('new_remote_monster', monster);
    gameWorld.monsters.push(monster);
  });

  client.on('update_score', function(score) {
    gameWorld.score = score;
    client.broadcast.emit('update_score', gameWorld.score);
  });

  client.on('update_monster', function(monster) {
    for (var i = 0; i < gameWorld.monsters.length; ++i)
    {
      if (gameWorld.monsters[i].id == monster.id)
      {
        if (monster.alive == false)
        {
          gameWorld.monsters.splice(i, 1);
        }
        else
        {
          gameWorld.monsters[i].posX = monster.posX;
          gameWorld.monsters[i].posY = monster.posY;
          gameWorld.monsters[i].alive = monster.alive;
        }
      }
    }
    client.volatile.broadcast.emit('update_monster', monster);
  });

  client.on('update_player', function(player) {
    for (var i = 0; i < gameWorld.players.length; ++i)
    {
      if (gameWorld.players[i].id == player.id)
      {
        gameWorld.players[i].posX = player.posX;
        gameWorld.players[i].posY = player.posY;
        gameWorld.players[i].state = player.state;
      }
    }
    client.broadcast.emit('update_player', player);
  });

  client.on('disconnect', function() {
    console.log('Client has disconnected');
  });
});

server.listen(appPort);
