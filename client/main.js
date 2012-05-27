require([
    'domReady!',
    'socket.io',
    'src/core/resmgr',
    'client_creatables',
    'src/models/player',
    'src/client/models/human_force',
    'src/client/stats',
    'src/client/browser_helper'
], function(doc, io, mgr, creatables, Player, HumanForce, Stats, Helper) {

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
        if (player) {
            player.update();

            if (player.needs_write) {
                socket.emit('update', player.write());
                player.needs_write = false;
            }
        }

        mgr.get_all_by_type(Player.prototype.ClsIdx).forEach(function(p) {
            if (!p.key.equals(player.key)) {
                p.update();
            }
        });
    }


    var socket = io.connect('http://localhost');

    socket.on('delete', function(key) {
        mgr.unload_object(key);
    });

    socket.on('update', function(data) {
        if (data instanceof Array) {
            mgr.load(data);
        } else if (typeof data === 'object') {
            mgr.read(data);
        } else {
            console.log('Type of data is ' + typeof data);
        }
    });



    socket.on('confirm', function (data) {
        player = mgr.read(data).initDiv("blue");
        player.force = new HumanForce();
    });

    document.addEventListener('keydown', function(evt) {
        if (evt.keyCode == '32') {
            socket.emit('mktower', {});
        }
    });
});
