require(["unit"], function(Unit) {
    var win_w = window.innerWidth,
        win_h = window.innerHeight;

    var unit = new Unit({x: (win_w / 2) - 20, y: win_h / 2}),
        unit2 = new Unit({x: (win_w / 2) + 20, y: win_h / 2}, 10),
        force = {
            x: 0,
            y: 0
        };

    // Creating unit DOM element.
    unit.container = document.createElement('div');
    unit.container.setAttribute('id', this.key);
    unit.container.setAttribute('class', 'unit');
    document.body.appendChild(unit.container);

    // Creating unit DOM element.
    unit2.container = document.createElement('div');
    unit2.container.setAttribute('id', this.key);
    unit2.container.setAttribute('class', 'unit2');
    document.body.appendChild(unit2.container);

    // Grabbing stats DOM elements.
    var forceX = document.getElementById('force-x'),
        forceY = document.getElementById('force-y'),
        velocityX = document.getElementById('velocity-x'),
        velocityY = document.getElementById('velocity-y'),
        positionX = document.getElementById('position-x'),
        positionY = document.getElementById('position-y'),
        rotation = document.getElementById('rotation');

    // Stats update callback.
    function updateStats() {
        forceX.textContent = unit.force.x;
        forceY.textContent = unit.force.y;
        velocityX.textContent = unit.velocity.x;
        velocityY.textContent = unit.velocity.y;
        positionX.textContent = unit.position_x;
        positionY.textContent = unit.position_y;
        rotation.textContent = unit.rotation;
    }

    (function animloop(time){
      render();

      window.webkitRequestAnimationFrame(animloop, unit.container);
    })(0);

    function render() {
        unit.force = force;
        unit.update();

        unit2.force = force;
        unit2.update();

        //updateStats();
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
});
