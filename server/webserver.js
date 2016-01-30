var express = require("express");
var path = require("path");
var fs = require("fs");

var public_path = '../public';
var filepath = path.join(__dirname, public_path, 'index.html');
var app = express();
var webPort = 8080;

app.use(express.static('../public'));

app.get('/', function(req, res) {
        fs.readFile(filepath, 'utf8', function(err, text){
            //text = text.replace("SERVERIP", ip.address() + ":" + appPort)
            res.send(text);
        });
    });

app.listen(webPort);
console.log("Web server running at port " + webPort);
