require([
    'domReady!',
    'socket.io',
    'src/core/resmgr',
    'src/client/models/unit',
    'src/client/stats',
    'src/client/browser_helper'
], function(doc, io, mgr, Unit, Stats, Helper) {

    var win_w = window.innerWidth,
        win_h = window.innerHeight;

    var input = {'left': 0, 'up': 0, 'right': 0, 'down': 0},
        force = {
            x: 0,
            y: 0
        };

    var units = [],
        player;

    var stats = new Stats();
    stats.getDomElement().style.position = 'absolute';
    stats.getDomElement().style.right = '0px';
    stats.getDomElement().style.top = '0px';
    doc.body.appendChild(stats.getDomElement());

    var animloop = function(time) {
        Helper.requestAnimationFrame.apply(window, [animloop]);

        render();
        stats.update();
    };
    animloop(0);

    function render() {
        force.y = 0;
        force.x = 0;
        if (input.up ^ input.down) {
            force.y = (input.up) ? -1 : 1;
        }
        if (input.left ^ input.right) {
            force.x = (input.left) ? -1 : 1;
        }
        if (player) {
            player.force = force;
            player.update();
            socket.emit('update', player.write());
        }

        for (var i in units) {
            units[i].update();
        }
    }

    // Handling input.
    var processKey = function (evt) {
        var keys = ['left', 'up', 'right', 'down'];
        var event = (evt.type === 'keydown') ? 1 : 0,
            key = keys[evt.keyCode - 37];

        if (key !== undefined && event !== input[key]) {
            input[key] = event;
        }
    };
    doc.addEventListener('keydown', processKey);
    doc.addEventListener('keyup', processKey);

    var socket = io.connect('http://localhost');
    socket.on('confirm', function (data) {
        player = mgr.read(data).initDiv("blue");
    });
    socket.on('list', function (list) {
        for (var i in list) {
            units.push(mgr.read(list[i]).initDiv("magenta"));
        }
    });
    socket.on('new player', function (data) {
        units.push(mgr.read(data).initDiv("magenta"));
    });
    socket.on('update', function (data) {
        var updated = mgr.read(data);
        for (var i in units) {
            if (units[i].key.equals(updated.key)) {
                units[i].position_x = updated.position_x;
                units[i].position_y = updated.position_y;
                units[i].update();
            }
        }
    });
});
