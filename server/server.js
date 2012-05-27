var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(['connect', '../src/core/resmgr', '../src/models/player', '../src/models/tower'], function (connect, mgr, Player, Tower) {

    var app = connect().use(connect.static('../')).listen(3000),
        io = require('socket.io').listen(app),
        units = [];

    // Init sockets.
    io.set("log level", 1);
    io.sockets.on('connection', connection);

    mgr.on_object_unload = function(obj) {
        io.sockets.emit('delete', obj.key);
    };

    function connection (socket) {
        /* Send the current game world state */
        socket.emit('update', mgr.game_world());

        // Create new player.
        var player = mgr.new_object(Player.prototype.ClsIdx),
            player_key = units.length;

        player.position_x = 50;
        player.position_y = 50;

        units.push(player);

        socket.on('mktower', function(data) {
            socket.get('player', function(err, key) {
                console.log('Building a tower');

                var current = units[key];
                var tower = mgr.new_object(Tower.prototype.ClsIdx);
                tower.position_x = current.position_x;
                tower.position_y = current.position_y;

                socket.emit('update', tower.write());
                socket.broadcast.emit('update', tower.write());
            });
        });

        socket.set('player', player_key, function () {
            var serialized = player.write();
            socket.emit('confirm', serialized);
            socket.broadcast.emit('update', serialized);
        });

        socket.on('update', function (data) {
            socket.get('player', function (err, key) {
                var updated = mgr.read(data);
                var current = units[key];
                current.position_x = updated.position_x;
                current.position_y = updated.position_y;
                socket.broadcast.emit('update', current.write());
            });
        });
    }
});
