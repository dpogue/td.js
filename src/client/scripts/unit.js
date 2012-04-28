if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['../../models/game_object', '../../core/vector'], function (GameObject, Vector) {
  "use strict";

  var Unit = function() {
    var _accel = '_unit_accel',
        _decel = '_unit_decel',
        _maxVelocity = '_unit_maxvelocity',
        _force = '_unit_maxforce',
        _velocity = '_unit_velocity';

    var objdef = function (pos) {
        objdef._super.constructor.call(this);

        this[_accel] = 0.3;
        this[_decel] = 0.6;
        this[_maxVelocity] = 5;
        this[_force] = new Vector();
        this[_velocity] = new Vector();

        this.position_x = pos.x;
        this.position_y = pos.y;

        /*
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.key);
        this.container.setAttribute('class', 'unit');
        document.body.appendChild(this.container);
        */
    };

    /** Unit's acceleration. */
    Object.defineProperty(objdef.prototype, 'accel', {
        get: function () { return this[_accel]; }
    });
    /** Unit's decceleration. */
    Object.defineProperty(objdef.prototype, 'decel', {
        get: function () { return this[_decel]; }
    });
    /** Unit's maximum velocity. */
    Object.defineProperty(objdef.prototype, 'maxVelocity', {
        get: function () { return this[_maxVelocity]; }
    });

    /** Force currently acting on unit. */
    Object.defineProperty(objdef.prototype, 'force', {
        get: function () { return new Vector(this[_force].x, this[_force].y); },
        set: function (force) {
            this[_force].x = force.x;
            this[_force].y = force.y;
        }
    });

    /** Unit's current velocity. */
    Object.defineProperty(objdef.prototype, 'velocity', {
        get: function () { return new Vector(this[_velocity].x, this[_velocity].y); },
        set: function (velocity) {
            this[_velocity].x = velocity.x;
            this[_velocity].y = velocity.y;
        }
    });

    objdef.prototype.update = function () {
        this.applyForce();
        this.applyVelocity();
        this.applyDirection();
    };

    objdef.prototype.applyForce = function () {
        var force = this.force,
            temp_vector = this.velocity,
            vector = force * temp_vector;

        if (vector.x >= 0) {
            temp_vector.x = force.x * this.accel + temp_vector.x;
        } else {
            temp_vector.x = force.x * (this.accel + this.decel) + temp_vector.x;
        }

        if (vector.y >= 0) {
            temp_vector.y = force.y * this.accel + temp_vector.y;
        } else {
            temp_vector.y = force.y * (this.accel + this.decel) + temp_vector.y;
        }
        if (temp_vector.length > this.maxVelocity) {
            var normal = temp_vector.normalized();
            this.velocity.x = normal.x * this.maxVelocity;
            this.velocity.y = normal.y * this.maxVelocity;
        } else {
            this.velocity.x = temp_vector.x;
            this.velocity.y = temp_vector.y;
        }

        if (force.x === 0) {
          // deceleration towards 0
          var vel_x = this.velocity.x;
          if (vel_x > 0) {
            if ((vel_x - this.decel) < 0) {
              this.velocity.x = 0;
            } else {
              this.velocity.x = vel_x - this.decel;
            }
          }
          else if (vel_x < 0) {
            if ((vel_x + this.decel) > 0) {
              this.velocity.x = 0;
            } else {
              this.velocity.x = vel_x + this.decel;
            }
          }
        }

        if (force.y === 0) {
          // deceleration towards 0
          var vel_y = this.velocity.y;
          if (vel_y > 0) {
            if ((vel_y - this.decel) < 0) {
              this.velocity.y = 0;
            } else {
              this.velocity.y = vel_y - this.decel;
            }
          }
          else if (vel_y < 0) {
            if ((vel_y + this.decel) > 0) {
              this.velocity.y = 0;
            } else {
              this.velocity.y = vel_y + this.decel;
            }
          }
        }
      },

      applyVelocity: function () {
        var new_pos = {
          x: this.getPos().x + this.velocity.x,
          y: this.getPos().y + this.velocity.y
        };
        this.setPos(new_pos);
        this.move(this.velocity);
      },

      applyDirection: function () {
        var angle = 0;
        var degree = 0;
        var vel_x = this.velocity.x;
        var vel_y = this.velocity.y;

        if (vel_x === 0 && vel_y === 0) {
          return;
        }

        if (Math.abs(vel_x) >= Math.abs(vel_y)) {
          angle = Math.atan(vel_y / vel_x) * (180 / Math.PI);

          if (vel_x > 0) {
            if (vel_y === 0) {
              degree = 0;
            } else if (vel_x === vel_y) {
              degree = 315;
            } else if (vel_x === (-vel_y)) {
              degree = 45;
            } else if (angle < 0) {
              degree = (-angle);
            } else {
              degree = 360 - angle;
            }
          } else if (vel_x < 0) {
            if (vel_y === 0) {
              degree = 180;
            } else if (vel_x === vel_y) {
              degree = 135;
            } else if (vel_x === (-vel_y)) {
              degree = 225;
            } else {
              degree = 180 - angle;
            }
          }
        } else if (Math.abs(vel_y) > Math.abs(vel_x)) {
          angle = Math.atan(vel_x / vel_y) * (180 / Math.PI);

          if (vel_y < 0) {
            if (vel_x === 0) {
              degree = 90;
            } else {
              degree = 90 + angle;
            }
          } else if (vel_y > 0) {
            if (vel_x === 0) {
              degree = 270;
            } else {
              degree = 270 + angle;
            }
          }
        }

        if (this.rotation != degree) {
          this.rotation = degree;
        }
      },

      /*
      render: function () {
        this.move(this.force);
      },
      */

      move: function (vector) {
        this.container.style.webkitTransform = 'translate(' + this.getPos().x + 'px, ' + this.getPos().y + 'px)';
        //this.container.style.top = this.getPos().y;
        //this.container.style.left = this.getPos().x;
      }
    };
  };  
  return GameObject.extend(classdef());
});
