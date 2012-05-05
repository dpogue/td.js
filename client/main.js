require(["src/models/unit", 'src/client/stats'], function(Unit, Stats) {
    var win_w = window.innerWidth,
        win_h = window.innerHeight;

    var units = [],
        force = {
            x: 0,
            y: 0
        };

    Unit.prototype.initDiv = function(color) {
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.key);
        this.container.setAttribute('class', 'unit');
        this.container.style["background-color"] = color;
        document.body.appendChild(this.container);
        return this;
    };

    Unit.prototype.move = function () {
        var translate = 'translate3d(' + this.position_x + 'px, ' + this.position_y + 'px, 0) ';
            rotate = 'rotate(' + this.rotation + 'deg)';

        this.container.style.webkitTransform = translate + " " + rotate;
    };

    units.push(new Unit({x: (win_w / 2) - 20, y: win_h / 2}, 6).initDiv("blue"));
    units.push(new Unit({x: (win_w / 2) + 20, y: win_h / 2}, 10).initDiv("red"));

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
        for (var i in units) {
            units[i].force = force;
            units[i].update();
        }

        // This is SLOW!
        //updateStats(units[0]);
    }

    // Handling input.
    var processKey = function (evt) {
        var event = (evt.type === 'keydown') ? 1 : 0;
        switch (evt.keyCode) {
            // Up
            case 38:
                force.y = event * -1;
                break;
            // Down
            case 40:
                force.y = event;
                break;
            // Left
            case 37:
                force.x = event * -1;
                break;
            // Right
            case 39:
                force.x = event;
                break;
        }
    };
    document.addEventListener('keydown', processKey);
    document.addEventListener('keyup', processKey);

    // Grabbing stats DOM elements.
    var forceX = document.getElementById('force-x'),
        forceY = document.getElementById('force-y'),
        velocityX = document.getElementById('velocity-x'),
        velocityY = document.getElementById('velocity-y'),
        positionX = document.getElementById('position-x'),
        positionY = document.getElementById('position-y'),
        rotation = document.getElementById('rotation');

    // Stats update callback.
    function updateStats(unit) {
        forceX.innerHTML = unit.force.x;
        forceY.innerHTML = unit.force.y;
        velocityX.innerHTML = unit.velocity.x;
        velocityY.innerHTML = unit.velocity.y;
        positionX.innerHTML = unit.position_x;
        positionY.innerHTML = unit.position_y;
        rotation.innerHTML = unit.rotation;
    }
});
