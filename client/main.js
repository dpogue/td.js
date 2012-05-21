require([
    'domReady!',
    'socket.io',
    'src/core/resmgr',
    'src/client/models/unit',
    'src/client/models/human_force',
    'src/client/stats',
    'src/client/browser_helper'
], function(doc, io, mgr, Unit, HumanForce, Stats, Helper) {

    var units = [],
        player1, player2;

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
        if (player1) {
            player1.update();
            socket.emit('update', player1.write());
        }
        if (player2) {
            player2.update();
        }

        for (var i in units) {
            units[i].update();
        }
    }

    var socket = io.connect('http://localhost');
    socket.on('confirm', function (data) {
        player1 = mgr.read(data).initDiv("blue");
        player1.force = new HumanForce();

        player2 = mgr.new_object(Unit.prototype.ClsIdx).initDiv("yellow");
        player2.position_x = 50;
        player2.position_y = 50;
        player2.force = new HumanForce({
            up: 87,
            left: 65,
            right: 68,
            down: 83
        });
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
