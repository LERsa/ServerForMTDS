var io = require('socket.io')(process.env.PORT || 10000);
var Player = require('./Player.js');

console.log('Server has started.');

var players = [];
var sockets = [];

io.on('connection', function (socket)
{

    var player = new Player;
    var thisPlayerID = player.id;
    players[thisPlayerID] = player;
    sockets[thisPlayerID] = socket;

    socket.emit('register', { id: thisPlayerID });
    socket.emit('spawn', player);
    socket.broadcast.emit('spawn', player);

    console.log('Connection has been made. ( ' + thisPlayerID + ' )');

    for (var playerID in players)
    {
        if (playerID != thisPlayerID)
        {
            socket.emit('spawn', players[playerID]);
        }
    }

    socket.on('disconnect', function()
    {
        console.log('Player has been disconnected'); 
        delete players[thisPlayerID];
        delete sockets[thisPlayerID];
        socket.broadcast.emit('disconnected', player);
    });
});