var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
var path = require("path");
var ip = require("ip");
var asyn = require("async");
var AsyncLock = require('async-lock');
var lock = new AsyncLock();

var public_path = '../public';
var filepath = path.join(__dirname, public_path, 'game.html');
var appPort = 8080;

var gameWorld = {
  "players":[],
  "monsters":[],
  "score":0,
  "version":0
};

app.use(express.static('../public'));

app.get('/', function(req, res) {
  fs.readFile(filepath, 'utf8', function(err, text) {
    //text = text.replace("SERVERIP", "218.254.198.61" + ":" + appPort);
    text = text.replace("SERVERIP", ip.address() + ":" + appPort);
    //text = text.replace("SERVERIP", "localhost" + ":" + appPort);
    res.send(text);
  });
});

function nextPlayerID()
{
  for (var i = 0; i < gameWorld.players.length; ++i)
  {
    if (gameWorld.players[i] === null)
    {
      return i + 1;
    }
  }
  return gameWorld.players.length + 1;
}

function createPlayer(client, callback)
{
  lock.acquire('key', function(cb){
    var player = {"id":nextPlayerID(), "posX":400, "posY":500, "status":'ALIVE'};
    if (player.id <= gameWorld.players.length)
    {
      gameWorld.players[player.id-1] = player;
    }
    else
    {
      gameWorld.players.push(player);
    }

    client.emit('new_player', player);
    for (var i1 = 0; i1 < gameWorld.players.length; ++i1)
    {
      if (gameWorld.players[i1] && gameWorld.players[i1].id != player.id)
      {
        client.emit('new_remote_player', gameWorld.players[i1]);
      }
    }
    client.broadcast.emit('new_remote_player', player);

    for (var i2 = 0; i2 < gameWorld.monsters.length; ++i2)
    {
      client.emit('new_remote_monster', gameWorld.monsters[i2]);
    }

    cb();
    callback(player.id);
  });
}

io.on('connection', function(client) {
  console.log('Connection to client established');

  asyn.waterfall([
      function(callback){
          createPlayer(client, function(playerID){callback(null, playerID, gameWorld.version);});
      },
      function(playerID, version, callback){
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
              if (monster.alive === false)
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
            if (gameWorld.players[i] && gameWorld.players[i].id == player.id)
            {
              gameWorld.players[i].posX = player.posX;
              gameWorld.players[i].posY = player.posY;
              gameWorld.players[i].state = player.state;
              gameWorld.players[i].hp = player.hp;
            }
          }
          client.broadcast.emit('update_player', player);
        });

        client.on('reset_server', function() {
          gameWorld = {
            "players":[],
            "monsters":[],
            "score":0,
            "version":gameWorld.version + 1
          };
          client.broadcast.emit('reset_server');
        });

        client.on('disconnect', function() {
          console.log('Client has disconnected');
          if (gameWorld.version == version)
          {
            for (var i = 0; i < gameWorld.players.length; ++i)
            {
              if (gameWorld.players[i] && gameWorld.players[i].id == playerID)
              {
                client.broadcast.emit('remove_remote_player', gameWorld.players[i]);
                gameWorld.players[i] = null;
              }
            }
          }
        });
      }]);
});

server.listen(appPort);
