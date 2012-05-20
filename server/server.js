var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(['connect', '../src/core/resmgr', '../src/models/unit'], function (connect, mgr, Unit) {

    var app = connect().use(connect.static('../')).listen(3000),
        io = require('socket.io').listen(app),
        units = [];

    // Init sockets.
    io.sockets.on('connection', connection);

    function connection (socket) {
        // Quick hack to serialize & send player list.
        var list = [];
        for (var i in units) {
            list.push(units[i].write());
        }
        socket.emit('list', list);

        // Create new player.
        var player = mgr.new_object(Unit.prototype.ClsIdx),
            player_key = units.length;

        player.position_x = 50;
        player.position_y = 50;

        units.push(player);

        socket.set('player', player_key, function () {
            var serialized = player.write();
            socket.emit('confirm', serialized);
            socket.broadcast.emit('new player', serialized);
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
