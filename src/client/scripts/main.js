require(["unit"], function(Unit) {
    var unit = new Unit({x: 10, y: 10}),
        force = {
            x: 0,
            y: 0
        };

    unit.container = document.createElement('div');
    unit.container.setAttribute('id', this.key);
    unit.container.setAttribute('class', 'unit');
    document.body.appendChild(unit.container);

    var forceX = document.getElementById('force-x'),
        forceY = document.getElementById('force-y'),
        velocityX = document.getElementById('velocity-x'),
        velocityY = document.getElementById('velocity-y'),
        positionX = document.getElementById('position-x'),
        positionY = document.getElementById('position-y');

    function updateStats() {
        forceX.textContent = unit.force.x;
        forceY.textContent = unit.force.y;
        velocityX.textContent = unit.velocity.x;
        velocityY.textContent = unit.velocity.y;
        positionX.textContent = unit.position_x;
        positionY.textContent = unit.position_y;
    }

    (function animloop(time){
      render();

      window.webkitRequestAnimationFrame(animloop, unit.container);
    })(0);

  function render() {
    unit.force = force;
    unit.update();

    updateStats();
  }

  document.addEventListener('keydown', function (evt) {
    // Left
    if (force.x === 0 && evt.keyCode === 37) {
      force.x = -1;
    }
    // Up
    else if (force.y === 0 && evt.keyCode === 38) {
      force.y = -1;
    }
    // Right
    else if (force.x === 0 && evt.keyCode === 39) {
      force.x = 1;
    }
    // Down
    else if (force.y === 0 && evt.keyCode === 40) {
      force.y = 1;
    }
  });

  document.addEventListener('keyup', function (evt) {
    // Left
    // Right
    if (evt.keyCode === 37 || evt.keyCode === 39) {
      force.x = 0;
    }
    // Up
    // Down
    else if (evt.keyCode === 38 || evt.keyCode === 40) {
      force.y = 0;
    }
  });
});
