define(['../../core/class', './vector'], function (Class, Velocity) {
  return Class.extend({
    accel: 0.3,
    decel: 0.6,
    max_velocity: 5,
    orientation: 0,
    x: null,
    y: null,
    force: new Velocity(),
    velocity: new Velocity(),
    context: null,

    init: function (id, x, y) {
      this.setPos({
        x: x,
        y: y
      });

      this.container = document.createElement('div');
      this.container.setAttribute('id', id);
      this.container.setAttribute('class', 'unit');
      //this.move({x: this.x, y: this.y});
      document.body.appendChild(this.container);
    },

    setPos: function (pos) {
      this.x = pos.x;
      this.y = pos.y;
    },
    getPos: function () {
      return {
        x: this.x,
        y: this.y
      };
    },
    getForce: function () {
      return this.force;
    },
    setForce: function (force) {
      this.force.x = force.x;
      this.force.y = force.y;
    },
    getVelocity: function () {
      return this.velocity;
    },
    setVelocity: function (velocity) {
      this.velocity = velocity;
    },
    getOrientation: function () {
      return this.orientation;
    },
    setOrientation: function (orientation) {
      this.orientation = orientation;
    },

    update: function () {
      this.applyForce();
      this.applyVelocity();
      this.applyDirection();
    },

    applyForce: function () {
      var force = this.getForce(),
          temp_vector = this.getVelocity(),
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
      if (temp_vector.length() > this.max_velocity) {
        this.getVelocity().x = temp_vector.normalized().x * this.max_velocity;
        this.getVelocity().y = temp_vector.normalized().y * this.max_velocity;
      } else {
        this.getVelocity().x = temp_vector.x;
        this.getVelocity().y = temp_vector.y;
      }

      if (force.x === 0) {
        // deceleration towards 0
        var vel_x = this.getVelocity().x;
        if (vel_x > 0) {
          if ((vel_x - this.decel) < 0) {
            this.getVelocity().x = 0;
          } else {
            this.getVelocity().x = vel_x - this.decel;
          }
        }
        else if (vel_x < 0) {
          if ((vel_x + this.decel) > 0) {
            this.getVelocity().x = 0;
          } else {
            this.getVelocity().x = vel_x + this.decel;
          }
        }
      }

      if (force.y === 0) {
        // deceleration towards 0
        var vel_y = this.getVelocity().y;
        if (vel_y > 0) {
          if ((vel_y - this.decel) < 0) {
            this.getVelocity().y = 0;
          } else {
            this.getVelocity().y = vel_y - this.decel;
          }
        }
        else if (vel_y < 0) {
          if ((vel_y + this.decel) > 0) {
            this.getVelocity().y = 0;
          } else {
            this.getVelocity().y = vel_y + this.decel;
          }
        }
      }
    },

    applyVelocity: function () {
      var new_pos = {
        x: this.getPos().x + this.getVelocity().x,
        y: this.getPos().y + this.getVelocity().y
      };
      this.setPos(new_pos);
      this.move(this.getVelocity());
    },

    applyDirection: function () {
      var angle = 0;
      var degree = 0;
      var vel_x = this.getVelocity().x;
      var vel_y = this.getVelocity().y;

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

      if (this.getOrientation() != degree) {
        this.setOrientation(degree);
      }
    },

    /*
    render: function () {
      this.move(this.force);
    },
    */

    move: function (vector) {
      //this.container.style.webkitTransform = 'translate(' + vector.x + 'px, ' + vector.y + 'px)';
      this.container.style.top = this.getPos().y;
      this.container.style.left = this.getPos().x;
    }
  });
});
