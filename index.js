var io = require('socket.io')(process.env.PORT || 10000);

console.log('Server has started.');

io.on('connection', function (socket)
{
    console.log('Connection has been made.');

    socket.on('disconnect', function()
    {
        console.log('Playet has been disconnected');
    });
});