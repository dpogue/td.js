require(["src/client/models/unit", 'src/client/stats'], function(Unit, Stats) {
    var win_w = window.innerWidth,
        win_h = window.innerHeight;

    var input = {'left': 0, 'up': 0, 'right': 0, 'down': 0},
        force = {
            x: 0,
            y: 0
        };

    var units = [
        new Unit({x: (win_w / 2) - 20, y: win_h / 2}, 6).initDiv("blue"),
        new Unit({x: (win_w / 2) + 20, y: win_h / 2}, 10).initDiv("red")
    ];

    var stats = new Stats();
    stats.getDomElement().style.position = 'absolute';
    stats.getDomElement().style.right = '0px';
    stats.getDomElement().style.top = '0px';
    document.body.appendChild(stats.getDomElement());

    (function animloop(time){
      render();

      stats.update();

      window.webkitRequestAnimationFrame(animloop);
    })(0);

    function render() {
        force.y = 0;
        force.x = 0;
        if (input.up ^ input.down) {
            force.y = (input.up) ? -1 : 1;
        }
        if (input.left ^ input.right) {
            force.x = (input.left) ? -1 : 1;
        }

        for (var i in units) {
            units[i].force = force;
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
    document.addEventListener('keydown', processKey);
    document.addEventListener('keyup', processKey);
});
